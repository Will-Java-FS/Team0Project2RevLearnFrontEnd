import axios from "./AxiosConfig"
import AuthService from "./AuthService";

class AxiosUserService {

    registerUser(username:string, password:string, email:string, role:string, last:string, first:string):boolean {
        axios.post("/register", {
            username: username,
            password: password,
            email: email,
            role: role,
            firstName: first,
            lastName: last
        })
        .then(response => {
            console.log(response.data);
            if (response.status === 201) {
                return true;
            }
        })
        .catch(error => {
            console.error('Error on user register attempt!', error);
        });
        return false;
    }

    login(username:string, password:string):boolean {
        axios.post("/login", {
            username: username,
            password: password
        })
        .then(response => {
            console.log(response.data);
            if (response.status === 200) {
                AuthService.login(response.data.id, response.data.username, response.data.role, response.data.token);
                return true;
            }
        })
        .catch(error => {
            console.error('Error on user login attempt!', error);
        });
        return false;
    }
}

export default new AxiosUserService();