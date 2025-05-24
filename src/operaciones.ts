import { cargarDB, guardarCambiosDB } from "./db";
import { ListarParametros } from "./tipos/listar-parametros";
import { obtenerSiguienteId } from "./utils";

const db = cargarDB()

function listar<T>(parametros: ListarParametros): T[] {
    const { nombreTabla, aplicarPaginacion = false, inicioRegistros = 0, limiteRegistros = 10 } = parametros
    
    const datos = db[nombreTabla]

    if (datos === undefined || datos === null) throw new Error("No existe la tabla en la base de datos")

    if (!aplicarPaginacion) return datos as T[]

    const inicio = inicioRegistros;
    const fin = inicioRegistros + limiteRegistros;

    return datos.slice(inicio, fin) as T[]
}


function insertar<T>(nombreTabla: string, nombreIdentificador: string, data: T): void {
    let datos = db[nombreTabla]

    if (datos === undefined || datos === null) {
        datos = []
    }

    const registroNuevo: any = { ...data }

    if (datos.length > 0) {
        registroNuevo[nombreIdentificador] = obtenerSiguienteId(datos, nombreIdentificador);
    } else {
        registroNuevo[nombreIdentificador] = 1;
    }

    datos.push(registroNuevo);
    db[nombreTabla] = datos
    guardarCambiosDB(db)
}

export { listar, insertar }