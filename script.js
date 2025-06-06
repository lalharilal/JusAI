document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const chatIcon = document.getElementById('chat-icon');
    const chatPopup = document.getElementById('chat-popup');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendButton = document.getElementById('chat-send');

    if (chatIcon && chatPopup && closeChat && chatMessages && chatInput && chatSendButton) {
        const openChatPopup = () => {
            chatPopup.classList.remove('hidden');
            setTimeout(() => {
                chatPopup.classList.remove('translate-y-4', 'opacity-0');
            }, 10);
        };

        const closeChatPopup = () => {
            chatPopup.classList.add('translate-y-4', 'opacity-0');
            setTimeout(() => {
                chatPopup.classList.add('hidden');
            }, 300); 
        };
        
        const addMessage = (message, sender) => {
            const messageWrapper = document.createElement('div');
            messageWrapper.classList.add('flex', 'mb-3');

            const messageBubble = document.createElement('div');
            messageBubble.classList.add('chat-message', 'rounded-lg', 'p-3');
            messageBubble.textContent = message;

            if (sender === 'user') {
                messageWrapper.classList.add('justify-end');
                messageBubble.classList.add('bg-blue-500', 'text-white');
            } else {
                messageWrapper.classList.add('justify-start');
                messageBubble.classList.add('bg-slate-200', 'text-slate-800');
            }

            messageWrapper.appendChild(messageBubble);
            chatMessages.appendChild(messageWrapper);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };
        
        const handleSendMessage = () => {
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                chatInput.value = '';

                setTimeout(() => {
                    addMessage("Thanks for your message. A support agent will be with you shortly.", "bot");
                }, 1000);
            }
        };

        chatIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            openChatPopup();
        });

        closeChat.addEventListener('click', () => {
            closeChatPopup();
        });
        
        chatSendButton.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });

        document.addEventListener('click', (e) => {
            if (!chatPopup.contains(e.target) && !chatIcon.contains(e.target) && !chatPopup.classList.contains('hidden')) {
                closeChatPopup();
            }
        });
    }


    const incidentForm = document.getElementById('incident-form');
    if (incidentForm) {
        incidentForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const formData = new FormData(incidentForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Form Submitted:', data);

            const submitButton = incidentForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Report Submitted!';
            submitButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            submitButton.classList.add('bg-green-600');
            submitButton.disabled = true;

            setTimeout(() => {
                submitButton.textContent = 'Submit Report';
                submitButton.classList.remove('bg-green-600');
                submitButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
                submitButton.disabled = false;
                incidentForm.reset();
            }, 3000);
        });
    }
});
