import {mysqlManager} from "../utils/mysqlManager";
import {Category, dataCategory} from "../interfaces/Category";
import {dataProgram, Program} from "../interfaces/Program";
import {allDataExercice, Exercice} from "../interfaces/Exercice";

class DataService {

    getAllCategories = async (): Promise<Category[]> => {
        const query = "SELECT id, name FROM categories";
        return await mysqlManager.rawQuery(query).then((values: {0: Category[]}) => values[0])
    }

    getAllPrograms = async (): Promise<Program[]> => {
        const query = "SELECT id, name FROM programs";
        return await mysqlManager.rawQuery(query).then((values: {0: Program[]}) => values[0])
    }

    getAllExercices = async (): Promise<Exercice[]> => {
        const query = "SELECT id, name, repetitions FROM exercices";
        return await mysqlManager.rawQuery(query).then((values: {0: Exercice[]}) => values[0])
    }

    getProgramsByCategory = async (id: number): Promise<Exercice[]> => {
        const query = `SELECT id, name FROM programs where category_id = ${id}`;
        return await mysqlManager.rawQuery(query).then((values: {0: Exercice[]}) => values[0])
    }

    getAllData = async () => {
        const query = `
            SELECT 
                c.id as category_id,
                c.name as category_name,
                p.id as program_id,
                p.name as program_name,
                e.id as exercice_id,
                e.name as exercice_name,
                e.repetitions as exercice_repetitions
            FROM 
                programs_exercices pe
                JOIN exercices e on e.id = pe.exercice_id
                JOIN programs p on p.id = pe.program_id
                JOIN categories c on c.id = p.category_id
            ;
        `;
        return mysqlManager.rawQuery(query).then((results: any) => {
            console.log(results)
            const allData = results[0] as allDataExercice[];
            const jsonData: any = {};
            allData.forEach((item) => {
                if (!jsonData[item.category_name]) {
                    jsonData[item.category_name] = this.createDataCategory(item);
                }
                 else {
                    const program = jsonData[item.category_name].programs.filter((program: any) => program.id === item.program_id);
                    if(program.length === 0) {
                        jsonData[item.category_name].programs.push(this.createNewProgram(item))
                    } else {
                        const indexProgram = jsonData[item.category_name].programs.indexOf(program[0]);
                        jsonData[item.category_name].programs[indexProgram].exercices.push({
                            id: item.exercice_id,
                            name: item.exercice_name,
                            repetitions: item.exercice_repetitions,
                        })
                    }
                }
            })
            return Object.values(jsonData);
        })
    }

    private createDataCategory = (exerciceInfo: allDataExercice): dataCategory => {
         const data: dataCategory = {
             id: exerciceInfo.category_id,
             name: exerciceInfo.category_name,
             programs: [this.createNewProgram(exerciceInfo)]
        };
         return data;
    }

    private createNewProgram = (exerciceInfo: allDataExercice): dataProgram => {
        return  {
            id: exerciceInfo.program_id,
            name: exerciceInfo.program_name,
            exercices: [{
                id: exerciceInfo.exercice_id,
                name: exerciceInfo.exercice_name,
                repetitions: exerciceInfo.exercice_repetitions
            }],
        };
    }
}

export const dataService = new DataService();