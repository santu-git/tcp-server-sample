


class DataController {
    constructor(tcpService, io, wsService) {
        this.io = io;
        this.ws = wsService;
        tcpService.on('barcode', this.processBarcode.bind(this));
    }

    async processBarcode(barcode) {
        
        // Fetch Camera and Tag mapping and emit to client
        barcode = barcode.replace(/(\r\n|\n|\r)/gm, "");
        var [cameraID, tag] = barcode.split(',',2);
        var timestamp = Date.now();
        this.io.emit('barcode', {camera: cameraID, hu: tag, timestamp: timestamp});
        this.ws.send(JSON.stringify({camera: cameraID, hu: tag, timestamp: timestamp}));
        
    }

}

module.exports = DataController;