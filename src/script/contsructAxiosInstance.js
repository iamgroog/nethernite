import axios from "axios";

/**
 * Создания инстанса для осуществления запросов к серверу
 * @param {Object} config конфигурация запроса (см. https://github.com/axios/axios#request-config)
 */
export default function contsructAxiosInstance(config) {
  const defaultConfig = {
    timeout: 3000,
    method: "get"
  }

  return axios.create({ ...defaultConfig, ...config })
}
