const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// services
const grpc_client = require('./grpc');

// enhance api security
app.use(helmet());

// parse json bodies
app.use(bodyParser.json());

// enable cors
app.use(cors());

// log http requests
app.use(morgan('combined'));

/**
 * Server
 */
const port = process.env.PORT || 5000;
http.listen(port);
console.log("Server running on:", port);

/**
 * Socket
 * Ping Pong with Grpc
 * Ping pong with client
 */

// create global grpc connection
let grpc;
try {
    grpc = new grpc_client('localhost:9901');
} catch(err) {
    console.log('Connection to grpc failed: ' + err);
}

// mirror socket
io.of('/mirror').on('connection', (socket) => {
    let call;

    socket.emit('connected', socket.id);

    socket.on('createStream', () => {
        // open up stream and listener
        try {
            call = grpc.getClient().flip();

            call.on('data', (resp) => {
                socket.emit('invertPoint', resp);
            });

            call.on('end', () => {
                console.log('mirror stream ended');
            })
        } catch(err) {
            if (err) console.log('Opening bidirectional stream failed: ', err);
        }
    });

    socket.on('endStream', () => {
        // end stream
        try {
            call.end();
        } catch(err) {
            if (err) console.log('closing bidirectional stream failed: ', err);
        }
    });

    socket.on('sendPoint', (data) => {
        let req = {
            x: data.point.x,
            y: data.point.y,
            canvas: data.canvas
        }

        // sends req to golang grpc backend
        try {
            call.write(req);
        } catch(err) {
            if (err) console.log('sending point to grpc backend failed: ', err);
        }

    });
});
