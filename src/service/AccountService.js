import axios from "axios";

const ACCOUNTS_REST_API_URL = 'http://localhost:8086/webank/api/accounts';

class AccountService{
    static getAccounts(){
        return axios.get(ACCOUNTS_REST_API_URL);
    }

    static createAccount(account){
        return axios.post(ACCOUNTS_REST_API_URL, account);
    }

    static getAccountByNo(accountno){
        return axios.get(ACCOUNTS_REST_API_URL+'/'+accountno);
    }

    static updateAccount(account, accountno){
        return axios.put(ACCOUNTS_REST_API_URL+'/'+accountno, account);
    }

    static deleteAccount(accountno){
        return axios.delete(ACCOUNTS_REST_API_URL+'/'+accountno);
    }
}

export default AccountService;