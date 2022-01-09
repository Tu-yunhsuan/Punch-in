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
    console.log("MongoDB連線成功(study)");
});

const studySchema = new mongoose.Schema({
    title: String,
    status: Boolean,
    tag: String,
    time: String
});
studySchema.set('collection', 'study');
const model = mongoose.model('study', studySchema);

module.exports = model;