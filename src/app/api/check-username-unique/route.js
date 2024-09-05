import dbConnect from "@/lib/dbConnect";
import AdminModel from "@/models/Admin";
import {z} from "zod"
import {usernameValidation} from "@/schemas/signUpSchema"



const usernameQuerySchema = z.object({
    username: usernameValidation
})

export async function  GET(request) {
  console.log(request)
    await dbConnect();  
   
   try {
    const {searchParams} = new URL(request.url)
    const queryParam = {
        username: searchParams.get('username')
    }
    const result = usernameQuerySchema.safeParse(queryParam)
    console.log(result)

    if(!result.success){
       const usernameErrors = result.error.format().username?._errors || []
       return Response.json({
        success: false,
        message: usernameErrors?.length>0 ? usernameErrors.join(','): 'Invalid query parameters',
       }, {status: 400})
    }

   const {username} = result.data

   const existingVerifiedUser = await AdminModel.findOne({username})
    
   if(existingVerifiedUser){
    return Response.json({
        success: false,
        message: "Username is alredy taken",
       }, {status: 400})
   }

   return Response.json({
    success: true,
    message: "Username is unique",
   }, {status: 200})

} catch (error) {
    console.error("error checking username", error)
    return Response.json(
        {
            success: false,
            message: "Error checking username"
        },
        {status: 500}
    )
   }
}