import { TVirtualPathFN } from 'mongoose';
import { VirtualType } from "../enums";

export interface VirtualMethod {
    virtualFunction: TVirtualPathFN;
    virtualName: string;
    virtualType: VirtualType;
}
