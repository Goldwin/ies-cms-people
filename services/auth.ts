import axios from "axios";

const API_URL = process.env.AUTH_URL || "";

class AuthService {
  login(username: string, password: string, output: Output<any>) {
    return axios
      .post(API_URL, {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();