/**
 * Fast TV Launcher - Lightweight Clock & Greeting Engine
 * Otimizado para Smart TVs de 2GB de RAM (Zero churn de DOM e zero reflows inúteis).
 */

const ClockWidget = {
    clockTimer: null,
    lastTimeStr: '',
    lastGreeting: '',
    lastDateStr: '',

    init: function() {
        this.updateTime();
        // Atualiza a cada segundo, mas só toca no DOM se o texto mudar
        this.clockTimer = setInterval(() => this.updateTime(), 1000);
    },

    updateTime: function() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const timeStr = `${h}:${m}`;

        // 1. Relógio Principal (só atualiza quando o minuto vira)
        if (timeStr !== this.lastTimeStr) {
            this.lastTimeStr = timeStr;
            const clockBadge = document.getElementById('clock-badge');
            if (clockBadge) clockBadge.textContent = timeStr;

            // 2. Saudação (só atualiza quando o período muda)
            const hour = now.getHours();
            let greeting = 'Boa noite';
            if (hour >= 5 && hour < 12) {
                greeting = 'Bom dia';
            } else if (hour >= 12 && hour < 18) {
                greeting = 'Boa tarde';
            }

            if (greeting !== this.lastGreeting) {
                this.lastGreeting = greeting;
                const greetingEl = document.getElementById('greeting-title');
                if (greetingEl) greetingEl.textContent = greeting;
            }

            // 3. Data por extenso
            const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
            const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            const dateFormatted = `${dias[now.getDay()]}, ${now.getDate()} de ${meses[now.getMonth()]}`;

            if (dateFormatted !== this.lastDateStr) {
                this.lastDateStr = dateFormatted;
                const dateEl = document.getElementById('greeting-date');
                if (dateEl) dateEl.textContent = dateFormatted;
            }
        }
    }
};

window.ClockWidget = ClockWidget;
