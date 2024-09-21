<script>
    const ownerCode = 'LemonRed'; // The code for accessing owner features

    // Load chat messages from local storage on page load
    window.onload = function() {
        const chatBox = document.getElementById('chatBox');
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.forEach(msg => {
            chatBox.innerHTML += `<strong>${msg.username}:</strong> ${msg.message}<br>`;
        });
    };

    document.getElementById('enterCode').addEventListener('click', function() {
        const codeInput = document.getElementById('codeInput').value;
        if (codeInput === ownerCode) {
            document.getElementById('settingsBtn').style.display = 'block'; // Show settings button
            document.getElementById('ownerMenu').style.display = 'block'; // Show owner menu
        } else {
            alert('Invalid code!'); // Alert if code is incorrect
        }
        document.getElementById('codeInput').value = ''; // Clear the input
    });

    document.getElementById('settingsBtn').addEventListener('click', function() {
        const menu = document.getElementById('settingsMenu');
        menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
    });

    document.getElementById('bgColor').addEventListener('input', function() {
        document.body.style.backgroundColor = this.value;
    });

    document.getElementById('bannerColor').addEventListener('input', function() {
        document.getElementById('topBar').style.backgroundColor = this.value;
    });

    document.getElementById('contentColor').addEventListener('input', function() {
        document.getElementById('content').style.backgroundColor = this.value;
    });

    document.getElementById('textColor').addEventListener('input', function() {
        document.body.style.color = this.value;
    });

    document.getElementById('username').addEventListener('input', function() {
        document.getElementById('message').disabled = this.value.trim() === '';
        document.getElementById('sendBtn').disabled = this.value.trim() === '';
    });

    document.getElementById('sendBtn').addEventListener('click', function() {
        const chatBox = document.getElementById('chatBox');
        const username = document.getElementById('username').value;
        const message = document.getElementById('message').value;

        // Save message to local storage
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.push({ username, message });
        localStorage.setItem('chatMessages', JSON.stringify(messages));

        // Display the new message
        chatBox.innerHTML += `<strong>${username}:</strong> ${message}<br>`;
        document.getElementById('message').value = '';
    });

    document.getElementById('sendOwnerMessage').addEventListener('click', function() {
        const chatBox = document.getElementById('chatBox');
        const ownerMessage = document.getElementById('ownerMessage').value;

        // Save owner message to local storage
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        messages.push({ username: 'Owner', message: ownerMessage });
        localStorage.setItem('chatMessages', JSON.stringify(messages));

        // Display the new owner message
        chatBox.innerHTML += `<strong>Owner:</strong> ${ownerMessage}<br>`;
        document.getElementById('ownerMessage').value = '';
    });
</script>
