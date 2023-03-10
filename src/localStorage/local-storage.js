const localStorageImport = function (key, value) {
    localStorage.setItem(key, value)
}
const localStorageExport = function (key) {
    return localStorage.getItem(key)
}
export {localStorageImport,localStorageExport}