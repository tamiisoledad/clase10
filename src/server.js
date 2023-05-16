import express from 'express'
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';

const app = express();
const httpServer = app.listen(8080, () => console.log("listening on PORT 8080"));

const messages = [];

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', viewsRouter)

socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.emit('messages', messages);
    socket.on('message', data => {
        const message = {
            socketid: socket.id,
            mensaje: data
        };
        console.log(data)
        messages.push(message);
        socketServer.emit('newMessage', message);
    })

    socket.emit('evento_para_socket_individual', 'Este mensaje solo lo debe recibir el socket')
    socket.broadcast.emit('evento_para_todos_menos_el_socket_actual', 'este evento lo veran todos los sockets conectados, menos el socket actual desde el que se envio el mensaje')
    socketServer.emit('evento_para_todos', 'Este lo recibiran todos los sockets conectados')
})