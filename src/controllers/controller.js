var Dataschema = require('../models/schema');
// var Altschema = require('../models/alt');

/**
 * list entries - GET
 */
exports.list = (request, h) => {
    return Dataschema.find({}).exec().then((lol) => {
        return { accounts: lol };
    }).catch((err) => {
        return { err: err };
    });
}

/**
 * GET by id
 */
exports.get = (request, h) => {
    return Dataschema.findById(request.params.id).exec().then((lol) => {
        if (!lol) return { message: 'Entry not found' };
        return { accounts: lol };
    }).catch((err) => {
        return { err: err };
    });
}

/**
 * POST an entry
 */
exports.create = (request, h) => {
    // console.log(request.payload.name);
    // console.log(request.payload.name);

    const entryData = {
        name: request.payload.name,
        email: request.payload.email,
        password: request.payload.password
    }
    // console.log(entryData);

    return Dataschema.create(entryData).then((lol) => {
        return { message: "Entry created successfully!", postBody: lol };
    }).catch((err) => {
        return { err: err };
    })
}

// *** alt post ***
exports.altPost = (request, h) => {
    console.log("msg: altPost")
    const entryData = {
        name: request.payload.name,
        email: request.payload.email,
        password: request.payload.password
    }
    console.log(entryData);
    return Altschema.create(entryData).then((lol) => {
        return { message: "Entry created successfully!", postBody: lol };
    }).catch((err) => {
        return { err: err };
    })
}

// *** alt list ***
exports.altList = (request, h) => {
    console.log("msg: altList")
    return Altschema.find({}).exec().then((lol) => {
        return { accounts: lol };
    }).catch((err) => {
        return { err: err };
    });
}

// *** alt delete ***
exports.altRemove = (request, h) => {
    return Altschema.findById(request.params.id).exec().then((lol) => {
        // console.log("lol msg: ", lol);
        // console.log("null bool status: ", !lol);
        // if (!lol) return { err: "entry not found"};      // this doesn't trigger err to be caught. this 'passes' tho it shouldn't
        if (lol === null) return err;
        lol.remove();
    }).then((data) => {
        // console.log("data: ", data);
        return { message: "entry deleted successfully" };
    }).catch((err) => {
        // console.log("error was caught")
        return { err: "entry not found" };
    })
}

/**
 * DELETE an entry
 */
exports.remove = (request, h) => {
    return Dataschema.findById(request.params.id).exec().then((lol) => {
        if (!lol) return { err: 'entry not found'};
        lol.remove();
    }).then((data) => {
        return { message: "entry deleted successfully" };
    }).catch((err) => {
        return { err: err };
    })
}

/**
 * PATCH an entry
 */
exports.update = (request, h) => {
    return Dataschema.findById(request.params.id).exec().then((lol) => {
        if (!lol) return { err: 'Entry not found' };
        lol.name = request.payload.name;
        lol.email = request.payload.email;
        lol.password = request.payload.password;
        lol.save(entryData);
    }).then((data) => {
        return { message: "Entry was updated successfully" };
    }).catch((err) => {
        return { err: err };
    })
}