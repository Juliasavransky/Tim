import React, { useState, useRef } from 'react';
import Confetti from 'react-confetti'
import './success.css';

export default function Success() {
    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);
    const confettiRef = useRef(null);

    return (
        <>
            <h1 className="confetti-wrap" ref={confettiRef} >

               <div id="success" className="shadows">Congratulations!</div> 
                <div className="shadows">welcome to TIM-Time Bank</div>
            </h1>


            <Confetti
                numberOfPieces={280}
                width={width}
                height={height}
            />
        </>
    );
};

