import constructRequestToNPM from "./constructRequestToNPM"

/**
 * Подготалвивает запрос для поиска по NPM
 * @param {String} query Строка на основе, которой происходит поиск
 * @param {Number} from Позиция в поиске, от которой будут выбраны результаты (Max = 5000; Default = 0)
 * @param {Number} size Количество пакетов, которые буду возвращены (Max = 250; Default = 10)
 */
export default function constructSearchRequestToNPM(query, from = 0, size = 10) {
  const method = "/search";

  return constructRequestToNPM(method, { q: query, from, size })
}
