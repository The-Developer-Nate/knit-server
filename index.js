// index.js by MLXOA
// created by TheDevNate (TEAM#1)

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 4500 });

const broadcastSelf = process.env.broadcastSelf || true

function broadcast(msg, ws) {
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      if (broadcastSelf == false && client !== ws) {
        client.send(msg, { binary: false });
      } else {
        client.send(msg, { binary: false });
      }
    }
  }
}

wss.on("connection", (ws) => {
  ws.on("message", function (data) {
    broadcast(data, ws);
  });
});