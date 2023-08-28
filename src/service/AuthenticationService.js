import axios from "axios";

export const USER_NAME_SESSION_ATTRIBUTE_NAME='authenticatedUser';

class AuthenticationService {

    static setSessionAttribute(key, value){
        localStorage.setItem(key, value);
    }

    static async registerCustomer(customer) {
        try {
            const response = await axios.post('http://localhost:8086/webank/api/openaccount', customer);
            return response.data;
        } catch(error) {
            console.error('Customer registration error', error);
            throw new Error('An error occurred during customer registration.');
        }
    }

    static async registerAccount(account) {
        try {
            const response = await axios.post('http://localhost:8086/webank/api/register', account);
            return response.data;
        } catch(error) {
            console.error('Netbanking registration error', error);
            console.log(JSON.stringify(error, 4, 4));

            throw new Error('An error occurred during netbanking registration.');
        }
    }


    static async login(account) {
        try {
            const response = await axios.post('http://localhost:8086/webank/api/login', account);
            console.log('API response:', response.data + " " + response.data.success);
            if (response.data === true) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Login error', error);
            throw new Error('An error occurred during login.');
        }
    }

    static registerSuccessfulLogin(username) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        console.log("First"+username);
    }

    static isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if  (user === null) return false
        return true
    }

    static getLoggedInUsername() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    static logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

}

export default AuthenticationService;