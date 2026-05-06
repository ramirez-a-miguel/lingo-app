import { NextResponse } from "next/server";

type CoachRequest = {
  title?: string;
  language?: string;
  level?: string;
  goal?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as CoachRequest;
  const baseUrl = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
  const model = process.env.OLLAMA_MODEL ?? "llama3.2";

  if (!body.title || !body.language || !body.level || !body.goal) {
    return NextResponse.json({ error: "Missing video learning context." }, { status: 400 });
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
          "You are a concise language learning coach.",
          `Create a 5-minute practice plan for a ${body.level} ${body.language} learner.`,
          `Video title: ${body.title}`,
          `Learning goal: ${body.goal}`,
          "Return three numbered steps and one short speaking challenge.",
        ].join("\n"),
      }),
    });

    if (!ollamaResponse.ok) {
      return NextResponse.json(
        { error: "Ollama is reachable, but the model request failed. Pull the model with npm run ollama:pull." },
        { status: 502 },
      );
    }

    const data = (await ollamaResponse.json()) as { response?: string };
    return NextResponse.json({ message: data.response ?? "No coaching response returned." });
  } catch {
    return NextResponse.json(
      { error: "Ollama is not running. Start it with npm run ollama:up, then pull a model." },
      { status: 503 },
    );
  }
}
