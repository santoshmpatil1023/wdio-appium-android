import path from 'path'
import { fileURLToPath } from 'url'
import { baseConfig } from './wdio.base.conf.js'

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

export const config = {
    ...baseConfig,
    specs: [path.join(projectRoot, 'test/specs/pom/**/*.js').replace(/\\/g, '/')],
    logLevel: 'debug',
}
