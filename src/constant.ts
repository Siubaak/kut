/**
 * DOM节点唯一识别ID的属性名
 */
export const KUT_ID: string = 'data-kutid'

/**
 * element保留属性
 */
export const KUT_RESERVED_PROPS: {
  [prop: string]: boolean
} = {
  key: true,
  ref: true,
}

export const CUT_ON_REGEX: RegExp = /^on/
const eventHandlers: string[] =
  Object.keys(window || {}).filter(key => CUT_ON_REGEX.test(key))

/**
 * html内置event集合
 */
export const KUT_SUPPORTED_EVENTS: string[] = eventHandlers.map(key => key.replace(CUT_ON_REGEX, ''))

/**
 * html内置event handler集合
 */
export const KUT_SUPPORTED_EVENT_HANDLERS: {
  [eventHandler: string]: boolean
} = {}

// 给event handler集合初始化
eventHandlers.forEach((eventHandler: string) => {
  KUT_SUPPORTED_EVENT_HANDLERS[eventHandler] = true
})
