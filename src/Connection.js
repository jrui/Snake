class Connection {
    constructor () {
        // Found online and leveraging an unused chat app :')
        const CLIENT_ID = '4cNswoNqM2wVFHPg';
        this.lastUpdate = 0;

        this.drone = new ScaleDrone(CLIENT_ID);
        this.drone.on('open', error => {
            if (error) return console.error(error);
            console.log('Successfully connected');
        });
        this.drone.on('error', console.error);

        this.room = this.drone.subscribe('snake_game');
        this.room.on('open', error => {
            if (error) return console.error(error);
            console.log('Successfully joined game room');
        });

        this.room.on('message', m => { 
            if (m && m.clientId && m.clientId !== this.drone.clientId) {
                // only add if client is not us
                PLAYERS.push(new DummySnake(m.data.snake, Date.now()));
            }
        });
    }


    sendUpdate(snake) {
        if (this.lastUpdate + 200 > Date.now()) return;
        this.lastUpdate = Date.now();

        this.drone.publish({
            room: 'snake_game',
            id: this.drone.clientId,
            message: { snake }
        });
    }
}


const CONNECTION = new Connection();