class Connection {
    constructor () {
        // Found online and leveraging an unused chat app :')
        const CLIENT_ID = '4cNswoNqM2wVFHPg';
        this.lastUpdate = 0;

        this.drone = new ScaleDrone(CLIENT_ID);
        this.drone.on('open', error => {
            if (error) return console.error(error);
            console.log('Successfully connected');

            const room = this.drone.subscribe('snake-room');
            room.on('open', error => {
                if (error) return console.error(error);
                console.log('Successfully joined game room');
            });

            room.on('message', m => { 
                if (m?.clientId !== this.drone.clientId) {
                    // only add if client is not us
                    PLAYERS[m.clientId] = PLAYERS[m.clientId] && PLAYERS[m.clientId].length === 0 ? [] : [];
                    PLAYERS[m.clientId].unshift(new DummySnake(m.data.snake, Date.now()));
                    PLAYERS[m.clientId].length > 3 ? PLAYERS[m.clientId].pop() : null;
                }
            });
        });
        this.drone.on('error', console.error);
    }


    sendUpdate(snake) {
        if (this.lastUpdate + 200 > Date.now()) return;
        this.lastUpdate = Date.now();

        this.drone.publish({
            room: 'snake-room',
            id: this.drone.clientId,
            message: { snake }
        });
    }
}