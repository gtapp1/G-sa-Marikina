"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChatCircleDots, X, PaperPlaneTilt } from "@phosphor-icons/react";

interface Message {
  role: "user" | "model";
  content: string;
}

const STARTER_PROMPTS = [
  "Saan may masarap na cookies?",
  "What's the highest rated spot?",
  "Anong mura na food sa Industrial Valley?",
];

// Turns "text /some-slug more text" into clickable links to listing pages.
// Gemini is instructed to emit slugs as "/[slug]" — this renders them as <Link>.
function renderWithLinks(text: string) {
  const parts = text.split(/(\/[a-z0-9-]+)/g);
  return parts.map((part, i) => {
    if (/^\/[a-z0-9-]+$/.test(part) && part.length > 1) {
      return (
        <Link
          key={i}
          href={part}
          className="font-bold underline text-[var(--color-accent-red)]"
        >
          {part}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, isLoading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    // Placeholder for the streaming model response.
    setMessages((prev) => [...prev, { role: "model", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.slice(0, -1),
        }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "G! couldn't reach the kitchen. Try again?");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "model", content: accumulated };
          return copy;
        });
      }

      if (!accumulated.trim()) {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "model",
            content: "Hindi ko sure yan — try browsing /search instead!",
          };
          return copy;
        });
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "G! couldn't reach the kitchen. Try again?";
      setError(msg);
      setMessages((prev) => prev.slice(0, -1)); // drop the empty placeholder
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open G! food concierge chat"}
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--color-accent)] text-white shadow-lg hover:bg-[var(--color-accent-hover)] transition-colors"
      >
        {isOpen ? (
          <X size={22} weight="bold" />
        ) : (
          <ChatCircleDots size={24} weight="fill" />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed z-50 bottom-0 right-0 md:bottom-24 md:right-5 w-full md:w-[360px] h-[70vh] md:h-[480px] bg-white flex flex-col shadow-2xl border border-[var(--color-border)] md:rounded-[var(--radius-md)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-accent)] text-white shrink-0">
            <div>
              <p className="text-[13px] font-bold tracking-tight">G! Food Concierge</p>
              <p className="text-[11px] opacity-80">Ask about Marikina food spots</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="p-1 hover:opacity-70"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 bg-[var(--color-surface-muted)]"
          >
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-[12px] text-[var(--color-text-primary)] px-1">
                  Try asking:
                </p>
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="block w-full text-left px-3 py-2 text-[12px] rounded-[var(--radius-sm)] bg-white border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 text-[13px] leading-snug rounded-[var(--radius-sm)] ${
                    m.role === "user"
                      ? "bg-[var(--color-accent)] text-white"
                      : "bg-white border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                  }`}
                >
                  {m.content ? (
                    renderWithLinks(m.content)
                  ) : (
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)] opacity-40 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)] opacity-40 animate-pulse [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)] opacity-40 animate-pulse [animation-delay:300ms]" />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {error && (
              <p className="text-[11px] text-[var(--color-error)] px-1">{error}</p>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-2.5 border-t border-[var(--color-border)] bg-white shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Saan may masarap na milk tea?"
              enterKeyHint="send"
              disabled={isLoading}
              className="flex-1 text-[13px] px-3 py-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-accent)]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-accent)] text-white disabled:opacity-40 transition-opacity"
            >
              <PaperPlaneTilt size={16} weight="fill" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
