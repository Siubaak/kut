import { KutProps, KutElement } from './element';
export declare class Component {
    state: any;
    props: KutProps;
    context: any;
    static defaultProps: any;
    _updater: {
        enqueueSetState: (partialState: any, callback: (nextState: any) => void) => void;
        enqueueForceUpdate: (callback: (nextState: any) => void) => void;
    };
    constructor(props: KutProps, context?: any);
    protected setState(partialState: any, callback?: () => void): void;
    protected forceUpdate(callback?: () => void): void;
    render(): KutElement;
    static getDerivedStateFromProps?(nextProps: KutProps, prevState: any): any;
    componentDidMount?(): void;
    shouldComponentUpdate?(nextProps: KutProps, nextState: any, nextContext: any): boolean;
    getSnapshotBeforeUpdate?(prevProps: KutProps, prevState: any): any;
    componentDidUpdate?(prevProps: KutProps, prevState: any, snapshot: any): void;
    componentWillUnmount?(): void;
}
