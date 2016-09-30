'use strict'
import random from './../node_modules/lodash/random.js';
import uniq from './../node_modules/lodash/uniq.js'
import _ from 'lodash';
export function IntervalPartition(dim, mindim) {
    const {width, heigth} = dim;
    const {minWidth, maxWidth, minHeigh, maxHeigh} = mindim;
    let partition = [];

    let RandomlyPartition = (a, b) => {
        if (Math.abs(a - b) < minWidth)
            return null;
        let point = _.random(a, b, false);
        if (Math.abs(point - a) > maxWidth)
            RandomlyPartition(a, point)
        else
            partiion.push(point);
        if (Math.abs(b - point) > maxWidth)
            RandomlyPartition(a, point)
        else
            partiion.push(point);
        }
    RandomlyPartition(width, heigth);

    return (_.uniq(partition)).sort((a, b) => a - b);

};
