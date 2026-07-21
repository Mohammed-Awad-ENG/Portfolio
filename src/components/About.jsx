import { motion } from "framer-motion";
import { styles } from "../styles";
import { textVariant, fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import FallingText from "./FallingText";

const About = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Introduction</p>
                <h2 className={styles.sectionHeadText}>Overview.</h2>
            </motion.div>

            <motion.div
                variants={fadeIn("", "", 0.1, 1)}
                className="m-4 text-secondary text-base leading-relaxed sm:text-lg md:text-[2rem] md:leading-[3.5rem]"
            >
                <FallingText
                    text={`I'm a full stack developer who truly believes in the value of life-long learning. Driven by a deep passion for JavaScript, React, and modern web development, I love where creativity, logic, and technology intersect. There's always something new to discover in this field, which keeps me constantly inspired. When I step away from my screen, I enjoy reading, staying fit, and playing video games.`}
                    highlightWords={[
                        "React",
                        "JavaScript",
                        "life-long",
                        "learning",
                        "web",
                        "development",
                        "full",
                        "stack",
                        "developer",
                    ]}
                    trigger="click"
                    backgroundColor="transparent"
                    wireframes={false}
                    gravity={0.56}
                    mouseConstraintStiffness={0.9}
                />
            </motion.div>
        </>
    );
};

export default SectionWrapper(About, "about");
