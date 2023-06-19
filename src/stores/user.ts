// stores/counter.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            // 用于尚未加载的数据
            user: null as UserInfo | null,
        }
    },
    getters: {
        nickname: (state) => {
            try {
                let storageUser = localStorage.getItem('store_user');
                if (storageUser) {
                    state.user = JSON.parse(storageUser);
                }
                return state.user?.nickname;
            } catch (e) {
                return '';
            }
        }
    },
    actions: {
        setUser(user: UserInfo) {
            localStorage.setItem('store_user', JSON.stringify(user));
            this.user = user;
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('store_user');
            this.user = null;
        }
    }
})

interface UserInfo {
    name: string,
    nickname: string,
}