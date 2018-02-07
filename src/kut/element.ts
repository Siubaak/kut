export interface Element {
  type: any;
  key: string;
  ref: HTMLElement;
  props: any;
}

const RESERVED_PROPS: string[] = [ 'key', 'ref' ];

export function createElement(type: any, config: any, ...children: Element[]): Element {
  const props: any = {};
  let key: string = null;
  let ref: HTMLElement = null;
  if (config !== null) {
    if (config.ref !== undefined) {
      ref = config.ref as HTMLElement;
    }
    if (config.key !== undefined) {
      key = config.key as string;
    }

    for (let prop in config) {
      if (config.hasOwnProperty(prop) && !~RESERVED_PROPS.indexOf(prop)) {
        props[prop] = config[prop];
      }
    }
  }
  if (children.length > 0) {
    props.children = children;
  }
  if (type && type.defaultProps) {
    for (let prop in type.defaultProps) {
      if (props[prop] === undefined) {
        props[prop] = type.defaultProps[prop];
      }
    }
  }
  return {
    type,
    key,
    ref,
    props,
  };
}

export function createFactory(type: any) {
  interface Factory {
    (config: any, ...children: Element[]): Element;
    type: any;
  }
  const factory: Factory = createElement.bind(null, type);
  factory.type = type;
  return factory;
}

export function cloneAndReplaceKey(oldElement: Element, newKey: string): Element {
  return {
    type: oldElement.type,
    key: newKey,
    ref: oldElement.ref,
    props: oldElement.props,
  };
}