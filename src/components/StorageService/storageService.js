const storageService = {
    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem(key) {
        const value = localStorage.getItem(key);
        console.log(value);
        return value ? JSON.parse(value) : null;
    },
    removeItem(key) {
        localStorage.removeItem(key);
    },
};

export default storageService;
