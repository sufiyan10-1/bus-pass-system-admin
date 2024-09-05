import dbConnect from "@/lib/dbConnect"
import IdentityModel from "@/models/Identity";




export async function  GET(request){
   await dbConnect();

   try {
     const url = new URL(request.url)
     const objectId = url.searchParams.get('objectId');

     if (!objectId) {
       return new Response(
         JSON.stringify({
           success: false,
           message: 'Object ID is required',
         }),
         { status: 400, headers: { 'Content-Type': 'application/json' } }
       );
     }
 
     const acceptApplication = await IdentityModel.findByIdAndUpdate(objectId,      
      { 
        identityVerified: true, 
        status: "Accepted" 
      },);

     if(!acceptApplication){
       return Response.json({
        success: false,
        message: 'accepting application operation failed'
       },{status: 400})
     }  

     else{
      return Response.json({
        success: true,
        message: "Application Accepted Successfully"
      },{status: 200})
     }


   } catch (error) {
     console.log('error occer while submiting application'+error)
       return Response.json({
        success: false,
        message: 'error occer while submiting application'
       },{status: 400})
     } 

}