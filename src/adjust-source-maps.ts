import {promise as globPromise} from "glob-promise";
import {resolve,join,parse} from "path";
import {promises} from 'fs'

const {readFile,writeFile} = promises
// const remotePathToSources = 'https://raw.githubusercontent.com/SAP/cloud-sdk-js/main/packages/util/src/'
const pathToSources = resolve(__dirname,'../','util-src')
const pathToDist = resolve(__dirname,'../','node_modules','@sap-cloud-sdk','util','dist')

async function adjustSourceMaps(useSourceRoot=true){
    const files = await globPromise('**/*.map',{cwd: pathToDist })
    await Promise.all(files.map(async file=>{
        try {
            const fileName = file.split('/').pop()
            const fileFolder = parse(file).dir || ''
            const filePath = join(pathToDist, parse(file).dir!, fileName)
            const fileContent = JSON.parse(await readFile(filePath, {encoding: "utf-8"}));

            const newSourceRoot = useSourceRoot ? join(pathToSources,fileFolder) : "";
            const sourceFileName = fileName.replace(new RegExp("\.js\.map|\.d\.ts\.map"),".ts")
            const newSources = useSourceRoot ? sourceFileName : join(pathToSources,fileFolder,sourceFileName)
            const newSourceMap = {...fileContent,sourceRoot:newSourceRoot,sources:[newSources]}

            await writeFile(filePath, JSON.stringify(newSourceMap, null, 2), {encoding: "utf-8"})
        }catch(e:any){
            console.log(`Error in adjusting file: ${file}: ${e.message}`)
        }
    }))
    console.log(`${files.length} source maps have been adjusted.`)
}

adjustSourceMaps()
