import { NextResponse } from "next/server";
import { createResetPassword } from "@/services/userService"; 

export async function POST(request) {
    try {
        const body = await request.json();
        const {token, name, email, password, role, organization_name} = body;

        if (!token || !email || !new_password) {
            return NextResponse.json(
                { error: "Missing required fields: token, email, new_password" },
                { status: 400 }

            );

        }
        const result = await  createResetPassword({ token, email, new_password});
        return NextResponse.json(result, { status: 200 });

    } catch(err) {
        const message = err.message || "Unknown error";
        if (message.includes("401")) {
            return NextResponse.json(
                { error: "Unauthorized", details: message },
                { status: 401 }
                

            );

        }
        if (message.includes("404")) {
            return NextResponse.json(
                { error: "Not Found", details: message },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { error: "Internal Server Error", details: message },
            { status: 500 }

        );   
    }

}