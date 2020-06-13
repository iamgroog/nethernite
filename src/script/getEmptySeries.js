/**
 * Определяет серии пустых последовательностей в массиве
 * @param {Array} array Запрос введенный пользователем
 * @returns {Array[start: Number, length: Number]}
 */
export default function getEmptySeries(array = []) {
  let previousIndex = -1;

  /* Проходим по массиву и поределяет пустоты по значение индекса */
  const emptySeries = array.reduce(function(result, item, index) {
    if ((index - 1) !== previousIndex) {
      /* Если есть разрыв, расчитать длину */
      result.push({ start: previousIndex + 1, length: (index - 1) - previousIndex })
    }

    previousIndex = index;

    return result;
  }, []);

  /* Если серия выпала на конец массива, то включить ее в набор */
  if (previousIndex !== (array.length - 1)) {
    emptySeries.push({ start: previousIndex + 1, length: (array.length - 1) - previousIndex })
  }

  /* Если серий не найдено, то будет возвращен пустой массив */
  return emptySeries
}
