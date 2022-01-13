const mongoose = require('mongoose');
require("dotenv").config({ path: ".env" });
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO_LOCAL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      
        });
        console.log('DB Conectada')
    } catch (error) {
        console.log(error);
        process.exit(1); //detener app
    }
}
module.exports = conectarDB;