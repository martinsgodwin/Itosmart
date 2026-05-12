import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Use environment variable or fallback to provided API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAvbF-1SlO_l8TbzuEOyO-ICvIrTqc__jA";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    // Initialize Gemini AI with API key
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    // Convert chat messages to Gemini format
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build conversation history
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Get the latest user message
    const latestMessage = messages[messages.length - 1];

    if (latestMessage.role !== "user") {
      return NextResponse.json(
        { error: "Last message must be from user" },
        { status: 400 }
      );
    }

    // Start chat session
    const chat = model.startChat({
      history: history,
    });

    // Send message and get response
    const result = await chat.sendMessage(latestMessage.content);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Provide more specific error messages
    let errorMessage = error.message || "Failed to get response from Gemini";
    let statusCode = 500;
    
    if (error.message?.includes("403") || error.message?.includes("Forbidden")) {
      errorMessage = "API Key authentication failed. Please check your GEMINI_API_KEY environment variable.";
      statusCode = 401;
    } else if (error.message?.includes("429")) {
      errorMessage = "Rate limit exceeded. Please try again later.";
      statusCode = 429;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
