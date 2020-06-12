/**
 * Подготалвивает GET запрос перед отправкой
 * @param {String} url URL Api (baseURL)
 * @param {String} method Метод, к которому будет направлен запрос
 * @param {Object} data Данные запроса
 */
export default function costructGETRequest(url, method = "", data = {}) {
  return {
    method: "get",
    baseURL: url,
    url: method,
    params: data
  }
}
