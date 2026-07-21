import { BrowserRouter } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { useRef } from "react";
import {
    About,
    Contact,
    Hero,
    Navbar,
    Tech,
    Project,
    StarsCanvas,
    AstronautCanvas,
    GridScan,
} from "./components";

function App() {
    const mainContainerRef = useRef();

    return (
        <BrowserRouter>
            <div ref={mainContainerRef} className="relative z-0 bg-primary">
                <div className="relative w-full h-screen bg-[#050816]">
                    <div className="absolute inset-0 z-0">
                        <GridScan
                            enableWebcam={false} 
                            scanColor="#915eff" 
                            linesColor="#2F293A"
                            gridScale={0.1}
                            className="w-full h-full"
                        />
                    </div>

                    <div className="relative z-10 pointer-events-none h-full">
                        <div className="pointer-events-auto">
                            <Navbar />
                        </div>

                        <Hero />
                    </div>
                </div>

                <div className="relative z-0">
                    <div className="relative w-full">
                        <div className="absolute inset-0 pointer-events-none z-[-1]">
                            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                                <AstronautCanvas />
                            </div>
                        </div>

                        <About />
                        <Project />
                        <Tech />
                        <Contact />
                        <StarsCanvas />
                    </div>
                </div>

                <Canvas
                    className="pointer-events-none"
                    style={{
                        position: "fixed",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: "100vw",
                        height: "100vh",
                        zIndex: 9999,
                    }}
                    eventSource={mainContainerRef}
                    frameloop="always"
                >
                    <View.Port />
                </Canvas>
            </div>
        </BrowserRouter>
    );
}

export default App;
