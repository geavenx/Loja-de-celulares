import { MAX_AGE, COOKIE_NAME } from "@/app/constants";
import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import { serialize } from "cookie";

export async function POST(request) {

    const payload = 'logout';

    const secret = process.env.JWT_SECRET || '';

    const token = sign(
        {
            payload,
        },
        secret,
        {
            expiresIn: MAX_AGE,
        }
    );
    const serialized = serialize(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: -1,
        path: '/',
    });
    const response = {
        message: "User logout",
    }
    return NextResponse.json(JSON.stringify(response), {
        status: 200,
        headers: {
            'Set-Cookie': serialized
        }
    })
};
