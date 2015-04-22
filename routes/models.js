var mongoose = require("mongoose");
var dSchema = mongoose.Schema({
    uid: String,
    pipelines: [],
    content: []
});
var USchema = mongoose.Schema({
    liId: String,
    email: String,
    firstName: String,
    lastName:String,
    pictureUrl: String
});
var models = {
    dModel: mongoose.model('dModel', dSchema),
    UModel: mongoose.model('UModel', USchema)
};
module.exports = models;