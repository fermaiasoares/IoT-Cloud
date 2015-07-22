var express = require('express');
var config = require('../config');
var DevicesRouter = express.Router();
var UserModel = require('../models/user');
var DeviceModel = require('../models/device');

String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
};
//�Ƿ���֤��U-ApiKey
function isAuthenticated(req, res, next) {
    var userkey = req.get('U-ApiKey');
    UserModel.findOne({ ukey: userkey }, function (err, u) {
        if (u !== null) {
            req.ukey = userkey;
            next();
        } else {
            res.status(412);
            res.end();
        }
    });
}

DevicesRouter.route('/devices')
    .get(function (req, res) {
        res.json({'method': 'get'});
})
    .post(function (req, res) {
        var device = new DeviceModel(req.body);
        device.save(function (err, ndv) {
            if(err) {
                if(!config.production) {
                    res.send(err);
                } else {
                    res.status(404);
                    res.end();
                }
            } else {
                res.json({'method': 'post'});
            }
        })
});
function putDevice (req, res) {
    if(config.mongo.toString().startWith('tingodb')) {
        DeviceModel.findone({ id: req.params.id }, function (err, dv) {
            if(err) return console.error('DeviceModel Error: ' + err);

        })
    }
}
DevicesRouter.route('/devices/:id')
    .post(function (req, res) {
        if (req.query.method === 'put') {

        }
    })
module.exports = DevicesRouter;