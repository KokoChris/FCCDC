'use strict'
import random from './../node_modules/lodash/random.js';
import uniq from './../node_modules/lodash/uniq.js'
function dist(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function Spread(beta, alpha) {

    const dify = Math.abs(beta.y) - Math.abs(alpha.y) - alpha.height;
    const difx = Math.abs(beta.x) - Math.abs(alpha.x) - alpha.width;
    let newBeta = beta;
    let sign = {};
    if ((dify <= 0) && (difx <= 0)) {
        sign.x = ((beta.x < 0) || (alpha.x < 0))
            ? (-1)
            : 1;
        sign.y = ((beta.y < 0) || (alpha.y < 0))
            ? (-1)
            : 1;

        if (difx > dify)
            newBeta.x = sign.x * (beta.x * sign.x - difx + _.random(10, 30));
        else
            newBeta.y = sign.y * (beta.y * sign.y - dify + _.random(10, 30));

        }

    return newBeta;
    return beta;
};


function RadialSpread(beta, alpha) {
    const dify = Math.abs(beta.y) - Math.abs(alpha.y) - alpha.height;
    const difx = Math.abs(beta.x) - Math.abs(alpha.x) - alpha.width;
    let newRoom = beta;

    if ((dify <= 0) && (difx <= 0)) {

        /// Radial coordinates
        const betaPhi = Math.atan2(beta.y, beta.x);
        const betaRadius = Math.sqrt(beta.x * beta.x + beta.y * beta.y);

        const alphaDiameter = Math.sqrt(alpha.x * alpha.x + alpha.y * alpha.y);

        newRoom.x = (betaRadius + alphaDiameter) * Math.cos(betaPhi);
        newRoom.y = (betaRadius + alphaDiameter) * Math.sin(betaPhi);

    }
    return newRoom

};
