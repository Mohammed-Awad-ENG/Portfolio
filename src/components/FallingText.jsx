import { useRef, useState, useEffect } from "react";
import Matter from "matter-js";

const FallingText = ({
    text = "",
    highlightWords = [],
    trigger = "auto",
    backgroundColor = "transparent",
    wireframes = false,
    gravity = 1,
    mouseConstraintStiffness = 0.2,
}) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const canvasContainerRef = useRef(null);

    const [effectStarted, setEffectStarted] = useState(false);
    const [resetCount, setResetCount] = useState(0);

    useEffect(() => {
        if (!textRef.current) return;
        const words = text.split(" ");

        const newHTML = words
            .map((word) => {
                const isHighlighted = highlightWords.some((hw) =>
                    word.startsWith(hw),
                );
                return `<span
          class="inline-block mx-[2px] select-none ${isHighlighted ? "text-cyan-500 font-bold" : ""}"
        >
          ${word}
        </span>`;
            })
            .join(" ");

        textRef.current.innerHTML = newHTML;
    }, [text, highlightWords, resetCount]);

    useEffect(() => {
        if (trigger === "auto") {
            setEffectStarted(true);
            return;
        }
        if (trigger === "scroll" && containerRef.current) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setEffectStarted(true);
                        observer.disconnect();
                    }
                },
                { threshold: 0.1 },
            );
            observer.observe(containerRef.current);
            return () => observer.disconnect();
        }
    }, [trigger]);

    useEffect(() => {
        if (!effectStarted) return;

        const {
            Engine,
            Render,
            World,
            Bodies,
            Runner,
            Mouse,
            MouseConstraint,
        } = Matter;

        const containerRect = containerRef.current.getBoundingClientRect();
        const textRect = textRef.current.getBoundingClientRect();

        const width = containerRect.width;
        const height = containerRect.height;

        if (width <= 0 || height <= 0) return;

        containerRef.current.style.width = `${width}px`;
        containerRef.current.style.height = `${height}px`;

        textRef.current.style.width = `${textRect.width}px`;
        textRef.current.style.height = `${textRect.height}px`;

        const textOffsetLeft = textRect.left - containerRect.left;
        const textOffsetTop = textRect.top - containerRect.top;

        const engine = Engine.create();
        engine.world.gravity.y = gravity;

        const render = Render.create({
            element: canvasContainerRef.current,
            engine,
            options: {
                width,
                height,
                background: backgroundColor,
                wireframes,
            },
        });

        const boundaryOptions = {
            isStatic: true,
            render: { fillStyle: "transparent" },
        };

        const floor = Bodies.rectangle(
            width / 2,
            height + 20,
            width + 100,
            50,
            boundaryOptions,
        );
        const leftWall = Bodies.rectangle(
            -25,
            height / 2,
            50,
            height * 2,
            boundaryOptions,
        );
        const rightWall = Bodies.rectangle(
            width + 25,
            height / 2,
            50,
            height * 2,
            boundaryOptions,
        );
        const ceiling = Bodies.rectangle(
            width / 2,
            -25,
            width + 100,
            50,
            boundaryOptions,
        );

        const wordSpans = textRef.current.querySelectorAll("span");

        const wordBodies = [...wordSpans].map((elem) => {
            const rect = elem.getBoundingClientRect();

            const x = rect.left - containerRect.left + rect.width / 2;
            const y = rect.top - containerRect.top + rect.height / 2;

            const body = Bodies.rectangle(x, y, rect.width, rect.height, {
                render: { fillStyle: "transparent" },
                restitution: 0.8,
                frictionAir: 0.01,
                friction: 0.2,
            });
            Matter.Body.setVelocity(body, {
                x: (Math.random() - 0.5) * 5,
                y: 0,
            });
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

            return { elem, body };
        });

        wordBodies.forEach(({ elem, body }) => {
            elem.style.position = "absolute";
            elem.style.margin = "0px";

            const renderX = body.position.x - textOffsetLeft;
            const renderY = body.position.y - textOffsetTop;

            elem.style.left = `${renderX}px`;
            elem.style.top = `${renderY}px`;
            elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        });

        const mouse = Mouse.create(containerRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: mouseConstraintStiffness,
                render: { visible: false },
            },
        });
        render.mouse = mouse;

        World.add(engine.world, [
            floor,
            leftWall,
            rightWall,
            ceiling,
            mouseConstraint,
            ...wordBodies.map((wb) => wb.body),
        ]);

        const runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        let animationFrameId;
        const updateLoop = () => {
            wordBodies.forEach(({ body, elem }) => {
                const renderX = body.position.x - textOffsetLeft;
                const renderY = body.position.y - textOffsetTop;

                elem.style.left = `${renderX}px`;
                elem.style.top = `${renderY}px`;
                elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
            });
            Matter.Engine.update(engine);
            animationFrameId = requestAnimationFrame(updateLoop);
        };
        updateLoop();

        return () => {
            cancelAnimationFrame(animationFrameId);
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas && canvasContainerRef.current) {
                canvasContainerRef.current.removeChild(render.canvas);
            }
            World.clear(engine.world);
            Engine.clear(engine);

            if (containerRef.current) {
                containerRef.current.style.width = "";
                containerRef.current.style.height = "";
            }
            if (textRef.current) {
                textRef.current.style.width = "";
                textRef.current.style.height = "";
            }
        };
    }, [
        effectStarted,
        gravity,
        wireframes,
        backgroundColor,
        mouseConstraintStiffness,
    ]);

    const handleTrigger = () => {
        if (!effectStarted && (trigger === "click" || trigger === "hover")) {
            setEffectStarted(true);
        }
    };

    const handleReset = (e) => {
        e.stopPropagation();
        setEffectStarted(false);
        setResetCount((prev) => prev + 1);
    };

    return (
        <div className="relative w-full">
            {effectStarted && (
                <button
                    onClick={handleReset}
                    className="absolute -top-10 right-2 z-50 group flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full bg-[#141414] shadow-[0_0_0_3px_rgba(145,94,255,0.3)] transition-all duration-300 hover:w-[110px] hover:rounded-[50px] hover:bg-[#06b6d4]"
                >
                    <svg
                        className="h-4 w-4 fill-white transition-transform duration-300 group-hover:-translate-y-[200%]"
                        viewBox="0 0 512 512"
                    >
                        <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 86.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
                    </svg>

                    <span className="absolute text-[0px] font-semibold text-white opacity-0 transition-all duration-300 group-hover:text-[12px] group-hover:opacity-100">
                        Reset Text
                    </span>
                </button>
            )}

            <div
                ref={containerRef}
                className="relative z-[1] w-full h-full cursor-pointer text-left md:text-justify md:[word-spacing:-4px] pt-8 overflow-hidden min-w-fit min-h-[500px]"
                onClick={trigger === "click" ? handleTrigger : undefined}
                onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
            >
                <div
                    ref={textRef}
                    className="inline-block relative z-10"
                    style={{
                        lineHeight: 1.4,
                    }}
                />

                <div
                    className="absolute top-0 left-0 z-0"
                    ref={canvasContainerRef}
                />
            </div>
        </div>
    );
};

export default FallingText;
