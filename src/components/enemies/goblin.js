import React ,{PropTypes}from 'react';

const Goblin = (props) => {

    let { characteristics } = props;

    return (
        <rect {...characteristics}></rect>
    );
};


Goblin.propTypes = {
    characteristics: PropTypes.object.isRequired
};
export default Goblin;