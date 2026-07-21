import {
    Preload,
    useGLTF,
    useAnimations,
    useTexture,
    Center,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useState, useRef } from "react";
import * as THREE from "three";
import CanvasLoader from "../Loader";

const Astronaut = ({ isMobile }) => {
    const groupRef = useRef();
    const processedRef = useRef(false);

    const { scene, animations } = useGLTF("/floating_astronaut/scene.gltf");
    const { actions, names } = useAnimations(animations, groupRef);
    const [diffuse0, normal0, occ0, diffuse2, normal2, occ2] = useTexture([
        "/floating_astronaut/textures/material_0_diffuse.png",
        "/floating_astronaut/textures/material_0_normal.png",
        "/floating_astronaut/textures/material_0_occlusion.png",
        "/floating_astronaut/textures/material_2_diffuse.png",
        "/floating_astronaut/textures/material_2_normal.png",
        "/floating_astronaut/textures/material_2_occlusion.png",
    ]);

    useLayoutEffect(() => {
        if (processedRef.current) return;
        processedRef.current = true;

        const textures = [
            { tex: diffuse0, space: THREE.SRGBColorSpace },
            { tex: normal0, space: THREE.LinearSRGBColorSpace },
            { tex: occ0, space: THREE.LinearSRGBColorSpace },
            { tex: diffuse2, space: THREE.SRGBColorSpace },
            { tex: normal2, space: THREE.LinearSRGBColorSpace },
            { tex: occ2, space: THREE.LinearSRGBColorSpace },
        ];

        textures.forEach(({ tex, space }) => {
            tex.flipY = false;
            tex.colorSpace = space;
            tex.needsUpdate = true;
        });

        const mat0 = new THREE.MeshStandardMaterial({
            map: diffuse0,
            normalMap: normal0,
            aoMap: occ0,
            roughness: 0.8,
            metalness: 0.2,
        });

        const mat2 = new THREE.MeshStandardMaterial({
            map: diffuse2,
            normalMap: normal2,
            aoMap: occ2,
            roughness: 0.8,
            metalness: 0.2,
        });

        scene.traverse((child) => {
            if (child.isMesh) {
                if (
                    !child.geometry.attributes.uv2 &&
                    child.geometry.attributes.uv
                ) {
                    child.geometry.setAttribute(
                        "uv2",
                        child.geometry.attributes.uv,
                    );
                }

                if (child.material.name === "material_0") {
                    child.material = mat0;
                } else if (child.material.name === "material_2") {
                    child.material = mat2;
                }
            }
        });
    }, [scene, diffuse0, normal0, occ0, diffuse2, normal2, occ2]);

    useEffect(() => {
        if (names.length > 0) {
            const action = actions[names[0]];
            action.reset().fadeIn(0.5).play();
        }
    }, [actions, names]);

    useFrame((state) => {
        if (groupRef.current) {
            const t = state.clock.getElapsedTime();
            groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.04;
            groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.02;
            groupRef.current.position.y = -0.9 + Math.sin(t * 0.8) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <ambientLight intensity={1.5} />
            <directionalLight
                intensity={2.0}
                position={[5, 8, 5]}
                color="#b0c4ff"
            />
            <directionalLight
                intensity={1.0}
                position={[-5, 3, -5]}
                color="#915eff"
            />
            <pointLight intensity={1.0} position={[0, -3, 3]} color="#ffffff" />

            <Center scale={isMobile ? 1.6 : 2}>
                <primitive object={scene} rotation={[0.1, -0.3, 0]} />
            </Center>
        </group>
    );
};

const AstronautCanvas = () => {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia("(max-width: 600px)").matches;
        }
        return false;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 600px)");
        const handleMediaQueryChange = (event) => setIsMobile(event.matches);
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        return () =>
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }, []);

    return (
        <div
            style={{
                width: "min(80vw, 500px)",
                height: "95vh",
            }}
        >
            <Canvas
                frameloop="always"
                camera={{ position: [0, 0, 14], fov: 38 }}
                gl={{ alpha: true, antialias: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
                style={{ background: "transparent", pointerEvents: "none" }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <Astronaut isMobile={isMobile} />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
};

export default AstronautCanvas;
