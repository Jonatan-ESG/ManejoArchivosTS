import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const DB_PATH = join(__dirname, 'data', 'db.json')

function cargarDB(): Record<string, Record<string, any>[]> {
    const stringData = readFileSync(DB_PATH, 'utf-8')
    return JSON.parse(stringData)
}

function guardarCambiosDB(db: Record<string, Record<string, any>[]>) {
    const data = JSON.stringify(db)
    writeFileSync(DB_PATH, data)
}

export { cargarDB, guardarCambiosDB }
