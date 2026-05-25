import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export function loadFixture(name) {
    const filePath = join(__dirname, '..', 'test', 'data', `${name}.json`)
    console.log('Loading fixture from:', filePath) // temp debug line
    return JSON.parse(readFileSync(filePath, 'utf-8'))
}