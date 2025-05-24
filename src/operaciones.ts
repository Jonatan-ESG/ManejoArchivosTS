import { cargarDB } from "./db";

const db = cargarDB()

function listar<T>(nombreTabla: string, aplicarPaginacion: boolean = true, inicioRegistros: number = 0, limiteRegistros: number = 10): T[] {
    const datos = db[nombreTabla]

    if(datos === undefined || datos === null) throw new Error("No existe la tabla en la base de datos")

    if(!aplicarPaginacion) return datos as T[]

    const inicio = inicioRegistros;
    const fin = inicioRegistros + limiteRegistros;

    return datos.slice(inicio, fin) as T[]
}

export {listar}