// index.js by MLXOA
// created by TheDevNate (TEAM#1)

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 4500 });

function broadcast(msg) {
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg, {binary: false})
    }
  }
}

wss.on("connection", (ws) => {
  ws.on("message", function (data) {
    broadcast(data, ws);
  });
});