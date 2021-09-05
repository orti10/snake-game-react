import React from 'react';

export default (props) => {
    return(
        <div>
            {/* uesing the map mathod to look throw all the dots */}
            {props.snakeDots.map((dot,i) => {
                const style = {
                    // X axis
                    left: `${dot[0]}%`,

                    // Y axis
                    top: `${dot[1]}%`
                }
                return(
                    <div className = "snake-dot" key = {i} style = {style}></div>    
                )
            })}
        </div>
    )
}

// {/* each snake dot should have it's unique set coordinates */}
// <div className = "snake-dot" style={{top:0,left:0}}></div>
// <div className = "snake-dot" style={{top:0,left:'2%'}}></div>
// <div className = "snake-dot" style={{top:0,left:'4%'}}></div>
