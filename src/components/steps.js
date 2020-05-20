import React from 'react';
import './steps.css';


function Steps({recipeData}) {
    
    var i = 0;

    return (
        <div id="steps">
            {recipeData.map( step => {
                return (
                <div className="steps" key={Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}>
                    <div className='steps-text' key={Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}>
                        <h4>Step {i+=1}</h4>
                        <p>{step[0]}</p>
                    </div>
                    
                    {step[1] === "no image"? "":            
                    <div className='steps-image' key={Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}> 
                        <img src={step[1]} alt="delicous" /> 
                    </div>}  
                </div>
                )}
            )}
        </div>
    );
  }
  
  export default Steps;