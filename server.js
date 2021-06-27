'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const dataController = require('./src/controllers/controller');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // list all
    server.route({
        method: ['GET'],
        path: '/',
        handler: dataController.list
    });

    // get by id
    server.route({
        method: ['GET'],
        path: "/{id}",
        handler: dataController.get
    })

    // put & post
    server.route({
        method: ['PUT', 'POST'],
        path: "/",
        handler: dataController.create
    });

    // delete by id
    server.route({
        method: ['DELETE'],         // bug: when a user deletes an already deleted entry, response returns success msg
        path: "/{id}",
        handler: dataController.remove
    });

    // patch by id
    server.route({
        method: ['PATCH'],
        path: "/{id}",
        handler: dataController.update
    });

    /**
     * Alternate Experimental Routes
     */

    // alt post
    server.route({
        method: ['PUT', 'POST'],
        path: "/alternateData",
        handler: dataController.altPost
    });

    // alt get
    server.route({
        method: ['GET'],
        path: "/alternateData",
        handler: dataController.altList
    });

    // alt delete
    server.route({
        method: ['DELETE'],         // bug: when a user deletes an already deleted entry, response returns success msg
        path: "/alternateData/{id}",
        handler: dataController.altRemove
    });


    // await server.start();
    // mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});
    // console.log('Server running on %s', server.info.uri);

    try {
        await server.start();
        mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Server running on %s', server.info.uri);
    } catch (err) {
        console.log(' err: server was not able to successfully start');
    }

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();