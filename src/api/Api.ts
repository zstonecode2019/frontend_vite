class API {
    baseURL: string = '';
    instance: API | null = null;
    headers: Headers | null = null;

    constructor(baseURL: string) {
        if (this.instance) {
            return this.instance;
        }

        this.baseURL = baseURL;
        this.headers = new Headers();
        this.instance = this;
    }

    async get(path: string) {
        this.headers?.set('Content-Type', 'application/json');
        let token = this.getToken();
        if (token) {
            this.headers?.set('authorization', token);
        }

        const res = await fetch(this.baseURL + path, {
            method: "GET",
            headers: this.headers as Headers,
        });
        return await res.json();
    }

    async post(path: string, body: any) {
        this.headers?.set('Content-Type', 'application/json');
        let token = this.getToken();
        if (token) {
            this.headers?.set('authorization', token);
        }

        const res = await fetch(this.baseURL + path, {
            method: "POST",
            headers: this.headers as Headers,
            body: JSON.stringify(body),
        });
        return await res.json();
    }
    getToken(): string | null | undefined {
        let token = localStorage.getItem('token') || this.headers?.get('authorization');
        return token;
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
        this.headers?.set('authorization', token);
    }
}

export default new API('http://localhost:8002');
