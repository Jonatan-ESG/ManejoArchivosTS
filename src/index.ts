import { listar } from './operaciones'
import { Cliente } from './tipos/cliente'
import { Estudiante } from './tipos/estudiante'

const datosProcesadosClientes = listar<Cliente>('clientes', true, 10, 20)
const datosProcesadosEstudiantes = listar<Estudiante>('estudiantes', true, 0, 10)

console.log(datosProcesadosClientes)
console.log(datosProcesadosEstudiantes)