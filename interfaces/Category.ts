import {dataProgram} from "./Program";

export interface Category {
    id: number;
    name: string;
}

export interface dataCategory extends Category {
    programs: dataProgram[]
}