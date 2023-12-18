import { createAction } from '@reduxjs/toolkit'

function withPayloadType<T>() {
  return (t: T) => ({ payload: t })
}

export const createActionWithPayload = <T>(action: string) =>
  createAction(action, withPayloadType<T>())

// TODO: Update value when server is hosted
export const API_URL = import.meta.env.VITE_API_BASE_URL

export function isObjKey<T extends object>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj
}
