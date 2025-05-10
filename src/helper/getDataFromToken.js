import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
    try {
        const adminToken = request.cookies.get("adminToken")?.value || '';
        const decodedToken = jwt.verify(adminToken, process.env.TOKEN_SECRET);
        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message);
    }

}