import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ProjectTimelineCard = ({ project }) => {
    return (
        <VerticalTimelineElement
            contentStyle={{
                background: "#1d1836",
                color: "#fff",
            }}
            contentArrowStyle={{ borderRight: "7px solid #232631" }}
            date={project.type}
            iconStyle={{ background: "#383E56", cursor: "pointer" }}
            iconOnClick={() => window.open(project.source_code_link, "_blank")}
            icon={
                <div className="flex justify-center items-center w-full h-full">
                    <img
                        src={project.image}
                        alt={project.name}
                        className="w-[90%] h-[90%] object-cover rounded-full"
                    />
                </div>
            }
        >
            <div>
                <h3 className="text-white text-[24px] font-bold">
                    {project.name}
                </h3>
                <p className="text-secondary text-[16px] font-semibold mt-2">
                    {project.description}
                </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                    <span
                        key={`${project.name}-${tag.name}-${index}`}
                        className={`text-[13px] ${tag.color}`}
                    >
                        #{tag.name}
                    </span>
                ))}
            </div>
        </VerticalTimelineElement>
    );
};

const Project = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText} text-center`}>
                    My work
                </p>
                <h2 className={`${styles.sectionHeadText} text-center`}>
                    Projects.
                </h2>
            </motion.div>

            <div className="mt-20 flex flex-col">
                <VerticalTimeline>
                    {projects.map((project, index) => (
                        <ProjectTimelineCard
                            key={`project-${index}`}
                            project={project}
                        />
                    ))}
                </VerticalTimeline>
            </div>
        </>
    );
};

export default SectionWrapper(Project, "Project");
