import { KutProps, KutElement } from './element';
export interface KutUpdater {
    enqueueSetState(instance: Component, state: any): void;
    enqueueForceUpdate(instance: Component): void;
}
export declare class Component {
    protected props: KutProps;
    updater: KutUpdater;
    constructor(props: KutProps, updater?: KutUpdater);
    protected setState(state: any): void;
    render(props?: KutProps): KutElement;
}
