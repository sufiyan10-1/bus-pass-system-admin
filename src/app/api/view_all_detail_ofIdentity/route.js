import dbConnect from "@/lib/dbConnect";
import IdentityModel from "@/models/Identity";

export async function GET(request) {
  await dbConnect();

  try {
    // Parse URL parameters
    const url = new URL(request.url);
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

    const allIdentityData = await IdentityModel.findById(objectId);
     console.log(allIdentityData)
    if (allIdentityData) {
      return new Response(
        JSON.stringify({
          success: true,
          message: allIdentityData,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Identity Details not found',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.log('Unexpected Error while fetching view all details of identity', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error in view Details of Identity',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
