const defaults = {
  profile: {
    name: "Monu Siddiki",
    title: "DevOps Engineer & Full Stack Developer",
    subtitle: "DevOps Engineer & Full Stack Developer",
    bio: "Hello! I'm Monu Siddiki, a passionate Full Stack Developer specializing in DevOps practices and cloud-based solutions. Currently pursuing my BSc.CSIT at Texas International College in Kathmandu.",
    tagline: "Building scalable solutions with modern DevOps practices",
    philosophy:
      "I believe in continuous learning and delivering efficient, real-world solutions. My passion lies in building scalable applications that leverage modern DevOps practices to ensure reliability, performance, and seamless deployment workflows.",
    email: "m9800564411@gmail.com",
    phone: "+977 9800564411",
    location: "Kapan, Kathmandu, Nepal",
    github: "https://github.com/monu3",
    linkedin: "https://www.linkedin.com/in/monu-siddiki-6a92182a2/",
    imageUrl:
      "https://customer-assets.emergentagent.com/job_d414b529-4cec-4c1e-bca4-cdf9cc8f1834/artifacts/dhzetlto_1699433249450.jpg",
    cvUrl:
      "https://customer-assets.emergentagent.com/job_d414b529-4cec-4c1e-bca4-cdf9cc8f1834/artifacts/0t37s2e3_Monu-Monu-cv%20%281%29.pdf",
  },
  experience: [
    {
      id: 1,
      company: "mSoft, Kathmandu",
      role: "Software Development Intern",
      duration: "Dec 2024 - Feb 2025",
      description:
        "Worked as a SaaS Software Developer, developing web applications using React, Spring Boot, and Java, with a focus on cloud-based solutions and DevOps practices.",
    },
    {
      id: 2,
      company: "Texas International College",
      role: "BSc.CSIT Student",
      duration: "Apr 2022 - Present",
      description:
        "Pursuing Computer Science degree with focus on software engineering, DevOps methodologies, and modern web technologies.",
    },
  ],
  skills: [
    { id: 1, name: "Docker", level: 90, category: "DEVOPS" },
    { id: 2, name: "Kubernetes", level: 85, category: "DEVOPS" },
    { id: 3, name: "Jenkins", level: 80, category: "DEVOPS" },
    { id: 4, name: "ArgoCD", level: 80, category: "DEVOPS" },
    { id: 5, name: "AWS", level: 75, category: "DEVOPS" },
    { id: 6, name: "React", level: 85, category: "COMPETENCY" },
    { id: 7, name: "Spring Boot", level: 80, category: "COMPETENCY" },
    { id: 8, name: "PostgreSQL", level: 75, category: "COMPETENCY" },
  ],
  technologyStacks: [
    {
      category: "Frontend",
      skills: ["React", "JavaScript", "HTML5", "CSS3"],
    },
    {
      category: "Backend",
      skills: ["Spring Boot", "Java", "Hibernate", "JDBC"],
    },
    {
      category: "Database",
      skills: ["PostgreSQL", "MongoDB", "SQL"],
    },
  ],
  projects: [
    {
      id: 1,
      title: "Doko",
      subtitle: "SaaS eCommerce Platform",
      description:
        "A comprehensive SaaS-based eCommerce platform designed to help new and small businesses create their own online stores. It aims to empower entrepreneurs by providing easy-to-use tools to launch, manage, and grow their digital presence.",
      technologies: ["React", "Spring Boot", "PostgreSQL", "Docker"],
      githubLink: "https://github.com/monu3/meroPasal",
      liveLink: "",
      dockerLink: "",
    },
    {
      id: 2,
      title: "CV Generator",
      subtitle: "Professional Resume Builder",
      description:
        "A web-based application built using Spring Boot, PostgreSQL, and Thymeleaf. It allows users to input personal and professional details to generate a professional CV instantly.",
      technologies: ["Spring Boot", "PostgreSQL", "Thymeleaf", "Docker"],
      githubLink: "",
      liveLink: "",
      dockerLink:
        "https://hub.docker.com/repository/docker/monusiddiki/cv_generator/general",
    },
  ],
};

export default defaults;
