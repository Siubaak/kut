import { KutChild } from './element';
import { KutInstance } from './instance';
export declare class Reconciler {
    private _dirtyInstances;
    private _isBatchUpdating;
    enqueueUpdate(dirtyInstance: KutInstance, nextElement: KutChild): void;
}
export declare const reconciler: Reconciler;
