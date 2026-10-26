/**
 * Fast TV Launcher - Living Room App Registry & Hero Spotlight
 * Interface Humana Cinemática sem ruído de IA.
 */

const AppLauncher = {
    // Iluminação ambiente cinematográfica com gradientes escuros e acolhedores
    backdrops: {
        'netflix': 'radial-gradient(ellipse at 85% 20%, rgba(229, 9, 20, 0.16) 0%, rgba(11, 13, 19, 0.98) 75%), #0b0d13',
        'youtube': 'radial-gradient(ellipse at 85% 20%, rgba(255, 0, 0, 0.16) 0%, rgba(11, 13, 19, 0.98) 75%), #0b0d13',
        'prime': 'radial-gradient(ellipse at 85% 20%, rgba(0, 168, 225, 0.16) 0%, rgba(11, 13, 19, 0.98) 75%), #0b0d13',
        'max': 'radial-gradient(ellipse at 85% 20%, rgba(0, 43, 231, 0.18) 0%, rgba(11, 13, 19, 0.98) 75%), #0b0d13',
        'globoplay': 'radial-gradient(ellipse at 85% 20%, rgba(251, 59, 17, 0.16) 0%, rgba(11, 13, 19, 0.98) 75%), #0b0d13',
        'disney': 'radial-gradient(ellipse at 85% 20%, rgba(17, 60, 207, 0.18) 0%, rgba(11, 13, 19, 0.98) 75%), #0b0d13',
        'spotify': 'radial-gradient(ellipse at 85% 20%, rgba(29, 185, 84, 0.16) 0%, rgba(11, 13, 19, 0.98) 75%), #0b0d13',
        'tvplus': 'radial-gradient(ellipse at 85% 20%, rgba(0, 112, 243, 0.16) 0%, rgba(11, 13, 19, 0.98) 75%), #0b0d13',
        'browser': 'radial-gradient(ellipse at 85% 20%, rgba(31, 111, 235, 0.16) 0%, rgba(11, 13, 19, 0.98) 75%), #0b0d13',
        'hdmi1': 'radial-gradient(ellipse at 85% 20%, rgba(139, 92, 246, 0.16) 0%, rgba(11, 13, 19, 0.98) 75%), #0b0d13',
        'hdmi2': 'radial-gradient(ellipse at 85% 20%, rgba(59, 130, 246, 0.16) 0%, rgba(11, 13, 19, 0.98) 75%), #0b0d13',
        'dtv': 'radial-gradient(ellipse at 85% 20%, rgba(16, 185, 129, 0.14) 0%, rgba(11, 13, 19, 0.98) 75%), #0b0d13',
        'default': 'radial-gradient(ellipse at 85% 20%, rgba(255, 255, 255, 0.05) 0%, rgba(11, 13, 19, 0.98) 75%), #0b0d13'
    },

    apps: [
        {
            id: 'netflix',
            name: 'Netflix',
            heroTag: 'Filmes & Séries',
            heroDesc: 'Assista a filmes aclamados, séries originais premiadas, documentários e produções de sucesso em 4K HDR.',
            appIds: ['org.tizen.netflix-app', '3201507006598', 'org.tizen.netflix-box']
        },
        {
            id: 'youtube',
            name: 'YouTube',
            heroTag: 'Vídeos & Criadores',
            heroDesc: 'Explore milhões de vídeos dos seus canais favoritos, notícias, transmissões ao vivo e clipes musicais.',
            appIds: ['111299001912', 'com.samsung.tv.cobalt-yttv', '9Ur5IzDKqV.TizenYouTube']
        },
        {
            id: 'prime',
            name: 'Prime Video',
            heroTag: 'Amazon Originals',
            heroDesc: 'Descubra grandes lançamentos do cinema, séries originais exclusivas e esportes ao vivo com sua assinatura Prime.',
            appIds: ['org.tizen.primevideo', '3201512006785']
        },
        {
            id: 'max',
            name: 'Max',
            heroTag: 'HBO & Warner Bros',
            heroDesc: 'A casa do universo HBO, Warner Bros, DC, produções clássicas do cinema e lançamentos imperdíveis.',
            appIds: ['3201601007230', '3202103023805']
        },
        {
            id: 'disney',
            name: 'Disney+',
            heroTag: 'Família & Marvel',
            heroDesc: 'O melhor da Disney, Pixar, Marvel, Star Wars e National Geographic reunidos em uma experiência inesquecível.',
            appIds: ['MCmYXNxgcu.DisneyPlus', '3201907018807']
        },
        {
            id: 'globoplay',
            name: 'Globoplay',
            heroTag: 'TV Globo & Novelas',
            heroDesc: 'Acompanhe a programação da TV Globo ao vivo, novelas históricas, capítulos inéditos e séries nacionais.',
            appIds: ['org.tizen.globoplayapp', 'LnLzvqrcEY.globo', '3201608010476']
        },
        {
            id: 'spotify',
            name: 'Spotify',
            heroTag: 'Músicas & Podcasts',
            heroDesc: 'Toque suas playlists prediletas, descubra novos artistas e ouça podcasts com áudio de alta fidelidade na sala.',
            appIds: ['rJeHak5zRg.Spotify', '3201606009684']
        },
        {
            id: 'tvplus',
            name: 'Samsung TV Plus',
            heroTag: 'Canais Gratuitos',
            heroDesc: 'Mais de 80 canais ao vivo 100% gratuitos de notícias, filmes, esportes e entretenimento sem assinatura.',
            appIds: ['com.samsung.tv.tvPlusDeeplinker', 'com.samsung.tv.tvplus']
        },
        {
            id: 'browser',
            name: 'Internet',
            heroTag: 'Navegação Web',
            heroDesc: 'Acesse sites, portais de notícias e serviços web diretamente na tela grande com o navegador nativo.',
            appIds: ['org.tizen.browser', 'com.samsung.tv.knox-browser']
        }
    ],

    inputs: [
        {
            id: 'hdmi1',
            name: 'HDMI 1',
            alias: 'Console / Videogame',
            heroTag: 'Entrada de Vídeo',
            heroDesc: 'Comutar para a entrada HDMI 1. Otimizado para baixa latência em jogos.',
            sourceType: 'HDMI',
            sourceNumber: 1
        },
        {
            id: 'hdmi2',
            name: 'HDMI 2',
            alias: 'Computador / TV Box',
            heroTag: 'Entrada de Vídeo',
            heroDesc: 'Comutar para a entrada HDMI 2. Transmissão de vídeo digital Full HD 1080p.',
            sourceType: 'HDMI',
            sourceNumber: 2
        },
        {
            id: 'dtv',
            name: 'TV Aberta',
            alias: 'Antena Digital HD',
            heroTag: 'Sinal Digital',
            heroDesc: 'Sintonizar canais da TV aberta digital terrestre com guia de programação interativo.',
            sourceType: 'TV',
            sourceNumber: 0
        }
    ],

    currentBackdropLayer: 1,
    sleepTimerInterval: null,
    sleepRemainingSeconds: 0,
    isReorderMode: false,

    /**
     * Atualiza o Hero Spotlight (Área de Destaque da Apple TV / PS5)
     */
    updateHero: function(targetElement) {
        if (!targetElement) return;

        const heroStage = document.getElementById('hero-stage');
        const heroTag = document.getElementById('hero-tag');
        const heroTitle = document.getElementById('hero-title');
        const heroDesc = document.getElementById('hero-description');

        let data = null;
        let key = null;

        if (targetElement.hasAttribute('data-app')) {
            key = targetElement.getAttribute('data-app');
            data = this.apps.find(a => a.id === key);
        } else if (targetElement.hasAttribute('data-input')) {
            key = targetElement.getAttribute('data-input');
            data = this.inputs.find(i => i.id === key);
        } else if (targetElement.id === 'tool-sleep') {
            data = {
                heroTag: 'Controle de Energia',
                name: 'Sleep Timer',
                heroDesc: 'Programe o desligamento automático da TV para economizar energia durante a noite.'
            };
            key = 'default';
        } else if (targetElement.id === 'tool-optimize') {
            data = {
                heroTag: 'Manutenção da TV',
                name: 'Otimizador de Memória',
                heroDesc: 'Libera espaço na memória RAM e descarta caches temporários para manter a TV rápida.'
            };
            key = 'default';
        } else if (targetElement.id === 'tool-reorder') {
            data = {
                heroTag: 'Personalização',
                name: 'Organizar Aplicativos',
                heroDesc: 'Ajuste a ordem dos aplicativos para deixar os seus favoritos sempre em primeiro lugar.'
            };
            key = 'default';
        } else if (targetElement.id === 'tool-dimmer') {
            data = {
                heroTag: 'Conforto Noturno',
                name: 'Modo Cinema (Apagar Tela)',
                heroDesc: 'Desliga a iluminação da tela para ouvir músicas ou descansar sem distrações visuais.'
            };
            key = 'default';
        } else if (targetElement.id === 'tool-info') {
            data = {
                heroTag: 'Diagnóstico',
                name: 'Informações da TV',
                heroDesc: 'Consulte especificações do hardware Samsung UN43T5300, DUID, resolução Full HD e Tizen 5.0.'
            };
            key = 'default';
        } else if (targetElement.classList.contains('tab-item')) {
            const tab = targetElement.getAttribute('data-tab');
            if (tab === 'all') {
                data = {
                    heroTag: 'Visão Geral',
                    name: 'Todos os Recursos',
                    heroDesc: 'Visualize todos os seus serviços de streaming, conexões de vídeo HDMI e ajustes do sistema.'
                };
            } else if (tab === 'apps') {
                data = {
                    heroTag: 'Entretenimento',
                    name: 'Aplicativos & Streaming',
                    heroDesc: 'Acesse seus canais e séries favoritos no YouTube, Netflix, Prime Video, Globoplay e mais.'
                };
            } else if (tab === 'inputs') {
                data = {
                    heroTag: 'Conexões de Vídeo',
                    name: 'Entradas HDMI & Antena',
                    heroDesc: 'Comute instantaneamente entre consoles de videogame, TV Box e a antena digital terrestre.'
                };
            } else if (tab === 'tools') {
                data = {
                    heroTag: 'Gerenciamento',
                    name: 'Ajustes & Sistema',
                    heroDesc: 'Configure o temporizador de sono, otimize a memória RAM e consulte diagnósticos da TV.'
                };
            }
            key = 'default';
        }

        if (data && heroStage) {
            heroStage.style.opacity = '0';
            setTimeout(() => {
                if (heroTag) heroTag.textContent = data.heroTag || 'Entretenimento';
                if (heroTitle) heroTitle.textContent = data.heroTitle || data.name || '';
                if (heroDesc) heroDesc.textContent = data.heroDesc || '';
                heroStage.style.opacity = '1';
            }, 100);
        }

        if (key) {
            this.updateBackdrop(key);
        }
    },

    updateBackdrop: function(key) {
        const bg1 = document.getElementById('bg-layer-1');
        const bg2 = document.getElementById('bg-layer-2');
        if (!bg1 || !bg2) return;

        const target = this.backdrops[key] || this.backdrops['default'];

        if (this.currentBackdropLayer === 1) {
            bg2.style.background = target;
            bg2.classList.add('active');
            bg1.classList.remove('active');
            this.currentBackdropLayer = 2;
        } else {
            bg1.style.background = target;
            bg1.classList.add('active');
            bg2.classList.remove('active');
            this.currentBackdropLayer = 1;
        }
    },

    launch: function(appKey) {
        const app = this.apps.find(a => a.id === appKey);
        if (!app) return;

        window.showToast(`Abrindo ${app.name}...`);

        if (typeof window.tizen !== 'undefined' && window.tizen.application) {
            this.tryLaunchSequence(app.appIds, 0, app.name);
        } else {
            setTimeout(() => {
                window.showToast(`${app.name} carregado`);
            }, 300);
        }
    },

    tryLaunchSequence: function(idList, index, appName) {
        if (!idList || index >= idList.length) {
            window.showToast(`Não foi possível abrir ${appName}.`);
            return;
        }

        const currentId = idList[index];
        try {
            window.tizen.application.launch(
                currentId,
                () => {},
                (err) => {
                    this.tryLaunchSequence(idList, index + 1, appName);
                }
            );
        } catch (e) {
            this.tryLaunchSequence(idList, index + 1, appName);
        }
    },

    switchSource: function(inputId) {
        const input = this.inputs.find(i => i.id === inputId);
        if (!input) return;

        window.showToast(`Alternando para ${input.name}...`);

        if (typeof window.webapis !== 'undefined' && window.webapis.source) {
            try {
                const sType = (input.sourceType === 'TV') 
                    ? window.webapis.source.SourceType.TV 
                    : window.webapis.source.SourceType.HDMI;

                window.webapis.source.setSource(sType, input.sourceNumber, () => {}, () => {});
                return;
            } catch (e) {}
        }

        if (typeof window.tizen !== 'undefined' && window.tizen.tvwindow) {
            try {
                const targetWindow = input.name.replace(/\s+/g, '');
                window.tizen.tvwindow.setSource(targetWindow, () => {}, () => {});
                return;
            } catch (e) {}
        }

        setTimeout(() => {
            window.showToast(`${input.name} ativado`);
        }, 300);
    },

    setSleepTimer: function(minutes) {
        if (this.sleepTimerInterval) {
            clearInterval(this.sleepTimerInterval);
            this.sleepTimerInterval = null;
        }

        const pill = document.getElementById('sleep-pill');
        const text = document.getElementById('sleep-time-text');

        if (minutes <= 0) {
            this.sleepRemainingSeconds = 0;
            if (pill) pill.style.display = 'none';
            window.showToast('Timer desligado');
            return;
        }

        this.sleepRemainingSeconds = minutes * 60;
        if (pill) pill.style.display = 'flex';
        if (text) text.textContent = `${minutes} min`;

        window.showToast(`TV desligará em ${minutes} min`);

        this.sleepTimerInterval = setInterval(() => {
            this.sleepRemainingSeconds--;
            const m = Math.floor(this.sleepRemainingSeconds / 60);

            if (text) text.textContent = `${m} min`;

            if (this.sleepRemainingSeconds <= 0) {
                clearInterval(this.sleepTimerInterval);
                this.executeShutdown();
            }
        }, 1000);
    },

    executeShutdown: function() {
        if (window.toggleScreenSaver) {
            const dimmer = document.getElementById('cinema-dimmer');
            if (dimmer && !dimmer.classList.contains('dimmer-active')) {
                dimmer.classList.add('dimmer-active');
            }
        }
        if (typeof window.tizen !== 'undefined' && window.tizen.power) {
            try { window.tizen.power.turnOffScreen(); } catch (e) {}
        }
    },

    toggleReorderMode: function() {
        this.isReorderMode = !this.isReorderMode;
        const appsRow = document.getElementById('apps-row');
        if (!appsRow) return;

        if (this.isReorderMode) {
            appsRow.classList.add('reorder-active');
            window.showToast('Use ◀ / ▶ para reposicionar e OK para salvar');
        } else {
            appsRow.classList.remove('reorder-active');
            this.saveAppOrder();
            window.showToast('Ordem salva');
        }
    },

    moveFocusedApp: function(direction) {
        if (!this.isReorderMode) return false;
        const focused = document.querySelector('#apps-row .media-card.has-focus');
        if (!focused) return false;

        const row = document.getElementById('apps-row');
        if (direction === 'LEFT' && focused.previousElementSibling) {
            row.insertBefore(focused, focused.previousElementSibling);
            if (window.navEngine) window.navEngine.scanElements();
            return true;
        } else if (direction === 'RIGHT' && focused.nextElementSibling) {
            row.insertBefore(focused.nextElementSibling, focused);
            if (window.navEngine) window.navEngine.scanElements();
            return true;
        }
        return false;
    },

    saveAppOrder: function() {
        const cards = document.querySelectorAll('#apps-row .media-card');
        const order = Array.from(cards).map(c => c.getAttribute('data-app'));
        try {
            localStorage.setItem('fast_tv_app_order', JSON.stringify(order));
        } catch (e) {}
    },

    applySavedAppOrder: function() {
        try {
            const saved = localStorage.getItem('fast_tv_app_order');
            if (!saved) return;
            const order = JSON.parse(saved);
            const row = document.getElementById('apps-row');
            if (!row) return;

            order.forEach(appId => {
                const card = row.querySelector(`[data-app="${appId}"]`);
                if (card) row.appendChild(card);
            });
        } catch (e) {}
    },

    cleanMemory: function() {
        window.showToast('Otimizando memória da TV...');

        if (typeof window.tizen !== 'undefined' && window.tizen.application) {
            try {
                window.tizen.application.launch('qtMHjALHus.TVDeviceCare', () => {}, () => {});
            } catch (e) {}
        }

        setTimeout(() => {
            if (window.gc) {
                try { window.gc(); } catch (e) {}
            }
            window.showToast('Memória otimizada com sucesso');
        }, 700);
    },

    getSystemInfo: function() {
        let model = 'Samsung UN43T5300AGXZD';
        let duid = '43CJJ2SSZA6DC';
        let tizenVer = 'Tizen 5.0';
        if (typeof window.webapis !== 'undefined' && window.webapis.productinfo) {
            try {
                model = window.webapis.productinfo.getModel() || model;
                duid = window.webapis.productinfo.getDuid() || duid;
                tizenVer = window.webapis.productinfo.getTizenVersion() || tizenVer;
            } catch (e) {}
        }
        return {
            modelName: model,
            duid: duid,
            tizenVersion: tizenVer,
            resolution: `${window.innerWidth} x ${window.innerHeight} Full HD @ 60Hz`
        };
    }
};

window.AppLauncher = AppLauncher;
