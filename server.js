const WebSocketServer = require("ws").Server
const http = require("http")
const express = require("express")
const app = express()
const port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

const server = http.createServer(app)

server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({ server })
console.log("websocket server created")

wss.on("connection", function (ws) {
  var id = setInterval(function () {
    ws.send(JSON.stringify(new Date()), function () { })
  }, 1000)

  console.log("websocket connection open")

  ws.on("close", function () {
    console.log("websocket connection close")
    clearInterval(id)
  })
})

const wss2 = new WebSocketServer({ server, path: "/to_upper_case" })

console.log("to_upper_case websocket server created")

wss2.on("connection", function (ws) {
  ws.on('message', (msg) => {
    if (typeof msg === 'string') {
      ws.send(msg.toUpperCase())
    }
  })
})