import axios from "axios";

const API_URL = process.env.APP_URL ?? "";

class AppService {
  async login(email: string, password: string): Promise<any> {
    const url = API_URL + "/login"
    console.log(url)
    return axios
      .post(url, {
        email,
        password
      })
      .then(response => {
        return response.data.data
      });
  }

  async forgotPassword(email: string):Promise<any> {
    const url = API_URL + "/password/forgot"
    return axios
      .post(url, {
        email
      });
  }

  async resetPassword(email: string, code: string, password: string):Promise<any> {
    const url = API_URL + "/password/reset"
    return axios
      .post(url, {
        email,
        code,
        password
      });
  }
}

const authService = new AppService();
export default authService;