const express = require('express');
const conectarDB = require('./config/db')
// crear els ervidor
const cors = require('cors');


const app = express();
var bodyParser = require('body-parser');
const PORT  = process.env.PORT || 4000;

conectarDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));



app.use(require('./routes/index'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use("/api/auth", require("./routes/auth"));


app.listen(PORT, () => {
    console.log(`el servidor esta funcionando en el puerto ${PORT} `);
})


//mongod --noauth --dbpath ~/mongo/data/db

