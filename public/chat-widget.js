(function () {
    // Styles direkt ins Dokument einfügen
    const style = document.createElement('style');
    style.innerHTML = `
        #simply-chat-container { position: fixed; bottom: 20px; right: 20px; z-index: 10000; font-family: sans-serif; }
        #simply-chat-btn { width: 60px; height: 60px; border-radius: 50%; background: #0253EE; color: white; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; shadow: 0 10px 20px rgba(2,83,238,0.3); transition: transform 0.3s; }
        #simply-chat-btn:hover { transform: scale(1.1); }
        #simply-chat-window { display: none; width: 350px; height: 500px; background: #020A39; border-radius: 20px; overflow: hidden; flex-direction: column; shadow: 0 20px 40px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); }
        #simply-chat-header { background: linear-gradient(to right, #0253EE, #0476D8); padding: 15px; color: white; display: flex; justify-content: space-between; align-items: center; }
        #simply-chat-messages { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; }
        .msg { padding: 10px 15px; border-radius: 15px; font-size: 14px; max-width: 80%; line-height: 1.4; color: white; }
        .bot { background: rgba(255,255,255,0.1); align-self: flex-start; border-bottom-left-radius: 2px; }
        .user { background: #0253EE; align-self: flex-end; border-bottom-right-radius: 2px; }
        #simply-chat-input-area { padding: 15px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; gap: 10px; }
        #simply-chat-input { flex: 1; background: rgba(255,255,255,0.1); border: none; padding: 10px; border-radius: 10px; color: white; outline: none; }
    `;
    document.head.appendChild(style);

    // HTML Struktur
    const container = document.createElement('div');
    container.id = 'simply-chat-container';
    container.innerHTML = `
        <div id="simply-chat-window">
            <div id="simply-chat-header">
                <strong>Simply AI Bot</strong>
                <span style="cursor:pointer" id="simply-chat-close">✕</span>
            </div>
            <div id="simply-chat-messages">
                <div class="msg bot">Hallo! Ich bin dein KI-Assistent. Wie kann ich dir helfen?</div>
            </div>
            <div id="simply-chat-input-area">
                <input type="text" id="simply-chat-input" placeholder="Frage stellen...">
                <button id="simply-chat-send" style="background:#0253EE;border:none;color:white;padding:10px;border-radius:10px;cursor:pointer">➔</button>
            </div>
        </div>
        <button id="simply-chat-btn">💬</button>
    `;
    document.body.appendChild(container);

    const btn = document.getElementById('simply-chat-btn');
    const win = document.getElementById('simply-chat-window');
    const close = document.getElementById('simply-chat-close');
    const input = document.getElementById('simply-chat-input');
    const send = document.getElementById('simply-chat-send');
    const msgContainer = document.getElementById('simply-chat-messages');

    let chatHistory = [];

    function addMessage(text, isBot) {
        const div = document.createElement('div');
        div.className = 'msg ' + (isBot ? 'bot' : 'user');
        div.innerText = text;
        msgContainer.appendChild(div);
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    btn.onclick = () => {
        win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
        btn.style.display = win.style.display === 'flex' ? 'none' : 'flex';
    };
    close.onclick = () => {
        win.style.display = 'none';
        btn.style.display = 'flex';
    };

    async function sendToAI(text) {
        chatHistory.push({ role: 'user', content: text });
        addMessage(text, false);
        input.value = '';

        try {
            // Hier kommt deine Vercel-Domain rein!
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: chatHistory })
            });
            const data = await res.json();
            const reply = data.choices[0].message.content;
            chatHistory.push({ role: 'assistant', content: reply });
            addMessage(reply, true);
        } catch (e) {
            addMessage("Entschuldigung, ich habe gerade Verbindungsschwierigkeiten.", true);
        }
    }

    send.onclick = () => sendToAI(input.value);
    input.onkeypress = (e) => { if (e.key === 'Enter') sendToAI(input.value); };

})();
