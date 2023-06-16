import api from '../Api'

export const login = async (username: string, password: string) => {
    let res = await api.post('/user/login', {
        username,
        password
    })
    if (res.code === 200 && res.data) {
        api.setToken.call(api, res.data.token)
    }
    return Promise.resolve(res);
}

export const getUserList = () => {
    return api.get('/user/getUserList')
}