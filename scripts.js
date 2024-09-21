<script>
    const chatBox = document.getElementById("chatBox");
    const usernameInput = document.getElementById("username");
    const messageInput = document.getElementById("message");
    const sendBtn = document.getElementById("sendBtn");

    // Function to fetch messages from GitHub
    async function fetchMessages() {
        const response = await fetch('https://raw.githubusercontent.com/primateterrorvr/primateterrorvr.github.io/main/messages.json');
        const messages = await response.json();
        chatBox.innerHTML = '';
        messages.forEach(msg => {
            chatBox.innerHTML += `<strong>${msg.username}:</strong> ${msg.message}<br>`;
        });
    }

    // Function to send a message to GitHub
    async function sendMessage(username, message) {
        const response = await fetch('https://raw.githubusercontent.com/primateterrorvr/primateterrorvr.github.io/main/messages.json');
        const messages = await response.json();
        const updatedMessages = [...messages, { username, message }];
        const putResponse = await fetch('https://api.github.com/repos/primateterrorvr/primateterrorvr.github.io/contents/messages.json', {
            method: 'PUT',
            headers: {
                'Authorization': 'token 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',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update messages',
                content: btoa(JSON.stringify(updatedMessages)),
                sha: '8cd23b37cfd832878bd090920cdab10d34ad5f73' // Replace with the current SHA of messages.json
            })
        });
        return putResponse.ok;
    }

    // Event listener for sending messages
    sendBtn.addEventListener('click', async () => {
        const username = usernameInput.value;
        const message = messageInput.value;

        if (username && message) {
            await sendMessage(username, message);
            messageInput.value = '';
            fetchMessages(); // Refresh messages after sending
        }
    });

    // Initial fetch of messages
    fetchMessages();
    setInterval(fetchMessages, 5000); // Refresh messages every 5 seconds
</script>
