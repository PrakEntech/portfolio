const resumeData = {
    personalInfo: {
        name: "Prakhar Srivastava",
        role: "Full-Stack Engineer | React & Serverless Systems",
        location: "Bengaluru, Karnataka",
        phone: "+91 6203555484",
        email: "prakhartech983@gmail.com",
        github: "PrakEntech",
        linkedin: "prakhar-srivastava-3210641ba",
    },

    summary: "Full-Stack Engineer with 1+ years of experience building and shipping secure, production-grade web systems. Owned end-to-end delivery of a QR-based field operations PWA — from development to CI/CD automation, security hardening, and independent production releases. Specialized in React, Firebase serverless architecture, and designing systems with strong security and operational reliability.",

    education: [
        {
            degree: "BSc in Computer Science, Mathematics, Electronics",
            institution: "Christ University",
            period: "2021 - 2024",
            grade: "CGPA: 3.0 / 4.0",
        },
        {
            degree: "Class X - XII",
            institution: "Delhi Public School",
            period: "2019 - 2021",
            grade: "CGPA: 9.0 / 10.0",
        }
    ],

    skills: [
        { category: "Frontend", items: ["React.js", "JavaScript", "PWA Patterns", "Client-side Caching"] },
        { category: "Backend & Serverless", items: ["Firebase Cloud Functions", "Event-driven Architecture", "Node.js", "Python", "Flask"] },
        { category: "Databases & Cloud", items: ["Firebase Realtime Database", "Firebase Storage", "Firebase Auth", "Google Cloud Platform (GCP)"] },
        { category: "Security Engineering", items: ["Signed URLs", "Upload Throttling", "Storage Path Isolation", "RTDB Security Rules", "IAM", "Abuse Monitoring"] },
        { category: "CI/CD & DevOps", items: ["Jenkins", "GitHub Actions", "Multi-environment Deployments", "Secrets Management", "Shell Scripting"] },
        { category: "Languages", items: ["JavaScript", "Python", "Java", "Kotlin", "Dart", "C"] },
        { category: "Integrations & APIs", items: ["Google Maps Reverse Geocoding API", "Mautic CRM", "Dropbox API"] },
        { category: "Engineering Productivity", items: ["AI-assisted Development Workflows", "Rapid POC Development", "Prompt-guided Debugging", "Technical Documentation Generation"] },
        { category: "Quality & Tooling", items: ["SonarQube", "Edge-case Testing", "System Design Documentation", "Deployment Documentation"] },
    ],

    experience: [
        {
            company: "Weberon",
            role: "Software Developer",
            period: "Aug 2024 - Present",
            internPeriod: "Intern: Aug 2024 - Jan 2025",
            fullTimePeriod: "Full-Time: Feb 2025 - Present",
            type: "featured",
            overview: "Owned end-to-end delivery of the Delivery Tracker — a production QR-based field operations system. Led development, security hardening, CI/CD automation, and independent multi-environment production releases.",

            groups: [
                {
                    label: "Product & Architecture",
                    bullets: [
                        "Architected and shipped a QR-based delivery tracking Progressive Web App (PWA) using React and Firebase, taking the system from proof-of-concept to stable production deployment.",
                        "Designed a fully serverless architecture using Firebase Authentication, Realtime Database, Storage, and event-driven Cloud Functions — eliminating public HTTP endpoints to reduce attack surface.",
                        "Established isolated multi-environment deployments (Developer, Alpha, Blue, Production) with independent Firebase projects and environment-specific configurations."
                    ]
                },
                {
                    label: "Frontend Engineering",
                    bullets: [
                        "Built a production-grade React PWA featuring secure authentication flows, real-time dashboards, client-side QR scanning, structured address validation/editing, image capture/upload workflows, and local caching to prevent duplicate scans.",
                        "Implemented offline-ready PWA patterns including service workers, caching strategies, and install prompts to ensure reliable field usage on mobile devices."
                    ]
                },
                {
                    label: "Security Engineering",
                    bullets: [
                        "Engineered a secure image upload pipeline using short-lived signed URLs, upload attempt throttling (max 3 attempts), and user-isolated Storage paths to enforce strict data separation and abuse prevention.",
                        "Strengthened production security during migration from Firebase Spark to Blaze by implementing strict RTDB security rules, automated abuse alerts, and real-time database lockdown safeguards.",
                        "Performed structured edge-case and abuse-path validation to test upload protection, rule enforcement, and cross-environment isolation."
                    ]
                },
                {
                    label: "Integrations",
                    bullets: [
                        "Integrated Google Maps Reverse Geocoding API to automatically resolve structured addresses from GPS coordinates during field scans.",
                        "Integrated Mautic CRM for bidirectional address synchronisation, ensuring delivery records remained consistent with CRM data.",
                        "Developed a custom Mautic plugin for trackable URL generation, working directly with plugin architecture, internal hooks, and API workflows.",
                        "Automated Postcard PDF generation with structured grid layouts and integrated Dropbox API for secure file storage and distribution."
                    ]
                },
                {
                    label: "CI/CD & DevOps",
                    bullets: [
                        "Designed and maintained CI/CD pipelines using Jenkins and GitHub Actions for automated, environment-aware deployments with secure secret handling.",
                        "Built shell-based deployment automation covering versioning strategies, environment promotion workflows, and independent production release management."
                    ]
                },
                {
                    label: "Documentation & Quality",
                    bullets: [
                        "Authored comprehensive system design, usage, and deployment documentation to improve maintainability and onboarding efficiency.",
                        "Used SonarQube to proactively identify and resolve code quality issues before review cycles.",
                        "Conducted structured manual and edge-case testing to ensure production readiness before each release."
                    ]
                },
                {
                    label: "Professional Growth",
                    bullets: [
                        "Progressed from intern to independently owning a production through hands-on architectural decision-making and delivery ownership.",
                        "Leveraged AI-assisted engineering workflows to accelerate documentation comprehension, solution exploration, and iteration speed."
                    ]
                },
            ]
        },

        {
            company: "TerraviewOS",
            role: "Backend Intern",
            period: "June 2022 - Oct 2022",
            type: "intern",
            bullets: [
                "Collaborated with backend engineers to develop secure, scalable solutions for collaborative business platforms.",
                "Built and optimized REST API using Python and Flask, improving response performance and maintainability.",
                "Improved internal technical documentation quality across backend services."
            ]
        }
    ],

    projects: [
        {
            name: "Delivery Tracker",
            description: "Production QR-based field operations PWA with full lifecycle ownership — React frontend, serverless Firebase backend, secure image uploads via signed URLs, multi-environment CI/CD automation, and security-hardened architecture.",
            tech: ["React.js", "Firebase", "PWA", "Jenkins", "GitHub Actions", "GCP"],
            highlight: true,
            links: [
                { label: "Frontend", url: "https://github.com/PrakEntech/deliveryTracker" },
                { label: "Functions", url: "https://github.com/PrakEntech/deliveryTracker-functions" },
            ],
        },
        {
            name: "Mautic Trackable URL Plugin",
            description: "Custom Mautic CRM plugin for generating trackable URLs with automated Jenkins-based deployments, built using PHP with deep integration into Mautic's plugin architecture and event system.",
            tech: ["PHP", "Mautic", "Jenkins", "API Development"],
        },
        {
            name: "Virtual Card Holder",
            description: "Flutter mobile app for managing digital visiting cards, featuring manual entry, OCR-based card scanning, contact editing, and persistent local database storage.",
            tech: ["Flutter", "Dart", "SQLite"],
            links: [
                { label: "GitHub", url: "https://github.com/PrakEntech/VirtualCardHolder" },
            ],
        },
        {
            name: "Music Streaming App",
            description: "Spotify-inspired cross-platform mobile application featuring gesture-based controls, media library management, and favourites built using React Native and Firebase.",
            tech: ["Java"],
            links: [
                { label: "GitHub", url: "https://github.com/PrakEntech/MusicStreamingApp" },
            ],
        },
        {
            name: "Word Hurdle Game",
            description: "Wordle-inspired puzzle game with dynamic color-coded feedback, difficulty scaling, and responsive UI built using Flutter and Dart.",
            tech: ["Flutter", "Dart"],
            links: [
                { label: "GitHub", url: "https://github.com/PrakEntech/WordHurdleGame" },
            ],
        },
        {
            name: "Scitrix Module",
            description: "Standalone Python library for advanced matrix and linear algebra computations designed for modular usage and reusability.",
            tech: ["Python"],
            links: [
                { label: "GitHub", url: "https://github.com/PrakEntech/scitrix" },
                { label: "PyPI", url: "https://pypi.org/project/scitrix/" },
            ],
        }
    ]
};

export default resumeData;
