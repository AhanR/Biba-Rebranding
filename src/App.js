import './App.css';
import Slide from './components/slide';
import { useState, useEffect } from 'react';

function App() {

  //transition table
  const del = {
    1 :  { 0 : 2 , 1 : 3 },
    2 :  { 0 : 10, 1 : 6 },
    3 :  { 0 : 10, 1 : 6 },
    4 :  { 0 : 8 , 1 : 8 },
    5 :  { 0 : 8 , 1 : 9 },
    6 :  { 0 : 10, 1 : 6 },
    7 :  { 0 : 10, 1 : 6 },
    8 :  { 0 : 1 , 1 : 1 },
    9 :  { 0 : 8 , 1 : 8 },
    10 : { 0 : 12, 1 : 6 },
    11 : { 0 : 10, 1 : 6 },
    12 : { 0 : 4 , 1 : 5 },
    13 : { 0 : 10, 1 : 6 },
    14 : { 0 : 10, 1 : 6 },
  }

  const width = 389;
  const height = 710;

  const [currentIndex, setCurrentIndex] = useState(1);
  const [history, setHistory] = useState([])
  const slides = [
    (<Slide src="1" id = {1} key={"slide1"} style = {{width : width, height : height}} transition = {del} setCurrentSlide = {setCurrentIndex} buttons = {["yes", "no", "maybe"]}/>),
    (<Slide src="2" id = {2} key={"slide2"} style = {{width : width, height : height}} transition = {del} setCurrentSlide = {setCurrentIndex} buttons = {["yes1", "no1"]}/>),
    (<Slide src="3" id = {3} key={"slide3"} style = {{width : width, height : height}} transition = {del} setCurrentSlide = {setCurrentIndex} buttons = {["yes2", "no2"]}/>),
    (<Slide src="4" id = {4} key={"slide4"} style = {{width : width, height : height}} transition = {del} setCurrentSlide = {setCurrentIndex} buttons = {["yes2", "no2"]}/>),
    (<Slide src="5" id = {5} key={"slide5"} style = {{width : width, height : height}} transition = {del} setCurrentSlide = {setCurrentIndex} buttons = {["yes2", "no2"]}/>),
    (<Slide src="6" id = {6} key={"slide6"} style = {{width : width, height : height}} transition = {del} setCurrentSlide = {setCurrentIndex} buttons = {["yes2", "no2"]}/>),
    (<Slide src="7" id = {7} key={"slide7"} style = {{width : width, height : height}} transition = {del} setCurrentSlide = {setCurrentIndex} buttons = {["yes2", "no2"]}/>),
    (<Slide src="8" id = {8} key={"slide8"} style = {{width : width, height : height}} transition = {del} setCurrentSlide = {setCurrentIndex} buttons = {["yes2", "no2"]}/>),
    (<Slide src="9" id = {9} key={"slide9"} style = {{width : width, height : height}} transition = {del} setCurrentSlide = {setCurrentIndex} buttons = {["yes2", "no2"]}/>),
    (<Slide src="10" id = {10} key={"slide10"} style = {{width : width, height : height}} transition = {del} setCurrentSlide = {setCurrentIndex} buttons = {["yes2", "no2"]}/>),
    (<Slide src="11" id = {11} key={"slide11"} style = {{width : width, height : height}} transition = {del} setCurrentSlide = {setCurrentIndex} buttons = {["yes2", "no2"]}/>),
    (<Slide src="12" id = {12} key={"slide12"} style = {{width : width, height : height}} transition = {del} setCurrentSlide = {setCurrentIndex} buttons = {["yes2", "no2"]}/>),
  ]

  useEffect(() => {
    setHistory(hist => {
      return [...hist, currentIndex];
    })
  }, [currentIndex])
  

  return (
    <div className="App">
      <header style={{ position : "absolute", top : 0, left : 0, width : "100%", display : "flex", justifyContent : "space-between", padding : '1ch', boxSizing : "border-box"}} >
        <div className="left-caret"
          onClick={()=> {
            setCurrentIndex(history[Math.max(history.length - 2, 0)])
            setHistory(hist => {
              hist.pop()
              return hist;
            })
          }}
        ><img src={process.env.PUBLIC_URL+"/back.png"} alt="back" /></div>
        <div className="logo"><img src={process.env.PUBLIC_URL+"/biba-logo.png"} alt="logo" /></div>
      </header>
      {slides[currentIndex - 1]}
    </div>
  );
}

export default App;
