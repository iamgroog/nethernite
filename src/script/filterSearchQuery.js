/**
 * Фильтрация пользовательского запроса. Все символы, кроме [a-z0-9-_] заменяются на "_"
 * @param {String} query Запрос введенный пользователем
 * @returns {String}
 */
export default function costructGETRequest(query) {
  const filterRegExp = /[^a-z0-9-_]+/ig;
  const filteredQuery = query.replace(filterRegExp, "_")

  return filteredQuery;
}
