import { KUT_ELEMENT_TYPE } from './constant'
import { isValidElement, cloneAndReplaceKey } from './element'

function escape(key: string): string {
  const escaperLookup:
    { [key: string]: string }
    = { '=': '=0', ':': '=2' }
  const escapedString = ('' + key).replace(/[=:]/g, match => escaperLookup[match]);
  return '$' + escapedString
}

function escapeUserProvidedKey(key: string): string {
  const escapedString = ('' + key).replace(/\/+/g, '$&/');
  return escapedString
}