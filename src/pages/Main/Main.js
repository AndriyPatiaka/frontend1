import React, {useEffect, useState} from "react";
import {isAuth} from "../../api/isAuth";

const Main=()=>{
    useEffect(()=>{
        if(!isAuth()){
            window.location.href='/login'
        }
    },[])
    const [width, setWitdh] = useState(1);
    const [height, setHeight] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false)
        setWitdh(window.innerWidth)
        setHeight(window.innerHeight)
    }, 3000)
    const [heightAll, setHeightAll] = useState(0);
    const [mixer,setMixer]=useState(false);
    const [waterHeight, setWaterHeight] = useState(0);
    const [oilHeight, setOilHeight] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isMouseDownWater, setIsMouseDownWater] = useState(false);
    const [isMouseDownClear, setIsMouseDownClear] = useState(false);
    const [colorR, setColorR] = useState(0);
    const [colorG, setColorG] = useState(0);
    const [colorB, setColorB] = useState(0);

    useEffect(() => {
        setHeightAll(waterHeight + oilHeight)
        setColorR((218 * oilHeight + 92 * waterHeight) / (waterHeight + oilHeight));
        setColorG((131 * oilHeight + 196 * waterHeight) / (waterHeight + oilHeight));
        setColorB((224 * waterHeight) / (waterHeight + oilHeight));
    }, [waterHeight, oilHeight])

    const handleMouseMove = () => {
        if (isMouseDown && heightAll <= 298) {
            setOilHeight(oilHeight + 2);
        }
    };

    const handleMouseUpWater = () => {
        setIsMouseDownWater(false);
    };
    const handleMouseDownWater = () => {
        setIsMouseDownWater(true);
    };

    const handleMouseMoveWater = () => {
        if (isMouseDownWater && heightAll <= 298) {
            setWaterHeight(waterHeight + 2);
        }
    };
    const handleMouseDown = () => {
        setIsMouseDown(true);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };
    const handleMouseDownClear = () => {
        setIsMouseDownClear(true);
    };

    const handleMouseUpClear = () => {
        setIsMouseDownClear(false);
    };
    return (
        <div className="App">
            <div className="footer"></div>
            <iframe src="https://phet.colorado.edu/sims/html/concentration/latest/concentration_en.html"
                    width={width}
                    height={height}
                    allowFullScreen
            >
            </iframe>
            {isLoading ?
                <div className="loading">LOADING
                </div> : <>
                </>}
            <div style={{display:'none'}}>
                <div className="chemie">
                    <div style={{position: "relative"}}>
                        <div className="oil my_btn"
                             onMouseDown={handleMouseDown}
                             onMouseMove={handleMouseMove}
                             onMouseUp={handleMouseUp}
                        >Oil
                        </div>
                        <svg fill="#000000" viewBox="0 0 24 24" id="pipe-2" width={200} height={200} data-name="Flat Line"
                             xmlns="http://www.w3.org/2000/svg"
                             className="icon flat-line first">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path id="secondary"
                                      d="M16,20H12a4,4,0,0,1-4-4V11H3V7H8a4,4,0,0,1,4,4v5h4V4h4V16A4,4,0,0,1,16,20Z"
                                      style={{fill: isMouseDown ? "#da8300" : "#fff", strokeWidth: 2}}></path>
                                <path id="primary"
                                      d="M16,20H12a4,4,0,0,1-4-4V11H3V7H8a4,4,0,0,1,4,4v5h4V4h4V16A4,4,0,0,1,16,20ZM3,12V6M15,4h6"
                                      style={{
                                          fill: "none",
                                          stroke: "#000000",
                                          strokeLinecap: "round",
                                          strokeLinejoin: "round",
                                          strokeWidth: 2
                                      }}></path>
                            </g>
                        </svg>
                    </div>
                    <div className="block_tank"
                         style={{borderTop: `solid 8px rgb(${heightAll / 300 * 255},${255 - heightAll / 300 * 255},${255 - heightAll / 300 * 255})`}}>
                        {mixer ?
                            <div className="block_tank__contain"
                                 style={{height: heightAll, background: `rgb(${colorR},${colorG},${colorB})`}}></div> :
                            <>
                                <div className="block_tank__contain"
                                     style={{height: oilHeight, background: `#da8300`}}></div>
                                <div className="block_tank__contain"
                                     style={{height: waterHeight, background: `#5cc4e0`}}></div>
                            </>

                        }
                    </div>
                    <div style={{position: "relative"}}>
                        <div className="water my_btn"
                             onMouseDown={handleMouseDownWater}
                             onMouseMove={handleMouseMoveWater}
                             onMouseUp={handleMouseUpWater}
                        >Water
                        </div>
                        <svg fill="#000000" viewBox="0 0 24 24" id="pipe-2" width={200} height={200} data-name="Flat Line"
                             xmlns="http://www.w3.org/2000/svg"
                             className="icon flat-line second">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path id="secondary"
                                      d="M16,20H12a4,4,0,0,1-4-4V11H3V7H8a4,4,0,0,1,4,4v5h4V4h4V16A4,4,0,0,1,16,20Z"
                                      style={{fill: isMouseDownWater ? "#2ca9bc" : "#fff", strokeWidth: 2}}></path>
                                <path id="primary"
                                      d="M16,20H12a4,4,0,0,1-4-4V11H3V7H8a4,4,0,0,1,4,4v5h4V4h4V16A4,4,0,0,1,16,20ZM3,12V6M15,4h6"
                                      style={{
                                          fill: "none",
                                          stroke: "#000000",
                                          strokeLinecap: "round",
                                          strokeLinejoin: "round",
                                          strokeWidth: 2
                                      }}></path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div>
                    <svg height="300px" width="300px" version="1.1" id="Layer_1" style={{marginTop: -200, marginLeft: 144}}
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512"
                         fill="#000000">
                        <g id="SVGRepo_iconCarrier">
                            <path style={{fill: "#FF675C"}}
                                  d="M179.677,453.168c0,28.102-22.78,50.882-50.882,50.882s-50.882-22.78-50.882-50.882 c0-28.102,50.882-93.284,50.882-93.284S179.677,425.066,179.677,453.168z"></path>
                            <path style={{fill: "#FAEC8E"}}
                                  d="M128.795,478.609c11.713,0,21.201-9.487,21.201-21.201s-21.201-42.402-21.201-42.402 s-21.201,30.688-21.201,42.402S117.082,478.609,128.795,478.609z"></path>
                        </g>
                    </svg>
                </div>

                <div className="my_btn clicked"
                     onMouseDown={handleMouseDownClear}
                     onMouseMove={() => {
                         if (isMouseDownClear) {
                             const water = waterHeight - (waterHeight / heightAll) * 2;
                             if (water >= 0) {
                                 setWaterHeight(waterHeight - (waterHeight / heightAll) * 2);
                             }
                             const oil = oilHeight - (oilHeight / heightAll) * 2
                             if (oil >= 0) {
                                 setOilHeight(oil)
                             }
                         }
                     }}
                     onMouseUp={handleMouseUpClear}>Clear
                </div>
                <div className="my_btn clicked"
                     onClick={() => setMixer(!mixer)}>Mixer
                </div>
            </div>
        </div>
    )
}
export default Main;