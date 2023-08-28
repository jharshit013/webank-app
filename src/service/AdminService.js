import axios from "axios";

export const ADMIN_NAME_SESSION_ATTRIBUTE_NAME='authenticatedAdmin';

class AdminService {

    static setSessionAttribute(key, value){
        localStorage.setItem(key, value);
    }

    static async login(admin) {
        try {
            const response = await axios.post('http://localhost:8086/webank/admin/login', admin);
            console.log('API response:', response.data + " " + response.data.success);
            if (response.data === true) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Admin Login error', error);
            throw new Error('An error occurred during admin login.');
        }
    }

    static registerSuccessfulAdmin(username) {
        sessionStorage.setItem(ADMIN_NAME_SESSION_ATTRIBUTE_NAME, username);
        console.log("Admin"+username);
    }

    static isAdminLoggedIn() {
        let admin = sessionStorage.getItem(ADMIN_NAME_SESSION_ATTRIBUTE_NAME)
        if  (admin === null) return false
        return true
    }

    static getLoggedInAdmin() {
        let admin = sessionStorage.getItem(ADMIN_NAME_SESSION_ATTRIBUTE_NAME)
        if (admin === null) return ''
        return admin
    }

    static logoutAdmin() {
        sessionStorage.removeItem(ADMIN_NAME_SESSION_ATTRIBUTE_NAME);
    }

}

export default AdminService;