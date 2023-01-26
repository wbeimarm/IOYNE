import Configuration from "./Configuration";

class ClientesService {
    constructor(token, user) {
        this.config = new Configuration(token, user, "dev");
    }

    /**
     * @method validarCliente retorna el perfil del usuario
     * @return {Promise} resultado
     */
    validarCliente(usuario, clave) {
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

export default ClientesService;
