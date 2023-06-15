/**
 * Список категорий товаров
 */
export enum ProductCategories {
  ENGINE = "engine",
  EXHAUST = "exhaust",
  BRAKES = "brakes",
  FUEL_AND_AIR = "fuel_and_air",
  CONTROLS = "controls",
  PLASTIC = "plastic",
}

export const productCategoryNames = {
  [ProductCategories.ENGINE]: "Engine",
  [ProductCategories.EXHAUST]: "Exaust",
  [ProductCategories.BRAKES]: "Brakes",
  [ProductCategories.FUEL_AND_AIR]: "Fuel & air",
  [ProductCategories.CONTROLS]: "Controls",
  [ProductCategories.PLASTIC]: "Plastic",
}
