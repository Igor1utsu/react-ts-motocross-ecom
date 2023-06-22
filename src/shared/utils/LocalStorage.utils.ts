/**
 * Утилита для работы с localStorage
 */
class Storage {
  set = <T = Object>(
    key: string,
    value: T,
    selectStorage: globalThis.Storage = localStorage
  ) => {
    selectStorage.setItem(key, JSON.stringify(value))
  }

  get = <T = Object>(
    key: string,
    selectStorage: globalThis.Storage = localStorage
  ) => {
    const result = selectStorage.getItem(key)

    if (result) {
      return JSON.parse(result) as T
    }
  }

  remove = (key: string, selectStorage: globalThis.Storage = localStorage) => {
    selectStorage.removeItem(key)
  }
}

export const storage = new Storage()
