import Path from 'path'
import Fs from 'fs'
import inquirer from 'inquirer'
import chalk from "chalk"
import cpy from 'cpy'
import {log} from "./log.js";

const scriptPath = Path.join(process.cwd(), './src/index.ts')
const configPath = Path.join(process.cwd(), './src/config.json')

const configTemplate = JSON.parse(Fs.readFileSync(Path.join(process.cwd(), './scripts/templates/config.json')).toString())

const scriptTemplateMap = {
    'credential': 'scripts/templates/credential.ts',
    'node': 'scripts/templates/node.ts'
}

const allowOverwrite = async (file, displayFilePath) => {
    if(Fs.existsSync(file)){
        const {isSure} = await inquirer.prompt({
            type: 'confirm',
            name: 'isSure',
            message: chalk.red(`${displayFilePath} will be overwrite, confirm whether to execute?`),
            default: false
        })

        return isSure
    }
    return true
}

const create = async () => {
    const { type } = await inquirer.prompt({
        type: 'list',
        message: 'create which type of plugin:',
        choices: Object.keys(scriptTemplateMap),
        name: 'type'
    })
    configTemplate.type = type

    if(await allowOverwrite(scriptPath, './src/index.ts')){
        await cpy(scriptTemplateMap[type], './src', {
            rename: 'index.ts',
            flat: true
        })
        log('create file ./src/index.ts')
    }

    if(await allowOverwrite(configPath, './src/config.json')){
        Fs.writeFileSync(configPath, JSON.stringify(configTemplate, null, 2))
        log('create file ./src/config.json')
    }
}

create()
