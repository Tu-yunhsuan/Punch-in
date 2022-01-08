const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/PunchIn";

//-----sync syntax-----
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("MongoDB連線成功(habit)");
});

const habitSchema = new mongoose.Schema({
    title: String,
    times: Number,
    status: Boolean,
    tag: String,
    done: Array
});
habitSchema.set('collection', 'habit');
const model = mongoose.model('habit', habitSchema);

module.exports = model;