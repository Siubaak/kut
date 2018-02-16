import { KutProps, KutElement } from './element';
import { ComponentInstance } from './instance';
export declare class Component {
    protected state: any;
    protected props: KutProps;
    instance: ComponentInstance;
    constructor(props: KutProps);
    protected setState(state: any): void;
    render(props?: KutProps): KutElement;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    shouldComponentUpdate(): boolean;
}
