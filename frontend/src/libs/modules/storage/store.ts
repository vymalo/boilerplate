import { createStore as cs } from "idb-keyval";

export const createStore = (dbName: string) => (storeName: string) => {
    return cs(dbName, storeName);
}

export const baseStore = createStore("sma_app");