let messages = [];
export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method === "POST") {
    // Do something for GET requests
    const jsonData = req.body;
    console.log(jsonData);
    const response = await getResponse(jsonData.message);
    console.log(response);
    res.status(200).json({ message: response });
  }
}

async function getResponse(message) {
  console.log("message", message);
  messages.push({ role: "user", content: message });
  console.log("messages", messages);
  const raw_response = await fetch("https://proxy.tune.app/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "sk-tune-BzvdxGoYg06wI3Lv1d0iJUN3RJf9yxnvBu2",
    },
    body: JSON.stringify({
      temperature: 0.8,
      messages: messages,
      model: "Tytodd/ty2-1",
      stream: false,
      frequency_penalty: 0,
      max_tokens: 900,
    }),
  });

  const response_json = await raw_response.json();
  const response = response_json["choices"][0]["message"]["content"];
  messages.push({ role: "assistant", content: response });
  return response;
}

async function getInfo(query) {}
