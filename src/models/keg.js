var db = require('../services/firebase');

exports.findAll = function() {
    return new Promise(function(resolve) {
        var ref = db.ref('/kegs');
        ref.once("value").then(function(snap) {
            var kegs = snap.val();
            resolve(kegs);
        });
    });
}

exports.find = function(id) {
    return new Promise(function(resolve, reject) {
        var ref = db.ref(`/kegs/${id}`);
        ref.once("value").then(function(snap) {
            var keg = snap.val();
            if (keg) {
                keg['key'] = snap.key;
                resolve(keg);
            } else {
                reject(new Error('Keg not found.'));
            }
        });
    })
}

exports.create = function(keg) {
    return new Promise(function(resolve) {
        var ref = db.ref('/kegs');
        ref.push().set(keg).then(function(snap){
            resolve(snap);
        });
    })
}

exports.delete = function(id) {
    return new Promise(function(resolve) {
        var ref = db.ref(`/kegs/${id}`);
        ref.remove().then(function(snap) {
            resolve(snap);
        });
    })
}