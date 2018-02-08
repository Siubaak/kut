/**
 * Base class of components
 */
export class Component {
  private props: any
  public constructor(props: any, updater: any) {
    this.props = props
  }
  public setState(partialState: any): void {
    
  }
  public forceUpdate(): void {
    
  }
}
