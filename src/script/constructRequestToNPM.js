import constructGETRequest from "./constructGETRequest"

/**
 * Подготалвивает запрос к API NPM
 * @param {String} method Метод, к которому будет направлен запрос
 * @param {Object} data Данные запроса
 */
export default function constructRequestToNPM(method = "", data = {}) {
  const NPMApiUrl = "https://api.npms.io/v2"

  return constructGETRequest(NPMApiUrl, method, data)
}
