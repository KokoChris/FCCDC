import React from 'react';


const StatBox = (props) => {

    return (
        <div>
            <p>Health: {props.health} </p>
            <p>Level:  {props.level}  </p>
            <p>Attack: {props.attack} </p>

        </div>
    )
};

export default StatBox;