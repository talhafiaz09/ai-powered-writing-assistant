import { NextResponse } from "next/server";
import axios from "axios";
import { apiKey } from "@/app/utils";

export async function POST(request: Request) {
    const { text } = await request.json();

    if (!text) {
        return NextResponse.json({ error: "Text is required." }, { status: 400 });
    }

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a helpful assistant that rephrases sentences while maintaining their original meaning.",
                    },
                    { role: "user", content: text },
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
        return NextResponse.json({ text: response.data.choices[0].message.content.trim() });
    } catch (error: any) {
        // console.log(error.response?.data?.error?.message || error.message);
        return NextResponse.json(
            { error: "Error generating text, please try again later." },
            { status: 500 }
        );
    }
}
