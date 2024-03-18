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
    const url = API_URL + "/password/reset/token"
    return axios
      .post(url, {
        email
      });
  }
}

const authService = new AppService();
export default authService;