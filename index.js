const server = require('./api/server');
const PORT = process.env.PORT || 6860;

//sanity check
server.get('/', (req, res) => res.send("Api #5 Is Alive"))

server.listen(PORT, () => console.log(`\n=== Web API Listening on port ${PORT} ===\n`));