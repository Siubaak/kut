/**
 * 全局Symbol创建函数
 * @param key 
 * @param number 
 */
function createSymbol(key: string, number: number): Symbol | number {
  return (
    typeof Symbol === 'function'
    && Symbol.for
    && Symbol.for(key)
  )
  || number
}

export const KUT_RESERVED_PROPS: string[] = [ 'key', 'ref' ]

export const KUT_ELEMENT_TYPE: Symbol | number = createSymbol('kut.element', 0xeac7)