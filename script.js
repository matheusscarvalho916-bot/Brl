// Função da Roleta Animada Real
let currentRotation = 0;

function spinRealRoulette() {
    const wheel = document.getElementById('roulette-wheel');
    const centerText = document.getElementById('roulette-center-text');
    const descDiv = document.getElementById('roulette-desc');
    const btn = document.getElementById('spin-btn');

    btn.disabled = true;
    btn.innerText = "Girando...";
    centerText.innerText = "...";
    descDiv.innerText = "Analisando volatilidade da mesa...";

    // Sorteia um número de voltas completas (entre 4 e 7) + um ângulo extra aleatório
    const randomDegree = Math.floor(Math.random() * 360) + 1440; 
    currentRotation += randomDegree;
    
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        const outcomes = [
            { mult: "1000x", text: "🔥 Multiplicador Máximo de 1000x ativado na sala VIP!" },
            { mult: "500x", text: "⚡ Excelente momento! 500x liberado nas mesas de alta banca." },
            { mult: "250x", text: "💎 Sequência de alta frequência detectada: 250x." },
            { mult: "100x", text: "🚀 Retorno estável de 100x confirmado pelo sistema." }
        ];
        
        const selected = outcomes[Math.floor(Math.random() * outcomes.length)];
        centerText.innerText = selected.mult;
        descDiv.innerText = selected.text;
        
        btn.disabled = false;
        btn.innerText = "🎲 Girar Novamente";
    }, 3000);
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
