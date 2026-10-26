/**
 * Fast TV Launcher - Living Room Spatial Navigation Engine (10-Foot UI)
 * Otimizado para Smart TV Samsung UN43T5300 (Tizen 5.0).
 * Integração com Hero Spotlight, Apple TV Audio Feedback e Focus Trap em Modais.
 */

class SpatialNavigation {
    constructor() {
        this.rows = [];
        this.currentRowIndex = 0;
        this.currentColIndex = 0;
        this.currentFocusedElement = null;
        this.isAudioEnabled = true;
        this.audioCtx = null;
        this.rowMemory = {};
    }

    init() {
        this.scanElements();
        this.setupEventListeners();
        this.setInitialFocus();
        console.log(`[Navigation] Sistema de navegação inicializado com ${this.rows.length} grupos.`);
    }

    /**
     * Detecta se algum diálogo modal está ativo
     */
    getActiveModal() {
        return document.querySelector('.modal-backdrop.modal-active, .modal-overlay.modal-active');
    }

    /**
     * Detecta se o protetor de tela (dimmer) está ativo
     */
    isDimmerActive() {
        const dimmer = document.getElementById('cinema-dimmer') || document.getElementById('oled-dimmer');
        return dimmer && (dimmer.classList.contains('dimmer-active') || dimmer.style.opacity === '1');
    }

    /**
     * Escaneia os elementos navegáveis.
     * Se um modal estiver aberto, trava o foco estritamente dentro dele (Focus Trap).
     */
    scanElements() {
        this.rows = [];
        const activeModal = this.getActiveModal();

        if (activeModal) {
            const modalRows = activeModal.querySelectorAll('.nav-row');
            modalRows.forEach((rowEl, idx) => {
                const items = Array.from(rowEl.querySelectorAll('.focusable')).filter(el => !el.disabled);
                if (items.length > 0) {
                    this.rows.push({
                        id: `modal-row-${idx}`,
                        element: rowEl,
                        items: items
                    });
                }
            });

            if (this.rows.length === 0) {
                const items = Array.from(activeModal.querySelectorAll('.focusable')).filter(el => !el.disabled);
                if (items.length > 0) {
                    this.rows.push({
                        id: 'modal-generic-row',
                        element: activeModal,
                        items: items
                    });
                }
            }

            this.currentRowIndex = 0;
            this.currentColIndex = 0;
            return;
        }

        // Navegação padrão na tela inicial
        const container = document.querySelector('.cinematic-viewport') || 
                          document.querySelector('.launcher-viewport') || 
                          document.body;

        const rowElements = container.querySelectorAll('.nav-row');
        rowElements.forEach((rowEl, rowIndex) => {
            // Ignora rows dentro de modais quando nenhum modal está aberto
            if (rowEl.closest('.modal-backdrop') || rowEl.closest('.modal-overlay')) {
                return;
            }

            const items = Array.from(rowEl.querySelectorAll('.focusable')).filter(el => {
                return !el.disabled && el.offsetParent !== null;
            });

            if (items.length > 0) {
                this.rows.push({
                    id: rowEl.id || `row-${rowIndex}`,
                    element: rowEl,
                    items: items
                });
            }
        });
    }

    setInitialFocus() {
        if (this.rows.length === 0) return;

        let targetRowIndex = this.rows.findIndex(r => r.element.id === 'apps-row');
        if (targetRowIndex === -1) targetRowIndex = 0;

        this.currentRowIndex = targetRowIndex;
        this.currentColIndex = 0;
        this.applyFocus(this.currentRowIndex, this.currentColIndex, false);
    }

