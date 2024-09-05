import dbConnect from "@/lib/dbConnect";
import IdentityModel from "@/models/Identity";



export async function POST(request){
  await dbConnect();

  try {
    const formData = await request.formData();
    const rejectReason = formData.get("rejectReason") 
    const objectId = formData.get("objectId") 

    if (!objectId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Object ID is required',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const rejectApplication = await IdentityModel.findByIdAndUpdate(objectId, 
        {status: `rejected Due to ${rejectReason}`}
    )

    if(!rejectApplication){
        return Response.json({
         success: false,
         message: 'rejecting application operation failed'
        },{status: 400})
      }  
 
      else{
       return Response.json({
         success: true,
         message: "Application reject Successfully"
       },{status: 200})
      }
  } catch (error) {
    console.log('error occer while rejecting application'+error)
    return Response.json({
     success: false,
     message: 'error occer while rejecting application'
    },{status: 400})
  } 
 
}