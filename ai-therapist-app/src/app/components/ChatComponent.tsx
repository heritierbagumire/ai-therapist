'use client';

import { useState } from 'react';

export default function TestGPTButton() {
    const [response, setResponse] = useState('');

    async function testGPT() {
        try {
            const res = await fetch('/api/test_gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: 'Hello, GPT!' }],
                }),
            });

            if (!res.ok) {
                throw new Error(`Request failed: ${res.statusText}`);
            }

            const data = await res.json();

            // Log the response for debugging
            console.log('Response:', data);

            // Handle the response
            setResponse(data?.content || 'No response received');
            alert('Response: ' + (data?.content || 'No response received'));
        } catch (error: any) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        }
    }

    return (
        <div>
            <button onClick={testGPT}>Test GPT</button>
            <p>{response}</p>
        </div>
    );
}
