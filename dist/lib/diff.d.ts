import { KutChild } from './element';
import { KutInstance } from './instance';
export interface PatchOp {
    type: 'insert' | 'move' | 'remove';
    inst: KutInstance;
    index?: number;
}
export interface Patches {
    ops: PatchOp[];
    dir: 'forward' | 'backward';
}
export declare function diff(prevInstances: KutInstance[], nextChildren: KutChild[]): Patches;
export declare function patch(parentId: string, patches: Patches): void;
