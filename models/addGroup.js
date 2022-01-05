// Models/addGroup.js

var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var groupSchema = new Schema({
    group      : String,
    updated_at : Date
});
 
// 將數據模型暴露出去
module.exports = mongoose.model('group', groupSchema);