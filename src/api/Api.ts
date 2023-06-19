import { ElMessage } from 'element-plus';

class API {
    baseURL: string = '';
    instance: API | null = null;
    headers: Headers | null = null;
    timeout: number = 10000;

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
        let res = null;
        try {
            res = await this._fetch(this.baseURL + path, {
                method: "GET",
                headers: this.headers as Headers,
            });
            if (res instanceof Response) {
                if (res.status >= 400) {
                    // 请求失败
                    this._handlesError(res);
                } else {
                    let json = await res.json();
                    return json;
                }
            }
        } catch (e: any) {
            this._handlesError(new Error(e));
        }
    }

    async post(path: string, body: any) {
        this.headers?.set('Content-Type', 'application/json');
        let token = this.getToken();
        if (token) {
            this.headers?.set('authorization', token);
        }

        let res = null;
        try {
            res = await this._fetch(this.baseURL + path, {
                method: "POST",
                headers: this.headers as Headers,
                body: JSON.stringify(body),
            });
            if (res instanceof Response) {
                if (res.status >= 400) {
                    // 请求失败
                    this._handlesError(res);
                } else {
                    let json = await res.json();
                    return json;
                }
            }
        } catch (e: any) {
            this._handlesError(new Error(e));
        }
    }

    async put(path: string, body: any) {
        this.headers?.set('Content-Type', 'application/json');
        let token = this.getToken();
        if (token) {
            this.headers?.set('authorization', token);
        }

        const res = await this._fetch(this.baseURL + path, {
            method: "PUT",
            headers: this.headers as Headers,
            body: JSON.stringify(body),
        });
        if (res instanceof Response) {
            if (res.status >= 400) {
                // 请求失败
                this._handlesError(res);
            } else {
                let json = await res.json();
                return json;
            }
        }
    }

    async delete(path: string, body: any) {
        this.headers?.set('Content-Type', 'application/json');
        let token = this.getToken();
        if (token) {
            this.headers?.set('authorization', token);
        }

        const res = await this._fetch(this.baseURL + path, {
            method: "DELETE",
            headers: this.headers as Headers,
            body: JSON.stringify(body),
        });
        if (res instanceof Response) {
            if (res.status >= 400) {
                // 请求失败
                this._handlesError(res);
            } else {
                let json = await res.json();
                return json;
            }
        }
    }

    _handlesError(error: Response | Error) {
        console.log(error);
        ElMessage({
            type: 'error',
            message: '接口请求错误!'
        });
        window.location.replace('/#/login');
    }

    _fetch(input: string | Request, init?: RequestInit | undefined) {
        return Promise.race(
            [
                new Promise((_, reject) => {
                    setTimeout(() => {
                        reject(new Error('timeout'))
                    }, this.timeout);
                }),
                fetch(input, init)
            ]
        );
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

export default new API(import.meta.env.VITE_BACKEND_URL || 'http://localhost:8002');
