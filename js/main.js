/**
 * Fast TV Launcher - Living Room Main Controller
 * Otimizado para Tizen 5.0 (Samsung Smart TV UN43T5300AGXZD).
 * Interface Humana Cinemática sem ruído de IA.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('[FastLauncher] Inicializando Launcher Cinemático...');

    // 1. Registra chaves especiais de hardware da Samsung
    if (window.TVKeys) {
        window.TVKeys.registerKeys();
    }

    // 2. Aplica ordem de aplicativos personalizada salva pelo usuário
    if (window.AppLauncher && window.AppLauncher.applySavedAppOrder) {
        window.AppLauncher.applySavedAppOrder();
    }

    // 3. Inicia saudação, relógio e previsão climática
    if (window.ClockWidget) {
        window.ClockWidget.init();
    }
    if (window.WeatherWidget) {
        window.WeatherWidget.init();
    }

    // 4. Conecta ouvintes de eventos para cards, botões e modais
    setupEventListeners();

    // 5. Inicia motor de navegação espacial
    window.navEngine = new SpatialNavigation();
    window.navEngine.init();

    // 6. Mensagem inicial discreta
    showToast('Fast TV Launcher Pronto &bull; 60 FPS', 'info', 2200);

    // 7. Retomada de Standby da Smart TV (Multitasking do Tizen)
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            console.log('[FastLauncher] TV retomada de standby.');
            if (window.ClockWidget) {
                window.ClockWidget.updateTime();
            }
            if (window.WeatherWidget) {
                window.WeatherWidget.loadWeather();
            }
            if (window.navEngine) {
                window.navEngine.scanElements();
            }
        }
    });
});

function setupEventListeners() {
    // 0. Barra de Abas Superiores (Top Tabs)
    document.querySelectorAll('.tab-item').forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
            const tab = tabBtn.getAttribute('data-tab');
            document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
            tabBtn.classList.add('active');

            if (window.navEngine) {
                let targetId = 'apps-row';
                if (tab === 'apps') targetId = 'apps-row';
                else if (tab === 'inputs') targetId = 'inputs-row';
                else if (tab === 'tools') targetId = 'tools-row';
                else if (tab === 'all') targetId = 'apps-row';

                const targetRowIndex = window.navEngine.rows.findIndex(r => r.element.id === targetId);
                if (targetRowIndex !== -1) {
                    window.navEngine.applyFocus(targetRowIndex, 0, true);
                }
            }
        });
    });

    // 1. Cards de Aplicativos de Streaming
    document.querySelectorAll('[data-app]').forEach(card => {
        card.addEventListener('click', () => {
            const app = card.getAttribute('data-app');
            if (window.AppLauncher) window.AppLauncher.launch(app);
        });
    });

    // 2. Cards de Entradas de Vídeo / HDMI
    document.querySelectorAll('[data-input]').forEach(card => {
        card.addEventListener('click', () => {
            const input = card.getAttribute('data-input');
            if (window.AppLauncher) window.AppLauncher.switchSource(input);
        });
    });

    // 3. Ferramentas e Ajustes Rápidos
    const toolSleep = document.getElementById('tool-sleep');
    if (toolSleep) {
        toolSleep.addEventListener('click', () => toggleSleepModal());
    }

    const toolOptimize = document.getElementById('tool-optimize');
    if (toolOptimize) {
        toolOptimize.addEventListener('click', () => {
            if (window.AppLauncher) window.AppLauncher.cleanMemory();
        });
    }

    const toolReorder = document.getElementById('tool-reorder');
    if (toolReorder) {
        toolReorder.addEventListener('click', () => {
            if (window.AppLauncher) window.AppLauncher.toggleReorderMode();
        });
    }

    const toolDimmer = document.getElementById('tool-dimmer');
    if (toolDimmer) {
        toolDimmer.addEventListener('click', () => toggleScreenSaver());
    }

    const toolInfo = document.getElementById('tool-info');
    if (toolInfo) {
        toolInfo.addEventListener('click', () => toggleSystemInfoModal());
    }

    // 4. Botões de Seleção do Sleep Timer
    document.querySelectorAll('[data-timer]').forEach(btn => {
        btn.addEventListener('click', () => {
            const min = parseInt(btn.getAttribute('data-timer'), 10);
            if (window.AppLauncher) window.AppLauncher.setSleepTimer(min);
            closeModals();
        });
    });

    // 5. Botões de Ação de Modais
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
        btn.addEventListener('click', () => closeModals());
    });

    const btnModalCancel = document.getElementById('modal-cancel');
    if (btnModalCancel) {
        btnModalCancel.addEventListener('click', () => closeModals());
    }

    const btnModalConfirm = document.getElementById('modal-confirm-exit');
    if (btnModalConfirm) {
        btnModalConfirm.addEventListener('click', () => {
            if (window.TVKeys) window.TVKeys.exitApp();
        });
    }

    // 6. Protetor de tela / Apagar painel ao clicar
    const dimmer = document.getElementById('cinema-dimmer');
    if (dimmer) {
        dimmer.addEventListener('click', () => toggleScreenSaver());
    }
}

/**
 * Notificador Toast Elegante
 */
