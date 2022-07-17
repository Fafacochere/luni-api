import { Exercice } from "./Exercice";

export interface Program {
    id: number;
    name: string;
}

export interface dataProgram extends Program{
    exercices: Exercice[]
}