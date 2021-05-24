const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlumnoSchema = new Schema({
    nombre: String,
    apellido: String,
    comentarios: String
});

module.exports = mongoose.model('alumnos', AlumnoSchema);
