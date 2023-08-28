import axios from "axios";

class AdminService {
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
}

export default AdminService;