function spinRoulette() {
    const results = [
        { val: "🔥 1000x VIP", desc: "Multiplicador máximo liberado!" },
        { val: "💎 250x VIP", desc: "Sequência de alta frequência detectada." },
        { val: "⚡ 500x VIP", desc: "Excelente momento de liquidez." },
        { val: "🚀 750x VIP", desc: "Padrão de alta premiação ativado." }
    ];
    
    const btn = document.getElementById('spin-btn');
    const resDiv = document.getElementById('roulette-result');
    const descDiv = document.getElementById('roulette-desc');

    btn.disabled = true;
    btn.innerText = "Girando...";
    
    setTimeout(() => {
        const randomChoice = results[Math.floor(Math.random() * results.length)];
        resDiv.innerText = randomChoice.val;
        descDiv.innerText = randomChoice.desc;
        btn.disabled = false;
        btn.innerText = "🎲 Girar Novamente";
    }, 800);
}

const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const userName = document.getElementById('user-name');
const chatMessages = document.getElementById('chat-messages');

let messages = JSON.parse(localStorage.getItem('chat_messages_vip')) || [
    { user: "Carlos M. (São Paulo)", text: "Alguém testou a mesa de roleta hoje?", time: "18:42" },
    { user: "Roberto S. (Rio de Janeiro)", text: "Sim, os multiplicadores estão pagando bem.", time: "18:45" }
];

function renderMessages() {
    chatMessages.innerHTML = '';
    messages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = "bg-[#222227] p-3 rounded-xl border border-white/5";
        msgDiv.innerHTML = `
            <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-bold text-amber-400">${msg.user}</span>
                <span class="text-[10px] text-gray-500">${msg.time}</span>
            </div>
            <p class="text-sm text-gray-200">${msg.text}</p>
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

renderMessages();
