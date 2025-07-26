/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "frame-ancestors 'self' https://oauth2.istad.co",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;

import { authOptions } from "@/lib/key-cloak-auth/next-auth-options";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return NextResponse.json({
                message: "Email and password are required"
            }, {
                status: 400
            });
        }

        // // Fetch with API 
        // const fetchData = await fetch('https://car-nextjs-api.cheatdev.online/login', {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': "application/json"
        //     },
        //     body: JSON.stringify({ email, password })
        // });

        const session = await getServerSession(authOptions);

        // Handle fetch errors gracefully
        // const errorData = await fetchData.json().catch(() => ({}));
        // if (!fetchData.ok) {
        //     return NextResponse.json({
        //         message: errorData.message || "Failed to login"
        //     }, {
        //         status: fetchData.status
        //     });
        // }

        // const data = await fetchData.json();
        // console.log("Login successful:", data);

        // Set cookies
        const cookieStore = await cookies();
        const refreshTokenName = process.env.CAR_TOKEN_NAME || "refreshToken";
       

        // Set refresh token cookie (httpOnly for security)
        if (session?.refresh_token) {
            cookieStore.set({
                name: refreshTokenName,
                value: session?.refresh_token,
                sameSite: "lax",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60, // 7 days
                path: "/"
            });
        }

       

        // Return success response (don't include sensitive tokens)
        return NextResponse.json({
            message: "Login successful",
            user: session?.user || null,
            access_token: session?.access_token // Only access token for Redux
        }, {
            status: 200
        });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}