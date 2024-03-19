require("dotenv").config()
const mongoose = require("mongoose")
const app = require("./app")
const PORT = process.env.PORT ;

// pelajari promise
const db = process.env.database;
mongoose.connect(db, {
useNewUrlParser: true,
}).then(con => {
    console.log("connection success");
});

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name must exist"]
    },
    email: {
        type: String,
        unique: true,
    },
    phoneNum: {
        type: Number,
        require: true
    },
    city : String,
    country: {
        type: String,
        require: true,
        default: "Indonesia"
    }
});

const Customer = mongoose.model('Customers', customerSchema);

const customerTest = new Customer({
    name: 'Anastasia',
    email: 'anastasia12@gmail.com',
    phoneNum: 77777777777,
});

customerTest.save().then(doc => {
    console.log(doc)
}).catch((err) => {
    console.log("error" + err)
});

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
})