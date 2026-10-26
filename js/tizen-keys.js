/**
 * Fast TV Launcher - Tizen Remote Control Key Handler
 * Gerencia o registro e mapeamento de teclas para a Smart TV Samsung (UN43T5300 / Tizen OS).
 */

const TVKeys = {
    // Teclas Direcionais e Seleção (Padrão W3C / Tizen)
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,

    // Tecla Voltar / Return da Samsung (Código proprietário Tizen)
    RETURN: 10009,
    BACKSPACE: 8, // Fallback para desenvolvimento em navegadores desktop

    // Tecla de Saída do App
    EXIT: 10182,

    // Teclas de Mídia
    PLAY: 415,
    PAUSE: 19,
    PLAY_PAUSE: 10252,
    STOP: 413,
    FAST_FWD: 417,
    REWIND: 412,

    // Teclas Coloridas (Atalhos rápidos do controle remoto)
    RED: 403,
    GREEN: 404,
    YELLOW: 405,
    BLUE: 406,

    // Teclas de Informação e Menu
    INFO: 457,
    MENU: 18,
    EXTRA: 10253,

    // Teclas Numéricas (0 a 9: 48 a 57)
    NUM_0: 48,
    NUM_1: 49,
    NUM_2: 50,
    NUM_3: 51,
    NUM_4: 52,
    NUM_5: 53,
    NUM_6: 54,
    NUM_7: 55,
    NUM_8: 56,
    NUM_9: 57,

    /**
     * Registra as teclas especiais na API da Samsung/Tizen TV.
     * No Tizen, teclas como Return, Media e Color Keys DEVEM ser registradas explicitamente
     * para que a TV repasse o evento ao Web App em vez de interceptar.
     */
    registerKeys: function() {
        if (typeof window.tizen !== 'undefined' && window.tizen.tvinputdevice) {
            console.log('[TizenKeys] Detectado ambiente Tizen TV. Registrando teclas...');
            
            const specialKeys = [
                'MediaPlay',
                'MediaPause',
                'MediaPlayPause',
                'MediaStop',
                'MediaFastForward',
                'MediaRewind',
                'ColorF0Red',
                'ColorF1Green',
                'ColorF2Yellow',
                'ColorF3Blue',
                'Info',
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
            ];

            specialKeys.forEach(function(keyName) {
                try {
                    window.tizen.tvinputdevice.registerKey(keyName);
                } catch (e) {
                    // Algumas teclas podem não ser suportadas em todos os modelos de controle
                    console.warn('[TizenKeys] Não foi possível registrar a tecla: ' + keyName, e);
                }
            });
            console.log('[TizenKeys] Registro de teclas concluído.');
        } else {
            console.log('[TizenKeys] Modo Desktop / Emulador ativado (APIs nativas do Tizen não presentes).');
        }
    },

    /**
     * Fecha o aplicativo retornando para a interface de TV nativa.
     */
    exitApp: function() {
        console.log('[TizenKeys] Encerrando Fast TV Launcher...');
        if (typeof window.tizen !== 'undefined' && window.tizen.application) {
            try {
                window.tizen.application.getCurrentApplication().exit();
            } catch (err) {
                console.error('[TizenKeys] Erro ao sair pelo Tizen API:', err);
                window.close();
            }
        } else {
            if (window.showToast) {
                window.showToast('Fechando launcher (simulado no navegador)...', 'info');
            }
        }
    }
};

window.TVKeys = TVKeys;
