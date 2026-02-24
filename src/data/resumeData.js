export const resumeData = {
    personalInfo: {
        name: "Prakhar Srivastava",
        role: "Software Developer | Full Stack Developer",
        location: "Bengaluru, Karnataka",
        phone: "+91 6203555484",
        email: "prakhartech983@gmail.com",
        github: "PrakEntech",
        linkedin: "prakhar-srivastava-3210641ba",
    },

    summary: "Software Developer with 1+ years of hands-on experience implementing secure, scalable, zero-to-one systems. Owned the complete implementation lifecycle of a production PWA — from development through CI/CD, documentation, and independent releases. Strong in serverless Firebase, React, security-hardened deployments, and AI-assisted engineering workflows.",

    education: [
        {
            degree: "BSc in Computer Science, Mathematics, Electronics",
            institution: "Christ University",
            period: "2021 – 2024",
            grade: "CGPA: 3.0 / 4.0",
        },
        {
            degree: "Class X – XII",
            institution: "Delhi Public School",
            period: "2019 – 2021",
            grade: "CGPA: 9.0 / 10.0",
        }
    ],

    skills: [
        { category: "Frontend", items: ["React.js", "JavaScript", "Local Caching"] },
        { category: "Backend & Serverless", items: ["Firebase Cloud Functions", "Event-driven Architecture", "Python", "Flask", "Node.js"] },
        { category: "Databases & Cloud", items: ["Firebase Realtime Database", "Firebase Storage", "Firebase Auth", "GCP"] },
        { category: "Security", items: ["Signed URLs", "Upload Throttling", "Storage Path Isolation", "RTDB Rules", "IAM", "Abuse Alerts"] },
        { category: "CI/CD & DevOps", items: ["Jenkins", "GitHub Actions", "Multi-env Deployments", "Secrets Handling", "Shell Scripting"] },
        { category: "Languages", items: ["JavaScript", "Python", "Java", "Kotlin", "Dart", "C"] },
        { category: "Integrations & APIs", items: ["Google Maps Reverse Geocoding", "Mautic CRM", "Dropbox API"] },
        { category: "AI-Augmented Eng.", items: ["ChatGPT / Gemini Workflows", "POC Development", "Prompt-driven Debugging", "Doc Generation"] },
        { category: "Quality & Tooling", items: ["SonarQube", "Manual & Edge-case Testing", "System Design Docs", "Deployment Docs"] },
    ],

    experience: [
        {
            company: "Weberon",
            role: "Software Developer",
            period: "Aug 2024 – Present",
            internPeriod: "Intern: Aug 2024 – Jan 2025",
            fullTimePeriod: "Full-Time: Feb 2025 – Present",
            type: "featured",
            overview: "End-to-end ownership of the Delivery Tracker — a production system QR-scanning deliveries in the field. Led the full lifecycle: development → security hardening → CI/CD → documentation → independent environment releases.",
            groups: [
                {
                    label: "Product & Architecture",
                    bullets: [
                        "Implemented and owned the lifecycle of a QR-based delivery tracking Progressive Web App (PWA) using React and Firebase — from POC through to production.",
                        "Implemented a scalable, serverless system using Firebase Authentication, Realtime Database, Storage, and event-driven Cloud Functions — eliminating public HTTP endpoints to reduce attack surface.",
                        "Implemented multi-environment deployments (Developer, Alpha, Blue, Production) with fully isolated Firebase projects and per-environment configurations.",
                    ]
                },
                {
                    label: "Frontend Development",
                    bullets: [
                        "Built a full-featured React PWA with authentication flows, real-time dashboard, client-side QR scanning, address validation and editing, image capture/upload, and local caching to prevent duplicate scans.",
                        "Implemented PWA patterns including offline-readiness and install prompts for field use on mobile devices.",
                    ]
                },
                {
                    label: "Security Engineering",
                    bullets: [
                        "Learned and implemented system designs, building a secure image upload workflow using short-lived signed URLs, upload attempt throttling (max 3 attempts), and user-isolated Storage paths — ensuring data privacy and abuse prevention.",
                        "Implemented security hardening and cost optimisation during migration from Firebase Spark (Free) to Blaze (Paid): strict RTDB security rules, real-time abuse alerts, and automated database lockdown mechanisms.",
                        "Validated the complete security flow through manual edge-case testing, covering upload abuse, rule bypass attempts, and environment bleed scenarios.",
                    ]
                },
                {
                    label: "Integrations",
                    bullets: [
                        "Integrated Google Maps Reverse Geocoding API for automated address resolution from GPS coordinates.",
                        "Integrated Mautic CRM for contact address synchronisation, keeping delivery records consistent with CRM data.",
                        "Developed a Mautic plugin for trackable URL generation, gaining hands-on experience in plugin architecture, Mautic internals, and API development.",
                        "Implemented Postcard PDF generation with a grid layout, integrating Dropbox API for file storage and delivery.",
                    ]
                },
                {
                    label: "CI/CD & DevOps",
                    bullets: [
                        "Implemented CI/CD pipelines using Jenkins and GitHub Actions for automated, secret-free builds and deployments across all environments.",
                        "Wrote shell scripts for deployment automation, versioning strategies, and release management — managed production releases independently.",
                    ]
                },
                {
                    label: "Documentation & Quality",
                    bullets: [
                        "Produced comprehensive system design, usage, and deployment documentation to support maintainability and team onboarding.",
                        "Used SonarQube to identify and resolve code smells before review cycles.",
                        "Performed manual and edge-case testing across all features to ensure production readiness before each release.",
                    ]
                },
                {
                    label: "Growth & Learning",
                    bullets: [
                        "Grew from intern with limited JS experience to independently owning a production system within 6 months — learning through hands-on implementation, not courses.",
                        "Adopted AI-assisted development workflows (ChatGPT, Gemini) to accelerate understanding of documentation, generate solution approaches, and reduce iteration time.",
                    ]
                },
            ]
        },
        {
            company: "TerraviewOS",
            role: "Backend Intern",
            period: "June 2022 – Oct 2022",
            type: "intern",
            bullets: [
                "Collaborated with the core backend team to build secure, scalable collaborative solutions for medium-sized businesses.",
                "Developed backend features for a unified vineyard management platform with yield intelligence, disease management, and weather forecasting modules.",
                "Built and optimised REST APIs using Python and Flask, improving response times and code maintainability.",
                "Developed CRUD applications in Python and enhanced technical documentation quality across the team.",
            ]
        }
    ],

    projects: [
        {
            name: "Delivery Tracker PWA",
            description: "Production QR-based delivery tracking PWA. Full lifecycle ownership: React frontend, serverless Firebase backend, secure image uploads, multi-env CI/CD via Jenkins & GitHub Actions.",
            tech: ["React.js", "Firebase", "PWA", "Jenkins", "GitHub Actions", "GCP"],
            highlight: true,
        },
        {
            name: "Mautic Trackable URL Plugin",
            description: "Custom Mautic CRM plugin for generating trackable URLs with Jenkins-based automation. Gained deep knowledge of Mautic internals and plugin architecture.",
            tech: ["PHP", "Mautic", "Jenkins", "API Dev"],
        },
        {
            name: "Postcard PDF Generator",
            description: "Automated generation of postcard grids inside PDFs with Dropbox API integration and CI/CD automation.",
            tech: ["Python", "Dropbox API", "Jenkins"],
        },
        {
            name: "Music Streaming App",
            description: "Spotify-inspired cross-platform mobile app with swipe gesture controls, music library, and favourites.",
            tech: ["React Native", "Firebase"],
        },
        {
            name: "Word Hurdle Game",
            description: "Wordle-inspired word puzzle with dynamic colour-coded feedback and difficulty progression.",
            tech: ["Flutter", "Dart"],
        },
        {
            name: "Scitrix Module",
            description: "Python library for complex matrix calculations and linear algebra operations, published as a standalone package.",
            tech: ["Python"],
        }
    ]
};
