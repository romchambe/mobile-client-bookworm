import { API_URL } from '../config'

export function buildAddress(client, uri) {
  return (API_URL.development[client]) ? (API_URL.development[client] + uri) : new Error('This is not a valid client')
}