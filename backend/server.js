const app = require('./app');
const http = require('http');
const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port,() => console.log(`listening on port {$port}`));

/*app.get('/express_backend', (req,res) => {
    res.send({express: 'YOUR EXPRESS BACKEND IS CONECTED TO REACT'});
});*/
