import { isString, isNumber, isPlainObject, isArray } from 'lodash'

export const findType = value => {
   if (isString(value)) return 'string'
   if (isNumber(value)) return 'number'
   if (isPlainObject(value)) return 'object'
   if (isArray(value)) return 'array'
   return ''
}