    applyFocus(rowIndex, colIndex, shouldPlaySound = false) {
        if (!this.rows[rowIndex] || !this.rows[rowIndex].items[colIndex]) {
            return;
        }

        if (this.currentFocusedElement) {
            this.currentFocusedElement.classList.remove('has-focus');
            this.currentFocusedElement.setAttribute('tabindex', '-1');
        }

        const target = this.rows[rowIndex].items[colIndex];
        this.currentRowIndex = rowIndex;
        this.currentColIndex = colIndex;
        this.rowMemory[rowIndex] = colIndex;
        this.currentFocusedElement = target;

        target.setAttribute('tabindex', '0');
        target.classList.add('has-focus');
        target.focus();

        // Atualiza Hero Spotlight Cinemático (Título, Tag, Sinopse e Iluminação de Fundo)
        if (window.AppLauncher && window.AppLauncher.updateHero) {
            window.AppLauncher.updateHero(target);
        }

        // Atualiza a aba ativa no cabeçalho superior
        const currentRow = this.rows[rowIndex];
        if (currentRow && !target.classList.contains('tab-item')) {
            if (currentRow.element.id === 'apps-row') this.updateActiveTab('apps');
            else if (currentRow.element.id === 'inputs-row') this.updateActiveTab('inputs');
            else if (currentRow.element.id === 'tools-row') this.updateActiveTab('tools');
        }

        this.ensureVisible(target, this.rows[rowIndex].element);

        if (shouldPlaySound) {
            this.playClickSound();
        }
    }

    updateActiveTab(tabName) {
        const tabs = document.querySelectorAll('.tab-item');
        tabs.forEach(t => {
            if (t.getAttribute('data-tab') === tabName) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });
    }

