/**
 * element保留属性
 */
export const KUT_RESERVED_PROPS: { [prop: string]: boolean } = {
  key: true
}

/**
 * html内置event handler集合
 * 参考：https://www.w3schools.com/jsref/dom_obj_event.asp
 * 过滤用正则，\t[A-Z|a-z|\s|/|'|0-9|,|.|(|)|<|>|=|"]*
 */
export const KUT_SUPPORTED_EVENT_HANDLERS: { [handler: string]: boolean } = {
  // 鼠标
  onclick: true,
  oncontextmenu: true,
  ondblclick: true,
  onmousedown: true,
  onmouseenter: true,
  onmouseleave: true,
  onmousemove: true,
  onmouseover: true,
  onmouseout: true,
  onmouseup: true,
  // 触屏
  ontouchcancel: true,
  ontouchend: true,
  ontouchmove: true,
  ontouchstart: true,
  // 键盘
  onkeydown: true,
  onkeypress: true,
  onkeyup: true,
  // 浏览器
  onabort: true,
  onbeforeunload: true,
  onerror: true,
  onhashchange: true,
  onload: true,
  onpageshow: true,
  onpagehide: true,
  onresize: true,
  onscroll: true,
  onunload: true,
  // 表单
  onblur: true,
  onchange: true,
  onfocus: true,
  onfocusin: true,
  onfocusout: true,
  oninput: true,
  oninvalid: true,
  onreset: true,
  onsearch: true,
  onselect: true,
  onsubmit: true,
  // 拉拽
  ondrag: true,
  ondragend: true,
  ondragenter: true,
  ondragleave: true,
  ondragover: true,
  ondragstart: true,
  ondrop: true,
  // 复制粘贴
  oncopy: true,
  oncut: true,
  onpaste: true,
  // 打印
  onafterprint: true,
  onbeforeprint: true,
  // 媒体
  oncanplay: true,
  oncanplaythrough: true,
  ondurationchange: true,
  onemptied: true,
  onended: true,
  onloadeddata: true,
  onloadedmetadata: true,
  onloadstart: true,
  onpause: true,
  onplay: true,
  onplaying: true,
  onprogress: true,
  onratechange: true,
  onseeked: true,
  onseeking: true,
  onstalled: true,
  onsuspend: true,
  ontimeupdate: true,
  onvolumechange: true,
  onwaiting: true,
  // CSS动画
  animationend: true,
  animationiteration: true,
  animationstart: true,
  // CSS转换
  transitionend: true,
  // 服务器
  onmessage: true,
  onopen: true,
  // 杂项
  ononline: true,
  onoffline: true,
  onpopstate: true,
  onshow: true,
  onstorage: true,
  ontoggle: true,
  onwheel: true,
}