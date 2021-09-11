const app = require("express")();
const httpServer = require("http").createServer(app);
const options = {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
};
const io = require("socket.io")(httpServer, options);
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello world")
});

const users = {};

io.on("connection", socket => {

    socket.on("disconnect", () => {
        for (user in users) {
            if (users[user] == socket.id) delete users[user];
            io.emit("all_users", users);
        }
    });

    socket.on("add_user", (username) => {
        users[username] = socket.id;
        io.emit("all_users", users);
    });

    socket.on("send_message", (data) => {
        const socketId = users[data.reciver];
        io.to(socketId).emit("new_message",data)
    });



});

httpServer.listen(port, () => {
    console.log(`server is listing on PORT : ${port}`);
});