export async function POST(req) {
    try {
        const body = await req.json(); // Parsing request body only once

        const API_ENDPOINT = `${process.env.NEXT_PUBLIC_BASE_URL}/v2/internal/listing/inquiry`;

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
                "X-CLIENT-SECRET": process.env.NEXT_PUBLIC_X_CLIENT_SECRET,
            },
            body: JSON.stringify(body),
        };

        const response = await fetch(API_ENDPOINT, requestOptions);

        // Read response body only once
        const data = await response.json();

        if (!response.ok) {
            console.error("External API Error: ", data);
            return new Response(
                JSON.stringify({
                    message: "External API Request Failed",
                    status: response.status,
                    data,
                }),
                {
                    status: response.status,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Successful response
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Server Error:", error);
        return new Response(
            JSON.stringify({
                message: "Internal Server Error",
                error: error.message,
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
