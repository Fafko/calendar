export default class StorageClient {

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return this;
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

}