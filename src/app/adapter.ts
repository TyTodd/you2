import { ChatAdapter } from "@nlux/core";

export const myCustomAdapter: ChatAdapter = {
  batchText: (message: string, extras: AdapterExtras): Promise<string> => {
    return fetch("http://localhost:8000/send_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message, stream: false }),
    })
      .then((response) => response.json())
      .then((json) => json.message);
  },
};
