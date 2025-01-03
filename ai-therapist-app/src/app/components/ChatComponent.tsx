'use client';

import { useChat } from 'ai/react';

export default function ChatComponent() {
    const { messages, input, handleSubmit, handleInputChange, isLoading } = useChat();

    // console.log('API Key:', process.env.NEXT_PUBLIC_OPENAI_API_KEY);   // like this right but the file is named .env.local instead hence the api key is undefined
    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.role}`}>
                        <span>{message.role}: </span>{message.content}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="input-form">
                <input
                    value={input}
                    placeholder="Send a message..."
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="chat-input"
                />
                <button type="submit" disabled={isLoading}>Send</button>
            </form>
        </div>
    );
}
