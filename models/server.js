const express = require('express');
const hbs = require('hbs');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();

        this.port = process.env.PORT;
        this.app.set('view engine','hbs')
        this.usuariosPath = '/api/usuarios';

        this.app.get('/', (req, res) => {
            res.render('home', {
            });
        });
        this.routes();

        this.middlewares();
      //  this.partials();
        // Conectar a base de datos
        this.conectarDB();

    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

     middlewares() {
       this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }


    // partials(){
    //   this.hbs.registerPartials(__dirname + '/views/fragmentos');
    // }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }


}


//hbs.registerPartials(__dirname + '/views/fragmentos');
module.exports = Server;
