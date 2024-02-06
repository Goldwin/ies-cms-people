import axios from "axios";

const API_URL = process.env.AUTH_URL ?? "";

//idea: create interface per method, call that commands
// then we can export each command from a single conf file, using service implementation as the instance of interface

class AuthService {
  async login(email: string, password: string, output: Output<string>) {
    const url = API_URL + "/password/signin"
    return axios
      .post(url, {
        email,
        password
      })
      .then(response => {
        if (response.data.data.access_token) {
          output.onSuccess(JSON.stringify(response.data.data))
        }

        return response.data;
      }).catch(error => {
        output.onError(error)
      });
  }
}

const authService = new AuthService();
export default authService;