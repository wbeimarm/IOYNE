import Configuration from "./Configuration";

class DataService {
    constructor(token, user) {
        this.config = new Configuration(token, user, "dev");
    }

    /**
     * @method DataService retorna los valores de la base de datos
     * @return {Promise} resultado
     * @name = 'procedure'
     */
    buscarDataService(name, parameters) {
        return this.config.API.post(`/${name}`, {
            ...parameters,
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => this.config.handleResponseError(err));
    }
}

export default DataService;
