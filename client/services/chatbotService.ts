const API_BASE = "http://localhost:5000";

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export const sendChatMessage = async (
  message: string,
  history: ChatMessage[]
): Promise<string> => {
  const res = await fetch(`${API_BASE}/api/chatbot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Chat request failed" }));
    throw new Error(err.message || "Chat request failed");
  }
  const data = await res.json();
  return data.reply;
};
