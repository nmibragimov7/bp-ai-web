const storage = <T = string>(key: string) => ({
    _value: null as T | null,
    save(data: T) {
        this._value = data
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(key, JSON.stringify(data));
        }
    },
    get() {
        if (this._value) return this._value;
        if (typeof localStorage !== "undefined") {
            const data = localStorage.getItem(key) || "null";
            this._value = JSON.parse(data);
            return this._value;
        }
        return null;
    },
    clear() {
        this._value = null
        if (typeof localStorage !== "undefined") {
            localStorage.removeItem(key);
        }
    },
});

export const accessTokenStorage = storage('access');
export const refreshTokenStorage = storage('refresh');
export const userStorage = storage<any>('user');
export default storage;
