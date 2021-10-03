'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const dataController = require('./src/controllers/controller');
const MongoDBUrl = 'mongodb://localhost:27017/myapp';

const server = new Hapi.server({
    port: 3000,
    host: 'localhost'
});

const registerRoutes = () => {
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
}

const init = async () => {

    registerRoutes();
    console.log("ROUTES REGISTERED");

    await server.start();
    mongoose.connect(MongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    return server;

    // try {
    //     await server.start();
    //     mongoose.connect(MongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    //     console.log('Server running on %s', server.info.uri);
    // } catch (err) {
    //     console.log(' err: server was not able to successfully start');
    // }

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init().then(server => {
    console.log('Server running at:', server.info.uri);
}).catch(err => {
    console.log(err);
});