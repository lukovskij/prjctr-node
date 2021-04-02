const http = require('http');
const url = require('url')
const querystring = require('querystring')

const getProcessServerArgs = (arg) => process.argv.find(el => el.includes(`${arg}=`))?.split('=')[1]

const hostname = getProcessServerArgs('hostname') || '127.0.0.1';
const port = getProcessServerArgs('port') || '3000'

const correctURLs = {
	goodbye: 'goodbye',
	hello: 'hello'
}

const answerResolver = (req) => {
	const {method, url: uri} = req
	const rawURL = url.parse(uri)
	const queryParams = querystring.parse(rawURL.query)
	
	if(method !== 'GET'){
		return {
			answer: 'Not Found',
			code: 404
		}
	}
	
	if(rawURL.pathname.includes(correctURLs.goodbye)){
		return  {answer: `Goodbye ${queryParams?.name || ''}`, code:  200}
	}
	if(rawURL.pathname.includes(correctURLs.hello)) {
		return {answer: `Hello, ${queryParams?.name || 'world'}`,  code: 200}
	}

	return {
		answer: 'Not Found',
		code: 404
	}
}

const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	const {answer, code} = answerResolver(req)

	res.statusCode = code
	res.end(answer)
})

server.listen(port, hostname, () => {
	console.log(`Server is running ar http://${hostname}:${port}/`);
})
