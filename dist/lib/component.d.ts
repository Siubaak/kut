import { KutProps, KutElement } from './element';
export declare class Component {
    state: any;
    props: KutProps;
    static defaultProps: any;
    _update: (skipShouldUpdate: boolean) => void;
    constructor(props: KutProps);
    protected setState(state: any): void;
    protected forceUpdate(): void;
    render(props?: KutProps): KutElement;
}
