import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import AdminModel from '@/models/Admin';

export async function POST(request) {
    console.log("all ok")
    await dbConnect();
    try {
        const { identifier, password } = await request.json();
         console.log(identifier)
        // Check if user exists
        const user = await  AdminModel.findOne({
            $or: [
                { phoneNo: isNaN(identifier) ? undefined : identifier },
                { username: isNaN(identifier) ? identifier : undefined }
              ].filter(condition => condition !== undefined)
            });
          console.log(user)
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            phoneNo: user.phoneNo,
        };

        // Create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        // Create a response
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        // Set the token as a cookie
        response.cookies.set('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/',
            secure: process.env.NODE_ENV === 'production',
        });

        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