let toastTimeout = null;
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.getElementById('toast-bar');
    const msgEl = document.getElementById('toast-msg');
    if (!toast || !msgEl) return;

    if (toastTimeout) clearTimeout(toastTimeout);

    msgEl.innerHTML = message;
    toast.classList.add('toast-shown');
    toast.classList.add('toast-active');

    toastTimeout = setTimeout(() => {
        toast.classList.remove('toast-shown');
        toast.classList.remove('toast-active');
    }, duration);
}
window.showToast = showToast;

/**
 * Modal de Informações da TV
 */
function toggleSystemInfoModal() {
    const modal = document.getElementById('info-modal');
    if (!modal) return;

    if (modal.classList.contains('modal-active')) {
        closeModals();
    } else {
        const info = window.AppLauncher ? window.AppLauncher.getSystemInfo() : {};
        const modelEl = document.getElementById('info-model');
        const resEl = document.getElementById('info-res');
        const duidEl = document.getElementById('info-duid');

        if (modelEl) modelEl.textContent = info.modelName || 'Samsung Smart TV';
        if (resEl) resEl.textContent = info.resolution || '1920x1080 Full HD @ 60Hz';
        if (duidEl) duidEl.textContent = info.duid || '43CJJ2SSZA6DC';

        modal.classList.add('modal-active');
        if (window.navEngine) {
            window.navEngine.scanElements();
            const btn = modal.querySelector('.focusable');
            if (btn) window.navEngine.setFocusByElement(btn);
        }
    }
}
window.toggleSystemInfoModal = toggleSystemInfoModal;

/**
 * Modal do Temporizador de Sono (Sleep Timer)
 */
function toggleSleepModal() {
    const modal = document.getElementById('sleep-modal');
    if (!modal) return;

    if (modal.classList.contains('modal-active')) {
        closeModals();
    } else {
        modal.classList.add('modal-active');
        if (window.navEngine) {
            window.navEngine.scanElements();
            const firstChoice = modal.querySelector('.sleep-btn') || modal.querySelector('.focusable');
            if (firstChoice) window.navEngine.setFocusByElement(firstChoice);
        }
    }
}
window.toggleSleepModal = toggleSleepModal;

/**
 * Confirmação de Saída
 */
function confirmExit() {
    const modal = document.getElementById('exit-modal');
    if (!modal) {
        if (window.TVKeys) window.TVKeys.exitApp();
        return;
    }
    modal.classList.add('modal-active');
    if (window.navEngine) {
        window.navEngine.scanElements();
        const btn = modal.querySelector('#modal-cancel');
        if (btn) window.navEngine.setFocusByElement(btn);
    }
}
window.confirmExit = confirmExit;

/**
 * Fechar Todos os Modais
 */
function closeModals() {
    document.querySelectorAll('.modal-active').forEach(m => m.classList.remove('modal-active'));
    if (window.navEngine) {
        window.navEngine.scanElements();
        window.navEngine.setInitialFocus();
    }
}
window.closeModals = closeModals;

/**
 * Modo Cinema / Dimmer (Apagar iluminação da tela)
 */
let isDimmed = false;
function toggleScreenSaver() {
    const dimmer = document.getElementById('cinema-dimmer') || document.getElementById('oled-dimmer');
    if (!dimmer) return;

    isDimmed = !isDimmed;
    if (isDimmed) {
        dimmer.classList.add('dimmer-active');
    } else {
        dimmer.classList.remove('dimmer-active');
    }
}
window.toggleScreenSaver = toggleScreenSaver;
