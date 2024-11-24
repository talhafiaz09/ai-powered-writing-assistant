import { NextResponse } from "next/server";
import axios from "axios";
import { apiKey } from "@/app/utils";

export async function POST(request: Request) {
    const { originalText, rewrittenText } = await request.json();
    if (!originalText || !rewrittenText) {
        return NextResponse.json({ error: "Missing parameters." }, { status: 400 });
    }
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [
                    {
                        role: "user",
                        content: `Explain how this rewritten text improves upon the original:\n\nOriginal: ${originalText}\n\nRewritten: ${rewrittenText}`,
                    },
                ],
                max_tokens: 100,
                temperature: 0.7,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return NextResponse.json({ explanation: response.data.choices[0].message.content.trim() });
    } catch (error: any) {
        // console.log(error.response?.data?.error?.message || error.message);
        return NextResponse.json(
            { error: "Error generating text, please try again later." },
            { status: 500 }
        );
    }
}
