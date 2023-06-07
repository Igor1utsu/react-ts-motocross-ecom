/**
 * Утилита для получения цены товара
 *
 * @returns $40.85 | 1 x $40.85
 */
export const getPrice = (price: number, qty?: number): string => {
  if (qty) {
    return `${qty} x $${price}`
  } else {
    return `$${price.toFixed(2)}`
  }
}
