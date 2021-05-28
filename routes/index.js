const express = require('express');
const router = express.Router();

const Alumnos = require('../models/alumnos');

router.get('/', async (req, res) => {
    const listaRegistros = await Alumnos.find();
    res.render('index', {
        listaRegistros
    });
});

router.get('/formulario', (req, res)=> {
    res.render('formulario', {
        mensaje: ''
    })
});

router.post('/add', async(req, res)=>{
    const objAlumnos = new Alumnos(req.body);
    await objAlumnos.save();
    res.render('formulario', {
        mensaje: 'Los datos se han guardado'
    });
});

router.get('/edit', async (req, res) => {
    const listaRegistros = await Alumnos.find();
    res.render('edit', {
        listaRegistros
    });
});

router.get('/edit/:id', async(req, res)=>{
    const { id } = req.params;
    const listaRegistros = await Alumnos.find();
    const alumno = await Alumnos.findById({ _id: id });
    res.render('updateForm', {
        alumno
    });
});

router.post('/edit/:id', async(req, res)=>{
    const { id } = req.params;
    await Alumnos.updateOne({ _id: id}, req.body);
    res.redirect('/');
});

module.exports = router;