    ensureVisible(target, rowContainer) {
        if (!rowContainer || !target) return;

        if (rowContainer.scrollWidth > rowContainer.clientWidth) {
            const containerRect = rowContainer.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();

            const offset = (targetRect.left + targetRect.width / 2) - 
                           (containerRect.left + containerRect.width / 2);

            rowContainer.scrollBy({
                left: offset,
                behavior: 'smooth'
            });
        }

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
        });
    }

    navigate(direction) {
        if (this.rows.length === 0) return;

        // Suporte ao modo de reorganização interativa de aplicativos
        if (window.AppLauncher && window.AppLauncher.isReorderMode) {
            if (direction === 'LEFT' || direction === 'RIGHT') {
                const moved = window.AppLauncher.moveFocusedApp(direction);
                if (moved) this.playClickSound();
                return;
            }
        }

        const currentRow = this.rows[this.currentRowIndex];
        if (!currentRow) return;

        switch (direction) {
            case 'LEFT':
                if (this.currentColIndex > 0) {
                    this.applyFocus(this.currentRowIndex, this.currentColIndex - 1, true);
                } else {
                    this.playLimitSound();
                }
                break;

            case 'RIGHT':
                if (this.currentColIndex < currentRow.items.length - 1) {
                    this.applyFocus(this.currentRowIndex, this.currentColIndex + 1, true);
                } else {
                    this.playLimitSound();
                }
                break;

            case 'UP':
                if (this.currentRowIndex > 0) {
                    const nextRowIndex = this.currentRowIndex - 1;
                    const nextCol = this.findNearestColumn(nextRowIndex, this.currentColIndex);
                    this.applyFocus(nextRowIndex, nextCol, true);
                }
                break;

            case 'DOWN':
                if (this.currentRowIndex < this.rows.length - 1) {
                    const nextRowIndex = this.currentRowIndex + 1;
                    const nextCol = this.findNearestColumn(nextRowIndex, this.currentColIndex);
                    this.applyFocus(nextRowIndex, nextCol, true);
                }
                break;
        }
    }

    findNearestColumn(targetRowIndex, currentCol) {
        const targetRow = this.rows[targetRowIndex];
        if (!targetRow || targetRow.items.length === 0) return 0;

        if (typeof this.rowMemory[targetRowIndex] !== 'undefined') {
            const rememberedCol = this.rowMemory[targetRowIndex];
            if (rememberedCol < targetRow.items.length) {
                return rememberedCol;
            }
        }
        return Math.min(currentCol, targetRow.items.length - 1);
    }

    selectCurrent() {
        if (window.AppLauncher && window.AppLauncher.isReorderMode) {
            window.AppLauncher.toggleReorderMode();
            this.playSelectSound();
            return;
        }

        if (this.currentFocusedElement) {
            this.playSelectSound();
            this.currentFocusedElement.classList.add('active-press');
            setTimeout(() => {
                if (this.currentFocusedElement) {
                    this.currentFocusedElement.classList.remove('active-press');
                }
            }, 120);
            this.currentFocusedElement.click();
        }
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => {
            const keyCode = e.keyCode || e.which;

            // Se o protetor de tela estiver ativo, qualquer tecla acorda a tela
            if (this.isDimmerActive()) {
                e.preventDefault();
                if (window.toggleScreenSaver) window.toggleScreenSaver();
                return;
            }

            switch (keyCode) {
                case TVKeys.LEFT:
                    e.preventDefault();
                    this.navigate('LEFT');
                    break;

                case TVKeys.RIGHT:
                    e.preventDefault();
                    this.navigate('RIGHT');
                    break;

                case TVKeys.UP:
                    e.preventDefault();
                    this.navigate('UP');
                    break;

                case TVKeys.DOWN:
                    e.preventDefault();
                    this.navigate('DOWN');
                    break;

                case TVKeys.ENTER:
                    e.preventDefault();
                    this.selectCurrent();
                    break;

                case TVKeys.RETURN:
                case TVKeys.BACKSPACE:
                    e.preventDefault();
                    this.handleReturn();
                    break;

                case TVKeys.INFO:
                    e.preventDefault();
                    if (window.toggleSystemInfoModal) window.toggleSystemInfoModal();
                    break;

                case TVKeys.RED:
                    if (window.AppLauncher) window.AppLauncher.launch('youtube');
                    break;

                case TVKeys.GREEN:
                    if (window.AppLauncher) window.AppLauncher.launch('netflix');
                    break;

                case TVKeys.YELLOW:
                    if (window.AppLauncher) window.AppLauncher.toggleReorderMode();
                    break;

                case TVKeys.BLUE:
                    if (window.AppLauncher) window.AppLauncher.cleanMemory();
                    break;

                default:
                    break;
            }
        });

        // Suporte a Mouse/Pointer (Para testes locais)
        document.addEventListener('mouseover', (e) => {
            const focusable = e.target.closest('.focusable');
            if (focusable && focusable !== this.currentFocusedElement) {
                this.setFocusByElement(focusable);
            }
        });
    }

    setFocusByElement(element) {
        for (let r = 0; r < this.rows.length; r++) {
            const c = this.rows[r].items.indexOf(element);
            if (c !== -1) {
                this.applyFocus(r, c, false);
                return;
            }
        }
    }

    handleReturn() {
        const activeModal = this.getActiveModal();
        if (activeModal) {
            if (window.closeModals) window.closeModals();
            return;
        }

        // Se estiver no trilho de entradas ou ferramentas, retorna para os apps
        const mainAppsRow = this.rows.findIndex(r => r.element.id === 'apps-row');
        if (this.currentRowIndex !== mainAppsRow && mainAppsRow !== -1) {
            this.applyFocus(mainAppsRow, this.rowMemory[mainAppsRow] || 0, true);
            return;
        }

        // Se já estiver na raiz de apps, exibe diálogo de confirmação de saída
        if (window.confirmExit) {
            window.confirmExit();
        } else {
            TVKeys.exitApp();
        }
    }

    getAudioContext() {
        if (!this.audioCtx && typeof (window.AudioContext || window.webkitAudioContext) !== 'undefined') {
            const AudioClass = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioClass();
        }
        return this.audioCtx;
    }

    /**
     * Som de Toque Suave (Apple TV Living Room Tap)
     */
    playClickSound() {
        if (!this.isAudioEnabled) return;
        try {
            const ctx = this.getAudioContext();
            if (!ctx) return;
            if (ctx.state === 'suspended') ctx.resume();

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.045);

            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.045);
        } catch (e) {}
    }

    /**
     * Som de Seleção Confirmada
     */
    playSelectSound() {
        if (!this.isAudioEnabled) return;
        try {
            const ctx = this.getAudioContext();
            if (!ctx) return;
            if (ctx.state === 'suspended') ctx.resume();

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06);

            gain.gain.setValueAtTime(0.06, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.06);
        } catch (e) {}
    }

    /**
     * Som Suave de Limite de Borda
     */
    playLimitSound() {
        if (!this.isAudioEnabled) return;
        try {
            const ctx = this.getAudioContext();
            if (!ctx) return;
            if (ctx.state === 'suspended') ctx.resume();

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, ctx.currentTime);

            gain.gain.setValueAtTime(0.02, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.03);
        } catch (e) {}
    }
}

window.SpatialNavigation = SpatialNavigation;
