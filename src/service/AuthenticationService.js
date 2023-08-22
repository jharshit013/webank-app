import axios from "axios";

class AuthenticationService {


    static async login(account) {
        try {
            const response = await axios.post('http://localhost:8086/webank/api/login', account);
            console.log('API response:', response.data + "Hello" + response.data.success);
            if (response.data === true) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Login error', error);
            throw new Error('An error occurred during login');
        }
    }

}

export default AuthenticationService;