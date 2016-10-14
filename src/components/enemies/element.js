import React ,{PropTypes}from 'react';

const Element = (props) => {

    let { characteristics } = props;
    return (
        <rect {...characteristics}></rect>
    );
};

Element.propTypes = {
    characteristics: PropTypes.object.isRequired
};
export default Element;