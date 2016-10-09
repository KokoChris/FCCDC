import React ,{PropTypes}from 'react';

const Character = (props) => {

    let { characteristics } = props;

    return (
            <rect {...characteristics}></rect>
    );
};


Character.propTypes = {
    characteristics: PropTypes.object.isRequired
};
export default Character;