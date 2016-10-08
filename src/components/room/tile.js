import React from 'react';

/**
 *
 * @param characteristiscs passed as props includes dimenisons and positioning for the rect
 * returns a rectangle
 *
 */

const Tile = (characteristics) => {
    return (

            <rect {...characteristics} >
            </rect>


    )



};


export default Tile
