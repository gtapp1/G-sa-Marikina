import { GoogleGenAI } from "@google/genai";
import { listings } from "@/data/listings";

export const dynamic = "force-dynamic";

const MODEL = "gemini-2.5-flash";
const MAX_MESSAGE_LENGTH = 500;

// Serialize the catalog into compact context the model can ground answers in.
// Only fields useful for recommendations — keeps the prompt small.
function buildListingsContext(): string {
  return listings
    .map((l) => {
      const products = l.products
        .map((p) => `${p.name}${p.price ? ` (${p.price})` : ""}`)
        .join(", ");
      return [
        `- ${l.name} [/${l.slug}]`,
        `  category: ${l.category} | barangay: ${l.barangay} | rating: ${l.rating}/5 (${l.reviewCount} reviews)`,
        `  products: ${products}`,
        `  description: ${l.description}`,
      ].join("\n");
    })
    .join("\n\n");
}

function buildSystemPrompt(): string {
  return `You are "G!", the AI food concierge for G sa Marikina — a local food discovery platform for Marikina City, Philippines.

RULES:
- Only answer questions about food, restaurants, and this platform.
- Only reference listings that appear in the PLATFORM DATA below. Never invent or hallucinate a business, product, or price.
- Respond in whatever language the user used (Tagalog, English, or Taglish). Match their tone.
- If nothing in the data matches the question, say so honestly and suggest browsing /search or /map.
- Keep responses conversational and short — 2 to 4 sentences.
- When you recommend a specific spot, include its link in this exact format: /[slug]
- Politely decline anything unrelated to Marikina food or this platform (weather, general chit-chat, coding help, etc.) and redirect back to food discovery.

PLATFORM DATA (the only businesses that exist on this platform):
${buildListingsContext()}

PLATFORM FEATURES (mention when relevant):
- Browse by category: /categories
- Interactive map with barangay filters: /map
- Search and filters: /search
- Submit a business listing: /for-businesses/new
- Leave a review: available on any listing page`;
}

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Chat is not configured on this deployment." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { message, history } = (body ?? {}) as {
    message?: string;
    history?: ChatMessage[];
  };

  if (typeof message !== "string" || message.trim().length === 0) {
    return new Response(JSON.stringify({ error: "Message is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return new Response(
      JSON.stringify({ error: "Message too long" }),
      { status: 413, headers: { "Content-Type": "application/json" } }
    );
  }

  // Cap history to the last 10 exchanges to keep context small and bounded.
  const safeHistory: ChatMessage[] = Array.isArray(history)
    ? history
        .filter(
          (m): m is ChatMessage =>
            m &&
            (m.role === "user" || m.role === "model") &&
            typeof m.content === "string"
        )
        .slice(-10)
    : [];

  try {
    const ai = new GoogleGenAI({ apiKey });

    const contents = [
      ...safeHistory.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
      { role: "user" as const, parts: [{ text: message }] },
    ];

    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents,
      config: {
        systemInstruction: buildSystemPrompt(),
        temperature: 0.7,
        maxOutputTokens: 300,
      },
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text;
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (err) {
          console.error("Gemini stream error:", err);
          controller.enqueue(
            encoder.encode(
              "\n\n[G! is thinking... try again in a moment]"
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("POST /api/chat error:", err);

    const status = err?.status ?? err?.response?.status;
    if (status === 429) {
      return new Response(
        JSON.stringify({
          error: "G! is thinking... try again in a moment",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        error: "Hindi ko sure yan — try browsing /search instead!",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
