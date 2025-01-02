"use client";
import { useState } from "react";

const ChatComponent = () => {
  const [userText, setUserText] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [previousChats, setPreviousChats] = useState<
    { user: string; ai: string }[]
  >([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAiResponse(data.ai_response);
      setPreviousChats((prev) => [...prev, { user: userText, ai: data.ai_response }]);
      setUserText("");
    } catch (error: any) {
      console.error("Error:", error);
      setAiResponse("Error while trying to get the response");
      setPreviousChats((prev) => [...prev, { user: userText, ai: "Error while trying to get the response" }]);
      setUserText("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your message"
          value={userText}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Send</button>
      </form>
      <div>
        {previousChats.map((chat, index) => (
          <div key={index}>
            <p>
              <strong>You: </strong> {chat.user}{" "}
            </p>
            <p>
              <strong>AI: </strong> {chat.ai}{" "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;