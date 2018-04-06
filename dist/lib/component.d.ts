import { KutProps, KutElement } from './element';
export declare class Component {
    state: any;
    props: KutProps;
    static defaultProps: any;
    _update: (callback: () => void, skipShouldUpdate: boolean) => void;
    constructor(props: KutProps);
    protected setState(state: any, callback?: () => void): void;
    protected forceUpdate(callback?: () => void): void;
    render(props?: KutProps): KutElement;
}
