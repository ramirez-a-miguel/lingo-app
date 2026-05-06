"use client";

import { useEffect, useState } from "react";

import { Bot, Loader2, Sparkles, X } from "@/components/animated-icons";
import { Button } from "@/components/ui/button";

type AiModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AiModal({ isOpen, onClose }: AiModalProps) {
  const [prompt, setPrompt] = useState("Build a 10-minute listening practice routine for Dutch A1.");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  async function askAssistant() {
    setIsLoading(true);
    setError("");
    setResponse("");

    try {
      const result = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = (await result.json()) as { message?: string; error?: string };

      if (!result.ok) {
        throw new Error(data.error ?? "The language assistant is unavailable.");
      }

      setResponse(data.message ?? "");
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "The language assistant is unavailable.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 p-2 backdrop-blur-xl sm:p-4" role="dialog" aria-modal="true" aria-label="AI assistant">
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close AI assistant" onClick={onClose} />
      <div className="m3-modal-surface relative flex h-full w-full flex-col overflow-hidden">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-outline-variant px-4 sm:px-6">
          <div className="flex size-10 items-center justify-center rounded-sm bg-secondary/10 text-secondary ring-1 ring-secondary/25">
            <Bot className="animated-icon size-5" />
          </div>
          <Button type="button" variant="ghost" size="icon" aria-label="Close" title="Close" onClick={onClose}>
            <X className="animated-icon size-5" />
          </Button>
        </div>

        <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:p-6">
          <section className="m3-elevated-card flex min-h-[420px] flex-col p-5">
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="min-h-44 flex-1 resize-none rounded-sm border-0 border-b-2 border-outline-variant bg-surface-high p-4 text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground focus:border-secondary"
              placeholder="Ask Ollama for a language drill, grammar explanation, or listening plan..."
            />
            <div className="mt-4 flex justify-end">
              <Button size="icon" aria-label="Ask AI" title="Ask AI" onClick={askAssistant} disabled={isLoading}>
                {isLoading ? <Loader2 className="animated-icon size-5 animate-spin" /> : <Sparkles className="animated-icon size-5" />}
              </Button>
            </div>
          </section>

          <aside className="m3-elevated-card min-h-[420px] p-5">
            {response ? <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{response}</p> : null}
            {error ? <p className="rounded-sm border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
            {!response && !error ? (
              <div className="flex h-full items-center justify-center text-center text-sm leading-6 text-muted-foreground">
                Ollama responses appear here.
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  );
}
