var express = require('express');
var app = express();
var session = require('express-session');
function check(req) {
    if(!req.session){
        return false;
    }
    if(!req.session.username){
        return false;
    }
    return true;
};
exports.check = check;
