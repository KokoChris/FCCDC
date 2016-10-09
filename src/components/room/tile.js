import React from 'react';

/**
 *
 * @param characteristiscs passed as props includes dimensions and positioning for the rect
 * returns a rect svg element
 *
 */

const Tile = (characteristics) => {
    return (
            <rect {...characteristics} >
            </rect>
    )



};


export default Tile
