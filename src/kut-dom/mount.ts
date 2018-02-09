import Kut from '../kut/index'
import { Element, createElement } from '../kut/element'
import { Component } from '../kut/component';

let topLevelRootCounter: number = 1
export class TopLevelWrapper extends Component {
  static isReactTopLevelWrapper: boolean = true
  private rootID: number = topLevelRootCounter++
  render() {
    return this.props.child
  }
}

function _renderSubtreeIntoContainer(
  parentComponent: Component,
  nextElement: Element,
  container: Element,
) {
  const nextWrappedElement = createElement(TopLevelWrapper, {

  })
}

export function render(
  nextElement: Element,
  container: Element,
) {
  return _renderSubtreeIntoContainer(
    null,
    nextElement,
    container,
  )
}