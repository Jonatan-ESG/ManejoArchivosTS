import { eliminar, insertar, listar, actualizar } from './operaciones'

import { Cliente } from './tipos/cliente'
import { Estudiante } from './tipos/estudiante'

const datosProcesadosClientes = listar<Cliente>({
    nombreTabla: 'clientes'
})

const estudiante: Estudiante = {
    nombre: 'Darwin Ruiz',
    nota: 70
}

//insertar('estudiantes', 'id', estudiante)

const datosProcesadosEstudiantes = listar<Estudiante>({
    nombreTabla: 'estudiantes',
    aplicarPaginacion: true,
    inicioRegistros: 0,
    limiteRegistros: 20
})

eliminar("estudiantes","id",10)

actualizar<Estudiante>('estudiantes', 'id', {nombre: 'Dallin Osorio', nota: 80 }, 14, ['nota'] )
console.log(datosProcesadosClientes)
console.log(datosProcesadosEstudiantes)