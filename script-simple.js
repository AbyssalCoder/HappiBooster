console.log('Simple script loaded');

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initApp() {
    console.log('initApp called');
    
    // Get elements
    const generateButton = document.getElementById('generateButton');
    const modeToggle = document.getElementById('modeToggle');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatLog = document.getElementById('chatLog');
    const selfieForm = document.getElementById('selfieForm');
    
    console.log('generateButton:', generateButton);
    console.log('modeToggle:', modeToggle);
    console.log('chatForm:', chatForm);
    
    // Make Me Happy button
    if (generateButton) {
        generateButton.addEventListener('click', function() {
            console.log('Generate button clicked!');
            generateButton.textContent = 'Loading...';
            
            setTimeout(() => {
                const affirmations = [
                    "You are blooming in your own perfect timing.",
                    "Your kindness leaves soft footprints everywhere you go.",
                    "You are made of resilience and quiet stardust.",
                    "Every moment is a fresh chance to choose joy.",
                    "You bring warmth into every space you enter.",
                ];
                
                const affirmationText = document.getElementById('affirmationText');
                if (affirmationText) {
                    affirmationText.textContent = affirmations[Math.floor(Math.random() * affirmations.length)];
                }
                
                generateButton.textContent = 'Make Me Happy';
            }, 500);
        });
    }
    
    // Dark mode toggle
    if (modeToggle) {
        modeToggle.addEventListener('click', function() {
            console.log('Mode toggle clicked!');
            const body = document.body;
            const isDark = body.getAttribute('data-theme') === 'dark';
            body.setAttribute('data-theme', isDark ? 'light' : 'dark');
            console.log('Theme changed to:', isDark ? 'light' : 'dark');
        });
    }
    
    // Chat form submission
    if (chatForm) {
        chatForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            console.log('Chat form submitted!');
            
            if (!chatInput) return;
            
            const message = chatInput.value.trim();
            if (!message) return;
            
            console.log('Sending message:', message);
            
            // Add user message to chat
            const userBubble = document.createElement('div');
            userBubble.className = 'chat-bubble user';
            userBubble.textContent = message;
            chatLog.appendChild(userBubble);
            
            chatInput.value = '';
            
            try {
                console.log('Calling API...');
                const response = await fetch('/api/support-chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: message, history: [] })
                });
                
                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    throw new Error('API error');
                }
                
                const data = await response.json();
                console.log('Got response:', data);
                
                // Add bot response
                const botBubble = document.createElement('div');
                botBubble.className = 'chat-bubble bot';
                botBubble.textContent = data.reply || 'Sorry, I had trouble responding.';
                chatLog.appendChild(botBubble);
                chatLog.scrollTop = chatLog.scrollHeight;
                
            } catch (error) {
                console.error('Chat error:', error);
                const errorBubble = document.createElement('div');
                errorBubble.className = 'chat-bubble bot';
                errorBubble.textContent = 'Sorry, I had trouble responding. Please try again.';
                chatLog.appendChild(errorBubble);
            }
        });
    }
    
    // Selfie form
    if (selfieForm) {
        selfieForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            console.log('Selfie form submitted!');
            
            const selfieInput = document.getElementById('selfieInput');
            if (!selfieInput || !selfieInput.files.length) return;
            
            try {
                console.log('Calling selfie API...');
                const response = await fetch('/api/selfie-compliment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageData: 'test' })
                });
                
                console.log('Response status:', response.status);
                
                if (!response.ok) {
                    throw new Error('API error');
                }
                
                const data = await response.json();
                console.log('Got compliment:', data);
                
                const selfieCompliment = document.getElementById('selfieCompliment');
                if (selfieCompliment) {
                    selfieCompliment.textContent = data.compliment || 'You are amazing!';
                }
                
            } catch (error) {
                console.error('Selfie error:', error);
            }
        });
    }
    
    console.log('App initialized successfully!');
}
