import {SourceMapConsumer} from 'source-map'
import {readFileSync} from 'fs'
import {resolve,dirname} from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rawSourceMap = readFileSync(resolve(__dirname,'../node_modules/@sap-cloud-sdk/util/dist/string.js.map'),{encoding:'utf8'})

const whatever = await SourceMapConsumer.with(rawSourceMap, null, consumer => {
    const sourceUrl = consumer.sources[0]
    const sources = consumer.sourceContentFor(sourceUrl)
    if(!sources){
       console.log('Source not loaded')
    }else{
        console.log('Source loaded.')
    }
})

