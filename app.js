document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat_container');
    const chatForm = document.getElementById('chat_form');
    const promptInput = document.getElementById('prompt');

    const addMessageToChat = (message, isAI) => {
        const chatDiv = document.createElement('div');
        chatDiv.classList.add('chat');
        if (isAI) {
            chatDiv.classList.add('ai');
        }

        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');
        profileDiv.innerHTML = `<img src="${isAI ? 'assets/ai-icon.png' : 'assets/user-icon.png'}" alt="${isAI ? 'AI' : 'User'}">`;
        chatDiv.appendChild(profileDiv);

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = message;
        chatDiv.appendChild(messageDiv);

        chatContainer.appendChild(chatDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const prompt = promptInput.value.trim();
        if (!prompt) return;

        addMessageToChat(prompt, false);
        promptInput.value = '';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();
            addMessageToChat(data.message, true);
        } catch (error) {
            console.error('Error:', error);
            addMessageToChat('Error: Unable to get response from AI.', true);
        }
    };

    chatForm.addEventListener('submit', handleSubmit);
});
