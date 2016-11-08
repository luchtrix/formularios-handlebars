var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alertaSchema = new Schema({
	question: String,
	fechaQuestion: Date
});

module.exports = mongoose.model('Alerta', alertaSchema);