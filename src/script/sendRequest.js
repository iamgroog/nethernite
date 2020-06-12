import axios from "axios";

/**
 * Отправляет запрос на сервер
 * @param {Object} request Описание запроса (см. https://github.com/axios/axios#request-config)
 * @param {Function} onSuccess Колбек при успешном выполнении
 * @param {Function} onFail Колбeк при ошибке
 */
export default function sendRequest(request, onSuccess, onFail) {
  axios(request)
    .then(function (response) {
      if (onSuccess) {
        onSuccess(response);
      } else {
        console.log("Request success", { request, response });
      }
    })
    .catch(function (error) {
      if (onFail) onFail(error);
      else console.error("Request failed", { request, error: error })
    })
}
