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
            start();
        });

        this.room.on('message', m => { 
            if (m && m.clientId && m.clientId !== this.drone.clientId) {
                let { snake, type } = m.data;
                switch(type) {
                    case 'keep_alive':
                        if (!PLAYERS[m.clientId]) {
                            PLAYERS[m.clientId] = new Snake();
                            PLAYERS[m.clientId].pieces = snake.pieces;
                            PLAYERS[m.clientId].baseColor = snake.baseColor;
                            PLAYERS[m.clientId].headColor = snake.headColor;
                            PLAYERS[m.clientId].speed = snake.speed;
                            PLAYERS[m.clientId].direction = snake.direction;
                            PLAYERS[m.clientId].hasGrown = snake.hasGrown;
                            PLAYERS[m.clientId].spawnTime = snake.spawnTime;
                            PLAYERS[m.clientId].lastUpdateReceived = Date.now();
                        }
                        break;

                    case 'spawn':
                        PLAYERS[m.clientId] = new Snake();
                        PLAYERS[m.clientId].pieces = snake.pieces;
                        PLAYERS[m.clientId].baseColor = snake.baseColor;
                        PLAYERS[m.clientId].headColor = snake.headColor;
                        PLAYERS[m.clientId].speed = snake.speed;
                        PLAYERS[m.clientId].direction = snake.direction;
                        PLAYERS[m.clientId].hasGrown = snake.hasGrown;
                        PLAYERS[m.clientId].spawnTime = snake.spawnTime;
                        PLAYERS[m.clientId].lastUpdateReceived = Date.now();
                        break;

                    case 'direction_change':
                        PLAYERS[m.clientId].direction.push(snake.direction.pop());
                        PLAYERS[m.clientId].lastUpdateReceived = Date.now();
                        break;

                    case 'speed_change':
                        PLAYERS[m.clientId].speed = snake.speed;
                        PLAYERS[m.clientId].lastUpdateReceived = Date.now();
                        break;

                    case 'has_grown':
                        PLAYERS[m.clientId].pieces.push(snake.pieces.pop());
                        PLAYERS[m.clientId].lastUpdateReceived = Date.now();
                        break;
                }
            }
        });
    }


    sendUpdate(snake, type) {
        this.drone.publish({
            room: 'snake_game',
            id: this.drone.clientId,
            message: { 
                type,
                snake
            }
        });
    }
}


const CONNECTION = new Connection();