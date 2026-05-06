import { NextResponse } from "next/server";

type ChatRequest = {
  prompt?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ChatRequest;
  const baseUrl = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
  const model = process.env.OLLAMA_MODEL ?? "llama3.2";

  if (!body.prompt?.trim()) {
    return NextResponse.json({ error: "Missing prompt." }, { status: 400 });
  }

  try {
    const ollamaResponse = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        stream: false,
        prompt: [
          "You are a concise language learning assistant inside LingoStream.",
          "Help with pronunciation, vocabulary, grammar, listening plans, and speaking drills.",
          body.prompt,
        ].join("\n\n"),
      }),
    });

    if (!ollamaResponse.ok) {
      return NextResponse.json(
        { error: "Ollama is reachable, but the model request failed. Pull the model with npm run ollama:pull." },
        { status: 502 },
      );
    }

    const data = (await ollamaResponse.json()) as { response?: string };
    return NextResponse.json({ message: data.response ?? "No response returned." });
  } catch {
    return NextResponse.json(
      { error: "Ollama is not running. Start it with npm run ollama:up, then pull a model." },
      { status: 503 },
    );
  }
}
