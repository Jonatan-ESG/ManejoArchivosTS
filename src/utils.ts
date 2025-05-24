function obtenerSiguienteId(datos: any[], nombreIdentificador: string): number {
    const ultimoIdentificador = Math.max(...datos.map(registro => Number(registro[nombreIdentificador])))
    return ultimoIdentificador + 1;
}

export {obtenerSiguienteId}