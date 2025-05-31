import { cargarDB, guardarCambiosDB } from './db'
import { ListarParametros } from './tipos/listar-parametros'
import { PromediarParametros } from './tipos/promediar-parametros'
import { obtenerSiguienteId } from './utils'

const db = cargarDB()

function listar<T>(parametros: ListarParametros): T[] {
    const { nombreTabla, aplicarPaginacion = false, inicioRegistros = 0, limiteRegistros = 10 } = parametros

    const datos = db[nombreTabla]

    if (datos === undefined || datos === null) throw new Error('No existe la tabla en la base de datos')

    if (!aplicarPaginacion) return datos as T[]

    const inicio = inicioRegistros
    const fin = inicioRegistros + limiteRegistros

    return datos.slice(inicio, fin) as T[]
}

function insertar<T>(nombreTabla: string, nombreIdentificador: string, data: T): void {
    let datos = db[nombreTabla]

    if (datos === undefined || datos === null) {
        datos = []
    }

    const registroNuevo: any = { ...data }

    if (datos.length > 0) {
        registroNuevo[nombreIdentificador] = obtenerSiguienteId(datos, nombreIdentificador)
    } else {
        registroNuevo[nombreIdentificador] = 1
    }

    datos.push(registroNuevo)
    db[nombreTabla] = datos
    guardarCambiosDB(db)
}

function eliminar(nombreTabla: string, nombreIdentificador: string, valor: number): void {
    const datos = db[nombreTabla]
    if (datos === undefined || datos === null) throw new Error('No existe la tabla en la base de datos')

    const nuevosDatos = datos.filter((dato1) => {
        return dato1[nombreIdentificador] !== valor
    })
    db[nombreTabla] = nuevosDatos
    guardarCambiosDB(db)
}

function actualizar<T>(nombreTabla: string, nombreIdentificador: string, data: T, valorId: number, nombresCampos: string[]): void {
    let datos = db[nombreTabla]

    if (datos === undefined || datos === null) {
        throw new Error('No hay datos para actualizar')
    }

    const datoActualizar = datos.find((registro) => registro[nombreIdentificador] == valorId)
    if (datoActualizar == undefined) {
        throw new Error('No se econtró el dato a actualizar')
    }
    const registroNuevo: any = { ...data }

    for (const element of nombresCampos) {
        datoActualizar[element] = registroNuevo[element]
    }
    const nuevoDatos = datos.filter((dato: any) => dato[nombreIdentificador] !== valorId)
    nuevoDatos.push(datoActualizar)
    db[nombreTabla] = nuevoDatos
    guardarCambiosDB(db)
}

function promediar(parametros: PromediarParametros) {
    const { nombreTabla, campoPromedio } = parametros

    const datos = db[nombreTabla]

    if (datos === undefined || datos === null) throw new Error('No existe la tabla en la base de datos')
    let totalPromedio = 0
    let totalRegistros = 0
    for (const element of datos) {
        totalRegistros++
        totalPromedio += Number(element[campoPromedio])
    }
    let promedioGeneral = totalPromedio / totalRegistros
    return promedioGeneral
}
export { listar, insertar, eliminar, actualizar, promediar }
