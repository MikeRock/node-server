import fs from 'fs'
import net, {Socket} from 'net'
import http from 'http'
import util from 'util'
import url from 'url'


process.stdin.setEncoding('utf8')
process.stdin.resume()
process.stdin.on('data', (data)=>{
if(data.toString().indexOf('quit') != -1)
server.close()           
console.log(`Server: ${data}`)
})
let server = http.createServer((req, res) => {
let method = req.method
let path = req.url
let stream = fs.createReadStream('./index.html')
let body
stream.setEncoding('utf8')
stream.on('data',(data) => {
body += data
})
stream.on('end', ()=> {
if(method == 'GET' && path.indexOf('/home') !== -1){
res.write(body)
res.statusCode= 200
res.end()
} else {
res.statusCode = 200    
res.end(`Path incorrect. Expected "./home" got ${path}`)    
}    

})
})
process.nextTick(() => {server.listen(3000)})
server.on('listening',()=>{
console.log(`Listening on port ${server.address().port}`)    
})

server.on('close',() => {
console.log(`Server was closed`)    
})
server.on('error',(error) => {
console.log(`Error: ${error.message}`)
})
