import { Html, useProgress } from "@react-three/drei";
import styled from "styled-components";

const CanvasLoader = () => {
    const { progress } = useProgress();

    return (
        <Html
            as="div"
            center
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <StyledWrapper>
                <div className="cube-loader">
                    <div className="cube-top" />
                    <div className="cube-wrapper">
                        <span className="cube-span" style={{ "--i": 0 }} />
                        <span className="cube-span" style={{ "--i": 1 }} />
                        <span className="cube-span" style={{ "--i": 2 }} />
                        <span className="cube-span" style={{ "--i": 3 }} />
                    </div>
                </div>
            </StyledWrapper>

            <p
                style={{
                    fontSize: 14,
                    color: "#F1F1F1",
                    fontWeight: 800,
                    marginTop: 40,
                }}
            >
                {progress.toFixed(2)}%
            </p>
        </Html>
    );
};

const StyledWrapper = styled.div`
    .cube-loader {
        position: relative;
        width: 50px;
        height: 50px;
        transform-style: preserve-3d;
        transform: rotateX(-30deg);
        animation: animate 4s linear infinite;
    }

    @keyframes animate {
        0% {
            transform: rotateX(-30deg) rotateY(0);
        }

        100% {
            transform: rotateX(-30deg) rotateY(360deg);
        }
    }

    .cube-loader .cube-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
    }

    .cube-loader .cube-wrapper .cube-span {
        position: absolute;
        width: 100%;
        height: 100%;
        transform: rotateY(calc(90deg * var(--i))) translateZ(25px);
        background: linear-gradient(
            to bottom,
            hsl(0, 0%, 100%) 0%,
            hsl(0, 0%, 100%) 5.5%,
            hsl(0, 0%, 100%) 12.1%,
            hsl(0, 0%, 0%) 100%,
            hsl(0, 0%, 100%) 27.9%,
            hsl(0, 0%, 100%) 36.6%,
            hsl(0, 0%, 100%) 45.6%,
            hsl(0, 0%, 0%) 100%,
            hsl(0, 0%, 100%) 63.4%,
            hsl(0, 0%, 100%) 71.7%,
            hsl(0, 0%, 100%) 79.4%,
            hsl(0, 0%, 0%) 100%,
            hsl(0, 0%, 100%) 100%,
            hsl(0, 0%, 100%) 100%,
            hsl(0, 0%, 100%) 100%,
            hsl(0, 0%, 0%) 100%
        );
    }

    .cube-top {
        position: absolute;
        width: 50px;
        height: 50px;
        background: hsl(0, 0%, 98%) 0%;
        transform: rotateX(90deg) translateZ(25px);
        transform-style: preserve-3d;
    }

    .cube-top::before {
        content: "";
        position: absolute;
        width: 50px;
        height: 50px;
        background: hsl(0, 0%, 33%) 19.6%;
        transform: translateZ(-90px);
        filter: blur(10px);
        box-shadow:
            0 0 10px #ffffff,
            0 0 20px hsl(0, 0%, 0%) 19.6%,
            0 0 30px #ffffff,
            0 0 40px hsl(0, 0%, 0%) 19.6%;
    }
`;

export default CanvasLoader;
