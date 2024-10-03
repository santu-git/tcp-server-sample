const net = require('net');
const EventEmitter = require('events');

class TCPService extends EventEmitter {
    constructor(port) {
        super();
        this.port = port;
        this.server = net.createServer((socket) => {
            console.log('Client connected');
            socket.on('data', (data) => {
                this.emit('barcode', data.toString());
            });

            socket.on('end', () => {
                console.log('Client disconnected');
            });
        });

        this.server.on('error', (err) => {
            console.error('Server error:', err);
        });
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}

module.exports = TCPService;
