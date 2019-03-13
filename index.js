var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    console.log("message: " + msg);
  });
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });
});

io.on("connection", function(socket) {
  io.emit("chat message", "A user has connected");
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
    io.emit("chat message", "A user has Disconnected");
  });
});

http.listen(3000, () => {
  console.log("Listening on port 3000");
});
