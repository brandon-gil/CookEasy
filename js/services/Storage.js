export class Storage {
    static get(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            return raw === null ? fallback : JSON.parse(raw);
        } catch (error) {
            return fallback;
        }
    }

    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn("Sauvegarde impossible :", error);
        }
    }

    static remove(key) {
        localStorage.removeItem(key);
    }
}
