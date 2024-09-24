import   {WebSocketServer , WebSocket} from "ws";
import  Express  from "express";

const app = Express();
const port = 8080;
const httpserver = app.listen(port); 

const wss = new WebSocketServer({server : httpserver});


wss.on('connection', function connection(ws){
    ws.on('error', console.error);

    ws.on ('message', function message(data, isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data, {binary : isBinary});
            }
        })
    })

    ws.send('hello, Message from server!!');
});

console.log(`running on http://localhost:${port}`);



