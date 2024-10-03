// WebSocketService.js
const WebSocket = require('ws');

class WebSocketService {
  constructor(port) {
    this.wss = new WebSocket.Server({ port: port });
    this.initialize();
  }

  initialize() {
    this.wss.on('connection', (ws) => {
      console.log('New WS client connected');
    
      ws.on('message', (message) => {
        console.log(`Received: ${message}`);
      });

      ws.on('close', () => {
        console.log('WS Client disconnected');
      });
    });

    console.log('WebSocket server is running');
  }

  async send(data) {
    console.log("Connecting WS Client to send data");
    console.log(data);
    this.wss.clients.forEach(client => {
        //console.log(client);
      if (client.readyState === WebSocket.OPEN) {
        console.log("Sending Data to WS");
        client.send(data);
      }
    });
  }
}

module.exports = WebSocketService;
