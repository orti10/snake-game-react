import React from 'react';
import { findDOMNode } from 'react-dom';

export default (props) =>{

    // the food have it's own set of coordinates
    const style = {

        //pass coordinates throw the props.dot
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }
    return(
        <div className = "snake-food" style = {style}></div>
    )
}