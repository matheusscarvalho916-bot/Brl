// Controle dinâmico da Roleta Realista
let currentRotation = 0;

function spinRealRoulette() {
    const wheel = document.getElementById('roulette-wheel');
    const centerText = document.getElementById('roulette-center-text');
    const descDiv = document.getElementById('roulette-desc');
    const btn = document.getElementById('spin-btn');

    btn.disabled = true;
    btn.innerText = "Girando roda...";
    centerText.innerText = "🎲";
    descDiv.innerText = "Acelerando multiplicadores da mesa...";

    // Gera um ângulo alto de rotação (múltiplas voltas completas + deslocamento aleatório)
    const randomSpin = Math.floor(Math.random() * 360) + 2160; 
    currentRotation += randomSpin;
    
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        const outcomes = [
            { mult: "1000x", text: "🔥 Incrível! 1000x de multiplicador máximo validado na sessão!" },
            { mult: "500x", text: "⚡ Excelente! 500x liberado nas mesas de alta volatilidade." },
            { mult: "250x", text: "💎 Padrão de alta frequência premiado em 250x." },
            { mult: "100x", text: "🚀 Retorno seguro e consistente de 100x registrado." }
        ];
        
        const selected = outcomes[Math.floor(Math.random() * outcomes.length)];
        centerText.innerText = selected.mult;
        descDiv.innerText = selected.text;
        
        btn.disabled = false;
        btn.innerText = "🎲 Girar Novamente";
    }, 3500);
}

// Chat Global com Persistência
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const userName = document.getElementById('user-name');
const chatMessages = document.getElementById('chat-messages');

let messages = JSON.parse(localStorage.getItem('chat_messages_vip')) || [
    { user: "Carlos M. (São Paulo)", text: "Alguém testou a mesa de roleta ao vivo hoje?", time: "18:42" },
    { user: "Roberto S. (Rio de Janeiro)", text: "Sim, os multiplicadores de alta volatilidade estão pagando bem na sala VIP.", time: "18:45" },
    { user: "Marcos V. (Curitiba)", text: "O suporte VIP liberou meu saque instantâneo em menos de 2 minutos.", time: "18:50" }
];

function renderMessages() {
    chatMessages.innerHTML = '';
    messages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = "bg-[#222227] p-3 rounded-xl border border-white/5";
        msgDiv.innerHTML = `
            <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-bold text-amber-400">${escapeHtml(msg.user)}</span>
                <span class="text-[10px] text-gray-500">${msg.time}</span>
            </div>
            <p class="text-sm text-gray-200">${escapeHtml(msg.text)}</p>
        `;
        chatMessages.appendChild(msgDiv);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = userInput.value.trim();
    const name = userName.value.trim() || "Membro VIP";
    if (!text) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messages.push({ user: name, text: text, time: timeString });
    localStorage.setItem('chat_messages_vip', JSON.stringify(messages));

    renderMessages();
    userInput.value = '';
});

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

renderMessages();
