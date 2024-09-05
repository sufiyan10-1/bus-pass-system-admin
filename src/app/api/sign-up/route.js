import dbConnect from "@/lib/dbConnect";
import AdminModel from "@/models/Admin";
import bcrypt from 'bcryptjs';
 



export async function POST(request){
 await dbConnect();

 try{
    const {password, phoneNo,username,  } = await request.json();
    const existingVerifiedUserByUsername = await AdminModel.findOne({
        username,
    })
    if(existingVerifiedUserByUsername){
        return Response.json(
            {
                success: false,
                message: "user name is already taken"
            },{status: 400}
        );
    }
    const existingUserByPhoneNo = await AdminModel.findOne({phoneNo});
    if(existingUserByPhoneNo){
      return Response.json(
        {
            success: false,
            message: "User already present with this Phone Number"
        },{status: 400}
    );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newAdmin = new AdminModel({
        username,
        phoneNo,
        password: hashedPassword,
      });

      await newAdmin.save();
    }

    return Response.json(
      {
        success: true,
        message: 'User registered successfull.',
      },
      { status: 201 }
    );
 }catch (error){
  console.error('Error registering user:', error);
    return Response.json(
      {
        success: false,
        message: 'Error registering user',
      },
      { status: 500 }
    );
 }

}