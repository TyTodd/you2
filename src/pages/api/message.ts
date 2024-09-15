import { ZepClient } from "@getzep/zep-cloud";

API_KEY = process.env.ZEP_API_KEY;

const zep = new ZepClient({ apiKey: API_KEY });

function updateMemory(sessionId) {
  // This uniquely identifies the user's session
  const sessionId: string = "my_session_id";

  const { results: searchResults } = await client.memory.searchSessions({
    sessionIds: [sessionId],
    text: "Is Lauren Olamina a character in a book?",
    searchScope: "facts", // This could be messages
    searchType: "mmr", // Remove this if you'd prefer not to rerank results
    mmrLambda: 0.5, // Tune diversity vs relevance
  });

  searchResults.forEach((result) => {
    // Uncomment for message search
    // console.log(result.message);
    console.log(result.relevant_facts);
  });
}
