import { GRANT_TYPE, MAX_AGE, AUTH_URL, COOKIE_NAME } from "@/app/constants";
import axios from "axios";
import { NextResponse } from "next/server";
import { sign } from 'jsonwebtoken';
import { serialize } from "cookie";

export async function POST(request) {
    const body = await request.json();

    const { user, password } = body;
    const data = await loginUser(user, password);
    if (!data.data.access_token) {
        return NextResponse.json({
            message: "Invalid credentials"
        }, {
            status: 401,
        })
    };

    const accessToken = data.data.access_token;

    const secret = process.env.JWT_SECRET || '';

    const token = sign(
        {
            accessToken,
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
        maxAge: MAX_AGE,
        path: '/',
    });
    const response = {
        message: "User authenticated",
    }
    return NextResponse.json(JSON.stringify(response), {
        status: 200,
        headers: {
            'Set-Cookie': serialized
        }
    })
};

/**
 * Authenticates a user by logging them in at the API.
 *
 * @param {string} user - The username of the user.
 * @param {string} password - The password of the user.
 * @return {Promise} A promise that resolves to the authentication data.
 */
async function loginUser(user, password) {
    // Disabling TLS verification on request
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    // Added Content-Type header
    var header = new Headers();
    header.append("Content-Type", "Application/x-www-form-urlencoded");

    // Adding the body for password grant type OAuth2 flow
    var reqBody = new URLSearchParams();
    reqBody.append("grant_type", GRANT_TYPE)
    reqBody.append("username", user)
    reqBody.append("password", password)
    reqBody.append("client_id", process.env.CLIENT_ID)
    reqBody.append("client_secret", process.env.CLIENT_SECRET)

    try {
        const data = await axios.post(
            AUTH_URL,
            reqBody,
            header,
        )
        return data

    } catch (err) {
        return err
    }
}