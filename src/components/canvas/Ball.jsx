import {
    View,
    Decal,
    Float,
    OrbitControls,
    Preload,
    useTexture,
    Environment,
    PerspectiveCamera,
} from "@react-three/drei";
import CanvasLoader from "../Loader";
import { Suspense, useState, useEffect, useRef } from "react";

const Ball = ({ imgUrl }) => {
    const [decal] = useTexture([imgUrl]);
    const [style, setStyle] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setStyle((prev) => (prev === 4 ? 1 : prev + 1));
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const needsEnvironment = style === 3 || style === 4;

    return (
        <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
            <ambientLight intensity={0.25} />
            <directionalLight position={[0, 0, 0.05]} />

            {needsEnvironment && <Environment preset="city" />}

            <mesh castShadow receiveShadow scale={2.75}>
                {style === 1 ? (
                    <>
                        <icosahedronGeometry args={[1, 1]} />
                        <meshStandardMaterial
                            color="#fff8eb"
                            polygonOffset
                            polygonOffsetFactor={-5}
                            flatShading
                        />
                    </>
                ) : (
                    <>
                        <sphereGeometry args={[1, 32, 32]} />

                        {style === 2 && (
                            <meshStandardMaterial
                                color="#e0e0e0"
                                roughness={0.8}
                                metalness={0.1}
                                polygonOffset
                                polygonOffsetFactor={-5}
                            />
                        )}
                        {style === 3 && (
                            <meshStandardMaterial
                                color="#ffffff"
                                roughness={0.1}
                                metalness={0.9}
                                polygonOffset
                                polygonOffsetFactor={-5}
                            />
                        )}
                        {style === 4 && (
                            <meshPhysicalMaterial
                                color="#ffffff"
                                transmission={1}
                                opacity={1}
                                metalness={0}
                                roughness={0.2}
                                ior={1.5}
                                thickness={2}
                                polygonOffset
                                polygonOffsetFactor={-5}
                            />
                        )}
                    </>
                )}

                <Decal
                    position={[0, 0, 1]}
                    rotation={[2 * Math.PI, 0, 6.25]}
                    map={decal}
                    flatShading={style === 1}
                />
            </mesh>
        </Float>
    );
};

const BallCanvas = ({ icon }) => {
    const viewRef = useRef(null);
    const [domNode, setDomNode] = useState(null);

    useEffect(() => {
        if (viewRef.current) {
            setDomNode(viewRef.current);
        }
    }, []);

    return (
        <div
            ref={viewRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
        >
            <View track={viewRef} className="w-full h-full">
                <Suspense fallback={<CanvasLoader />}>
                    <PerspectiveCamera
                        makeDefault
                        position={[0, 0, 5]}
                        fov={75}
                    />

                    {domNode && (
                        <OrbitControls
                            makeDefault
                            enableZoom={false}
                            domElement={domNode}
                        />
                    )}

                    <Ball imgUrl={icon} />
                </Suspense>
                <Preload all />
            </View>
        </div>
    );
};
export default BallCanvas;
