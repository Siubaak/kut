import { KutProps, KutElement } from './element';
export declare class Component {
    state: any;
    props: KutProps;
    update: (callback: () => void) => void;
    static defaultProps: any;
    constructor(props: KutProps);
    protected setState(state: any, callback?: () => void): void;
    protected forceUpdate(callback?: () => void): void;
    render(props?: KutProps): KutElement;
}
