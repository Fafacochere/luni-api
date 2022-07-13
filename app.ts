import express from 'express';
import router from './router';

const app = express()


const hostname = '0.0.0.0'
const port = process.env.NODE_PORT ?? 80;

app.listen(port)
console.log(`Server start hostname ${hostname}:${port}`)
console.log('Hello console')

app.use(router)