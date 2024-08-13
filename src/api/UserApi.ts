import { API_BASE } from "../consts";
import { UserStoreType } from "../stores/UserStore";
import axios from "axios";

class UserApi {
    getToken() : string | null {
        if (localStorage.getItem("token") == null)
            return null;
        return `Bearer ${localStorage.getItem('token')}`
    }

    async signUp(login: string, password: string) : Promise<string> {
        let resultMessage = "";
        let token = this.getToken();
        if (token != null)
            return "Вы уже авторизованы";

        await axios.post(`${API_BASE}/user/signup`, {
            login, password
        })
            .then((res: any) => {
                localStorage.setItem('token', res.data);
                window.location.pathname = '/';
            })
            .catch(err => resultMessage = err.response.data)

        return resultMessage;
    }

    async auth() : Promise<UserStoreType | null>
    {
        let result : UserStoreType | null = null;
        let token = this.getToken();
        if (token == null) return null;

        await axios.get(`${API_BASE}/user/auth`, {headers: {
            Authorization: this.getToken()
        }})
            .then((res: any) => result = res.data)
            .catch()

        return result;
    }
}

export default new UserApi();