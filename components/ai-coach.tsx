"use client";

import { useState } from "react";
import { Bot, Loader2, Sparkles } from "@/components/animated-icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { LanguageVideo } from "@/lib/videos";

type AiCoachProps = {
  video: LanguageVideo;
};

export function AiCoach({ video }: AiCoachProps) {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function askCoach() {
    setIsLoading(true);
    setError("");
    setResponse("");

    try {
      const result = await fetch("/api/ai/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: video.title,
          language: video.language,
          level: video.level,
          goal: video.goal,
        }),
      });

      const data = (await result.json()) as { message?: string; error?: string };

      if (!result.ok) {
        throw new Error(data.error ?? "The language coach is unavailable.");
      }

      setResponse(data.message ?? "");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "The language coach is unavailable.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-secondary/10 text-secondary ring-1 ring-secondary/20">
            <Bot className="size-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold">AI language coach</h2>
            <p className="mt-1 text-sm text-muted-foreground">Generate a short practice plan from this video.</p>
          </div>
        </div>
        <Button onClick={askCoach} disabled={isLoading} size="icon" aria-label="Build practice plan" title="Build practice plan">
          {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
        </Button>
        {response ? <p className="whitespace-pre-wrap rounded-sm bg-surface-high p-3 text-sm leading-6">{response}</p> : null}
        {error ? <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
      </CardContent>
    </Card>
  );
}
