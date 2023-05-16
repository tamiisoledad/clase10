const socket = io();
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessageButton');
const messageContainer = document.getElementById('messageContainer');

sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value;
    socket.emit('message', message);
    messageInput.value = ''; // Limpiar el campo de entrada de texto
});

socket.on('messages', data => {
    // Limpiar el contenedor de mensajes
    messageContainer.innerHTML = '';

    // Mostrar los mensajes recibidos
    data.forEach(message => {
        const messageElement = document.createElement('p');
        messageElement.textContent = `[${message.socketid}]: ${message.mensaje}`;
        messageContainer.appendChild(messageElement);
    });
});

socket.on('newMessage', message => {
    const messageElement = document.createElement('p');
    messageElement.textContent = `[${message.socketid}]: ${message.mensaje}`;
    messageContainer.appendChild(messageElement);
});


/*

const socket = io();
const messageInput = document.getElementById('messageInput');
const messageContainer = document.getElementById('messageContainer');

messageInput.addEventListener('input', () => {
    const message = messageInput.value;
    socket.emit('message', message);
});

socket.on('message', data => {
    messageContainer.textContent = data;
});
*/