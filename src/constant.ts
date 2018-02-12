/**
 * element保留属性
 */
export const KUT_RESERVED_PROPS: string[] = ['key']

/**
 * html内置event handler集合
 * 参考：https://www.w3schools.com/jsref/dom_obj_event.asp
 * 过滤用正则，\t[A-Z|a-z|\s|/|'|0-9|,|.|(|)|<|>|=|"]*
 */
export const KUT_SUPPORTED_EVENT_HANDLERS: string[] = [
  // 鼠标
  'onclick',
  'oncontextmenu',
  'ondblclick',
  'onmousedown',
  'onmouseenter',
  'onmouseleave',
  'onmousemove',
  'onmouseover',
  'onmouseout',
  'onmouseup',
  // 触屏
  'ontouchcancel',
  'ontouchend',
  'ontouchmove',
  'ontouchstart',
  // 键盘
  'onkeydown',
  'onkeypress',
  'onkeyup',
  // 浏览器
  'onabort',
  'onbeforeunload',
  'onerror',
  'onhashchange',
  'onload',
  'onpageshow',
  'onpagehide',
  'onresize',
  'onscroll',
  'onunload',
  // 表单
  'onblur',
  'onchange',
  'onfocus',
  'onfocusin',
  'onfocusout',
  'oninput',
  'oninvalid',
  'onreset',
  'onsearch',
  'onselect',
  'onsubmit',
  // 拉拽
  'ondrag',
  'ondragend',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondragstart',
  'ondrop',
  // 复制粘贴
  'oncopy',
  'oncut',
  'onpaste',
  // 打印
  'onafterprint',
  'onbeforeprint',
  // 媒体
  'onabort',
  'oncanplay',
  'oncanplaythrough',
  'ondurationchange',
  'onemptied',
  'onended',
  'onerror',
  'onloadeddata',
  'onloadedmetadata',
  'onloadstart',
  'onpause',
  'onplay',
  'onplaying',
  'onprogress',
  'onratechange',
  'onseeked',
  'onseeking',
  'onstalled',
  'onsuspend',
  'ontimeupdate',
  'onvolumechange',
  'onwaiting',
  // CSS动画
  'animationend',
  'animationiteration',
  'animationstart',
  // CSS转换
  'transitionend',
  // 服务器
  'onerror',
  'onmessage',
  'onopen',
  // 杂项
  'onmessage',
  'ononline',
  'onoffline',
  'onpopstate',
  'onshow',
  'onstorage',
  'ontoggle',
  'onwheel',
]