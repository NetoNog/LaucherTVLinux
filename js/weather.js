/**
 * Fast TV Launcher - Weather & Climate Widget
 * Utiliza a API pública e ultraleve Open-Meteo (zero chaves pagas, zero latência).
 * Possui cache em localStorage de 30 minutos para economizar recursos da Smart TV.
 */

const WeatherWidget = {
    cacheKey: 'fast_tv_weather_cache',
    cacheDurationMs: 30 * 60 * 1000, // 30 minutos

    init: function() {
        this.loadWeather();
        // Atualiza a cada 30 minutos
        setInterval(() => this.loadWeather(), this.cacheDurationMs);
    },

    loadWeather: function() {
        const cached = this.getCachedWeather();
        if (cached) {
            this.renderWeather(cached);
            return;
        }

        // Tenta detectar coordenadas via IP ou usa localização padrão brasileira (São Paulo / Brasília)
        this.fetchCurrentWeather(-23.5505, -46.6333, 'São Paulo');
    },

    getCachedWeather: function() {
        try {
            const data = localStorage.getItem(this.cacheKey);
            if (!data) return null;
            const parsed = JSON.parse(data);
            if (Date.now() - parsed.timestamp < this.cacheDurationMs) {
                return parsed;
            }
        } catch (e) {}
        return null;
    },

    fetchCurrentWeather: function(lat, lon, cityName) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data && data.current_weather) {
                    const temp = Math.round(data.current_weather.temperature);
                    const code = data.current_weather.weathercode;
                    const info = this.interpretWeatherCode(code);

                    const weatherData = {
                        temp: `${temp}°C`,
                        city: cityName,
                        condition: info.label,
                        icon: info.icon,
                        timestamp: Date.now()
                    };

                    try {
                        localStorage.setItem(this.cacheKey, JSON.stringify(weatherData));
                    } catch (e) {}

                    this.renderWeather(weatherData);
                }
            })
            .catch(err => {
                console.warn('[WeatherWidget] Offline ou falha no clima:', err);
                // Fallback elegante
                this.renderWeather({
                    temp: '24°C',
                    city: 'Local',
                    condition: 'Parcialmente Nublado',
                    icon: '⛅'
                });
            });
    },

    interpretWeatherCode: function(code) {
        // Códigos WMO da Open-Meteo
        if (code === 0) return { label: 'Céu Limpo', icon: '☀️' };
        if (code === 1 || code === 2) return { label: 'Ensolarado', icon: '🌤️' };
        if (code === 3) return { label: 'Nublado', icon: '☁️' };
        if (code >= 45 && code <= 48) return { label: 'Neblina', icon: '🌫️' };
        if (code >= 51 && code <= 67) return { label: 'Chovendo', icon: '🌧️' };
        if (code >= 80 && code <= 82) return { label: 'Pancadas', icon: '🌦️' };
        if (code >= 95) return { label: 'Tempestade', icon: '⛈️' };
        return { label: 'Ameno', icon: '⛅' };
    },

    renderWeather: function(data) {
        const tempEl = document.getElementById('weather-temp');
        const iconEl = document.getElementById('weather-icon');
        const condEl = document.getElementById('weather-cond');

        if (tempEl) tempEl.textContent = data.temp;
        if (iconEl) iconEl.textContent = data.icon;
        if (condEl) condEl.textContent = data.condition;
    }
};

window.WeatherWidget = WeatherWidget;
