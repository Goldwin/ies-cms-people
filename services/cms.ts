import axios from "axios";

const API_URL = process.env.APP_URL ?? "";

class AppService {
  async login(email: string, password: string): Promise<any> {
    const url = API_URL + "/login";
    return axios
      .post(url, {
        email,
        password,
      })
      .then((response) => {
        return response.data.data;
      });
  }

  async forgotPassword(email: string): Promise<any> {
    const url = API_URL + "/password/forgot";
    return axios.post(url, {
      email,
    });
  }

  async resetPassword(
    email: string,
    code: string,
    password: string
  ): Promise<any> {
    const url = API_URL + "/password/reset";
    return axios.post(url, {
      email,
      code,
      password,
    });
  }

  async requestRegistrationOTP(email: string): Promise<any> {
    const url = API_URL + "/register/otp";
    return axios.post(url, {
      email,
    });
  }

  async register(accountInfo: {
    email: string;
    otp: string;
    password: string;
    first_name: string;
    last_name: string;
    middle_name: string;
  }): Promise<any> {
    const url = API_URL + "/register";
    return axios.post(url, accountInfo);
  }
}

const appService = new AppService();
export default appService;
