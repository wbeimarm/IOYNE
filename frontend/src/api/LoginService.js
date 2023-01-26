import Configuration from "./Configuration";

class LoginService {
    constructor(token, user) {
        this.config = new Configuration(token, user, "dev");
    }

    createToken(usuario, clave) {
        return this.config.API.post(`/login`, {
            usuario,
            clave,
        })
            .then((response) => {
                return response.data;
            })
            .catch((err) => this.config.handleResponseError(err));
    }
}

export default LoginService;
