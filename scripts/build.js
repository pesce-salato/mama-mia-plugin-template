import * as esbuild from 'esbuild'
import cpy from 'cpy'
import { log } from "./log.js"
import Fs from "fs";
import Path from "path";
import { rimrafSync } from 'rimraf'
import AdmZip from 'adm-zip'

const outputMap = {
    zip: './output/plugin.zip',
    src: './output/src',
    script: './output/src/index.js',
    base: './output'
}

const srcMap = {
    script: './src/index.ts',
    config: './src/config.json',
    icon: './src/icon.svg'
}

const buildScript = async () => {
    await esbuild.build({
        entryPoints: [srcMap.script],
        bundle: true,
        platform: 'node',
        format: 'esm',
        legalComments: 'none',
        outfile: outputMap.script,
    })
}

const checkFile = async () => {
    [srcMap.script, srcMap.config].forEach(path => {
        if(!Fs.existsSync(Path.join(process.cwd(),path))){
            log(`file ${path} lost`, 'error')
            process.exit()
        }
    })

    if(!Fs.existsSync(Path.join(process.cwd(), srcMap.icon))){
        log(`optional file .${srcMap.icon} lost`, 'warning')
    }
}

const copyFile = async () => {
    for (const path of [srcMap.config, srcMap.icon]) {
        if(Fs.existsSync(Path.join(process.cwd(), path))){
            await cpy(path, outputMap.src, {
                flat: true
            })
        }
    }
}

const zip = async () => {
    const file = new AdmZip()
    await file.addLocalFolderPromise(Path.join(process.cwd(), outputMap.src))
    await file.writeZipPromise(Path.join(process.cwd(), outputMap.zip))
}

const build = async () => {
    log('start build plugin')
    log('checking file......')
    await checkFile()
    log('clear output dir')
    rimrafSync('./output')
    log('building script......')
    await buildScript()
    log('copying file')
    await copyFile()
    log('generating zip file...')
    await zip()
    log('done')
}

build()
