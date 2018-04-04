import { KutChild } from './element';
import { KutInstance } from './instance';
export declare class Reconciler {
    private readonly _dirtyInstanceSet;
    private _isBatchUpdating;
    enqueueUpdate(dirtyInstance: KutInstance, nextElement: KutChild): void;
    private _runBatchUpdate();
}
export declare const reconciler: Reconciler;
