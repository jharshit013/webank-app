import axios from "axios";

class AuthenticationService {

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

}

export default AuthenticationService;