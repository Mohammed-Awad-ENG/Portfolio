import {
    javascript,
    typescript,
    html,
    css,
    reactjs,
    tailwind,
    nodejs,
    mongodb,
    git,
    cpp,
    python,
    sqlite,
    socket,
    express,
    threeDPortfolio,
    expenseTracker,
    openChat,
    linearProgrammingSolver,
    memoryBlocks,
} from "../assets";

export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "Project",
        title: "Project",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const technologies = [
    {
        name: "HTML 5",
        icon: html,
    },
    {
        name: "CSS 3",
        icon: css,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "TypeScript",
        icon: typescript,
    },
    {
        name: "React JS",
        icon: reactjs,
    },

    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "Node JS",
        icon: nodejs,
    },
    {
        name: "MongoDB",
        icon: mongodb,
    },
    {
        name: "git",
        icon: git,
    },
    {
        name: "C++",
        icon: cpp,
    },
    {
        name: "Python",
        icon: python,
    },
    {
        name: "SQLite",
        icon: sqlite,
    },
    {
        name: "Socket.IO",
        icon: socket,
    },
    {
        name: "Express.js",
        icon: express,
    },
];

const projects = [
    {
        name: "2D in 3D Portfolio",
        type: "Frontend",
        description:
            "Instead of a flat list of sections, everything lives inside an interactive 3D environment — you navigate around it, zoom in to bring a project or section into focus, and pull back out to see the bigger picture again. The content doesn't just sit on the screen, it exists somewhere, and part of the experience is discovering it as you move.",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "Styled-Components",
                color: "green-text-gradient",
            },
            {
                name: "Three.js",
                color: "pink-text-gradient",
            },
            {
                name: "Framer Motion",
                color: "orange-text-gradient",
            },
        ],
        image: threeDPortfolio,
        source_code_link:
            "https://github.com/Mohammed-Awad-ENG/2D-in-3D-portfolio-",
    },
    {
        name: "Expense Tracker",
        type: "Full Stack",
        description:
            "A simple and intuitive expense tracker application that allows users to track their expenses and manage their finances effectively. Users can add, edit, and delete expenses, categorize them, and view detailed reports and visualizations of their spending habits.",
        tags: [
            {
                name: "react",
                color: "blue-text-gradient",
            },
            {
                name: "Node.js",
                color: "green-text-gradient",
            },
            {
                name: "Express.js",
                color: "pink-text-gradient",
            },
            {
                name: "MongoDB",
                color: "orange-text-gradient",
            },
            {
                name: "Tailwind CSS",
                color: "blue-text-gradient",
            },
            {
                name: "recharts",
                color: "pink-text-gradient",
            },
        ],
        image: expenseTracker,
        source_code_link:
            "https://github.com/Mohammed-Awad-ENG/Expense-Tracker",
    },
    {
        name: "Open Chat",
        type: "Full Stack",
        description:
            "A real-time chat application that allows users to communicate with each other instantly. No login required. Users can join chat rooms, and send messages to other users in real-time. The application also supports features like message notifications and typing indicators.",
        tags: [
            {
                name: "Node.js",
                color: "blue-text-gradient",
            },
            {
                name: "MongoDB",
                color: "green-text-gradient",
            },
            {
                name: "css",
                color: "pink-text-gradient",
            },
            {
                name: "socket.io",
                color: "orange-text-gradient",
            },
            {
                name: "express.js",
                color: "blue-text-gradient",
            },
            {
                name: "cors",
                color: "pink-text-gradient",
            },
        ],
        image: openChat,
        source_code_link: "https://github.com/Mohammed-Awad-ENG/Open-Chat-v2",
    },
    {
        name: "Linear Programming Solver",
        type: "Frontend",
        description:
            "An interactive web-based Linear Programming Solver that uses the Simplex Method with the Big-M algorithm to solve linear optimization problems. Supports both maximization and minimization objectives with multiple constraints and decision variables.",
        tags: [
            {
                name: "HTML",
                color: "orange-text-gradient",
            },
            {
                name: "CSS",
                color: "pink-text-gradient",
            },
            {
                name: "JavaScript",
                color: "blue-text-gradient",
            },
        ],
        image: linearProgrammingSolver,
        source_code_link:
            "https://github.com/Mohammed-Awad-ENG/Linear-Programming-Solver",
    },
    {
        name: "Memory Blocks",
        type: "Frontend",
        description:
            "A simple memory game where players flip over pairs of matching cards. The game challenges players to remember the locations of the cards and find all the matching pairs in the least amount of time possible.",
        tags: [
            {
                name: "HTML",
                color: "orange-text-gradient",
            },
            {
                name: "CSS",
                color: "pink-text-gradient",
            },
            {
                name: "JavaScript",
                color: "blue-text-gradient",
            },
        ],
        image: memoryBlocks,
        source_code_link: "https://github.com/Mohammed-Awad-ENG/Block-Game",
    },
];

export { technologies, projects };
