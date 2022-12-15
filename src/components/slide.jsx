import React , {useState, useEffect} from 'react'
import { motion } from 'framer-motion';

export default function Slide(props) {
    //we get transition (del)
    //we get setCurrentSlide (setter)
    const speed = 0.15;
    const padding = 50;

    const initPos = [];
    const initTarget = [];

    const width = props.style.width;
    const height = props.style.height;

    const [buttonContent, setButtonContent] = useState(props.buttons);

    for(let i =0; i < buttonContent.length; i++) initPos.push({ "x" : (width - padding)*Math.random() - width/2, "y" : (height - padding)*Math.random() - height/2})
    
    for(let i =0; i < buttonContent.length; i++) {

        const x = Math.random() * speed;
        const y = Math.random() * speed;

        initTarget.push({ 
            "x" : x, 
            "y" : y
        })
    }

    const [buttonCoords, setButtonCoords] = useState(initPos);
    const [buttonTargets, setButtonTargets] = useState(initTarget);
    const [buttons, setButtons] = useState(makeButtons());

    function near(x,y = 10) {
        return x - x%y;
    }

    function randomButtonMovement() {

        setButtonCoords(cords => {
            for(let i = 0; i < cords.length; i++) {
                let cord = cords[i];
                cord['x'] = cord['x'] + buttonTargets[i]['x'];
                cord['y'] = cord['y'] + buttonTargets[i]['y'] ;
                cords[i] = cord;
            }
            return cords
        })

        setButtonTargets(targets => {
            for(let i = 0; i < targets.length; i++) {

                if(buttonCoords[i]['x'] < -width/2 + padding) {
                    setButtonCoords(cords => {
                        cords[i]['x'] = speed/2 - width/2 + padding;
                        return cords;
                    })
                    targets[i]['x'] = (targets[i]['x'] < 0)? -targets[i]['x']: targets[i]['x'];
                }
                else if(buttonCoords[i]['x'] > width/2 - padding) {
                    setButtonCoords(cords => {
                        cords[i]['x'] = width/2 - speed/2 - padding;
                        return cords;
                    })
                    targets[i]['x'] = (targets[i]['x'] > 0)? -targets[i]['x']: targets[i]['x'];
                }
                if(buttonCoords[i]['y'] < -height/2 + padding) {
                    targets[i]['y'] = (targets[i]['y'] < 0)? -targets[i]['y']: targets[i]['y'];
                    setButtonCoords(cords => {
                        cords[i]['y'] = -height/2 + speed/2 + padding;
                        return cords;
                    })
                }
                else if(buttonCoords[i]['y'] > height/2 - padding) {
                    targets[i]['y'] = (targets[i]['y'] > 0)? -targets[i]['y'] : targets[i]['y'];
                    setButtonCoords(cords => {
                        cords[i]['y'] = height/2 - speed/2 - padding;
                        return cords;
                    })
                }
            }

            return targets;
        })

        setButtons(makeButtons());

        requestAnimationFrame(randomButtonMovement);
    }

    useEffect(() => {randomButtonMovement()}, [])
    
    function makeButtons(){
        const buttons = [];
    
        for(let i = 0; i < buttonContent.length; i++) {
            buttons.push((
                <motion.div
                    key={props.id + "-" + i + "-btnframe-"+buttonCoords[i]['x'] + "-" + buttonCoords[i]['y']} 
                    className="choice-button"
                    initial = {{ x : buttonCoords[i]['x'], y : buttonCoords[i]['y']}}
                    animate = {{ x : buttonCoords[i]['x'], y : buttonCoords[i]['y']}}onClick={() => {
                        props.setCurrentSlide(x => props.transition[props.id][i])
                    }}
                    whileTap = { ()=> {
                        console.log("clicked "+i);
                        props.setCurrentSlide(props.transition[props.id][i]);
                    } }
                    >
                    <button
                        key={props.id + "-" + i + "-btn-"+buttonCoords[i]['x'] + "-" + buttonCoords[i]['y']}
                    >
                        {buttonContent[i]}
                    </button>
                </motion.div>
            ));
        }

        return buttons;
    }

  return (
    <div style={props.style} className="slide" >
        <img src={process.env.PUBLIC_URL + '/Slides/slide'+props.src+'.png'}/>

        {buttons.map(btn => btn)}
        
        {/* <button onClick={props.setCurrentSlide(props.transition[props.id][false])} className="flase-button" >No</button> */}
    </div>
  )
}