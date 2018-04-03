import { KutProps, KutElement } from './element';
export declare class Component {
    state: any;
    props: KutProps;
    update: () => void;
    static defaultProps: any;
    constructor(props: KutProps);
    protected setState(state: any): void;
    protected forceUpdate(): void;
    render(props?: KutProps): KutElement;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: KutProps): void;
    shouldComponentUpdate(nextProps: KutProps, nextState: any): boolean;
    componentWillUpdate(nextProps: KutProps, nextState: any): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
}
