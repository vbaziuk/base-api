'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const dataController = require('./src/controllers/controller');
const MongoDBUrl = 'mongodb://localhost:27017/myapp';
const hapiAuthJWT = require('hapi-auth-jwt2');
const jwksRsa = require('jwks-rsa');

const server = new Hapi.server({
    port: 3000,
    host: 'localhost'
});

const cbFunc = (doesExist) => {
    console.log("CD HIT:", doesExist);
    if (doesExist) {
        return true;
    }
    return false;
}

const validateUser = (decoded, request) => {
    /**
     * IMPLEMENT ME!!!
     * 
     * this is a check that the 'sub' claim exists in access token, modify to suit needs
     */
    console.log("Decoded", decoded);
    // console.log(request);

    if (decoded && decoded.sub) {
        // return callback(null, true, {});
        return cbFunc(true);
    }
    // return callback(null, false, {});
    return cbFunc(false);
}

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

    // const server = Hapi.server({
    //     port: 3000,
    //     host: 'localhost'
    // });

    // // list all
    // server.route({
    //     method: ['GET'],
    //     path: '/',
    //     handler: dataController.list
    // });

    // // get by id
    // server.route({
    //     method: ['GET'],
    //     path: "/{id}",
    //     handler: dataController.get
    // })

    // // put & post
    // server.route({
    //     method: ['PUT', 'POST'],
    //     path: "/",
    //     handler: dataController.create
    // });

    // // delete by id
    // server.route({
    //     method: ['DELETE'],         // bug: when a user deletes an already deleted entry, response returns success msg
    //     path: "/{id}",
    //     handler: dataController.remove
    // });

    // // patch by id
    // server.route({
    //     method: ['PATCH'],
    //     path: "/{id}",
    //     handler: dataController.update
    // });


    // await server.start();
    // mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});
    // console.log('Server running on %s', server.info.uri);

    await server.register(hapiAuthJWT);

    server.auth.strategy('jwt', 'jwt', {
        complete: true,
        key: jwksRsa.hapiJwt2KeyAsync({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: 'https://dev-qszglrqq.us.auth0.com/.well-known/jwks.json'
        }),
        verifyOptions: {
            audience: 'https://passbook.com',
            issuer: 'https://dev-qszglrqq.us.auth0.com/',
            algorithms: ['RS256']
        },
        validate: validateUser
    });

    server.auth.default('jwt');

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