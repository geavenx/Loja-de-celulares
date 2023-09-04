import { COOKIE_NAME } from "@/app/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify, decode } from "jsonwebtoken";

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

    const { value } = token; // JWT cookie;
    const secret = process.env.JWT_SECRET || '';

    try {
        verify(value, secret);
        const { accessToken } = decode(value);

        const { celulares } = await getPhones(accessToken);

        return NextResponse.json(celulares, {
            status: 200
        })
    } catch (err) {
        return NextResponse.json({
            error: "Something went wrong"
        }, {
            status: 501,
        })
    }
};

async function getPhones(accessToken) {
    // Disabling TLS verification on fetch()
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const authorization = ("Bearer " + accessToken)

    // Added Authorization header
    const opts = {
        headers: {
            Authorization: authorization
        },
        redirect: 'follow'
    }

    try {
        const data = await axios.get(process.env.API_URL, opts)
        return data.data
    } catch (err) {
        return null
    };
};
