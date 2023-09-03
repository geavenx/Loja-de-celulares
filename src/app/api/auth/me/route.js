import { COOKIE_NAME } from "@/app/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    const cookie = cookies();

    const token = cookie.get(COOKIE_NAME);

    if (!token) {
        return NextResponse.json({
            message: "Invalid credentials"
        }, {
            status: 401,
        });
    };

    const { value } = token;
    const secret = process.env.JWT_SECRET || '';

    try {
        verify(value, secret);

        const response = {
            message: "User verified",
        }

        return new Response(JSON.stringify(response), {
            status: 200,
        })

    } catch (err) {
        return NextResponse.json({
            message: "Something went wrong"
        }, {
            status: 400,
        });
    }
}
