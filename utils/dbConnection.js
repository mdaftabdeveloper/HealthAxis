require("dotenv").config();
const mongoose = require("mongoose");

async function dbConnect() {
    try {
        const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => console.log("MongoDB Connected"))
            .catch(err => console.error("MongoDB Connection Error", err));


    } catch (error) {
        console.log(error);
    }
}
module.exports = dbConnect;