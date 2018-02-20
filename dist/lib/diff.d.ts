import { KutChild } from './element';
import { KutInstance } from './instance';
export interface PatchOp {
    type: 'insert' | 'move' | 'remove';
    index: number;
    inst: KutInstance;
}
export interface Patches {
    ops: PatchOp[];
    dir: 'forward' | 'backward';
}
export declare function diff(prevInstances: KutInstance[], nextChildren: KutChild[]): Patches;
export declare function patch(parentId: string, patches: Patches): void;
