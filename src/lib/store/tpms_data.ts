import { browser } from "$app/environment";
import { writable } from "svelte/store";

const DATA = 'tpms_data'

const createDataStore = () => {
  const { subscribe, set } = writable<number[]>(browser ? (JSON.parse(localStorage.getItem(DATA)!) || []) : [])

  subscribe((data: number[]) => {
    if (browser) { localStorage.setItem(DATA, JSON.stringify(data)) }
  })

  return {
    subscribe,

    set
  }
}

export const data_store = createDataStore()
