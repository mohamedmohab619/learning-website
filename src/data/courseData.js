const courses = [
  // 1-6 Web Development
  {
    id: "html",
    title: "HTML & CSS Bootcamp",
    image: "/ai-for-kids.jpg",
    description: `This comprehensive HTML & CSS Bootcamp is designed for absolute beginners as well as developers looking to strengthen their front-end foundation. 
It covers all essential topics starting from the basics of HTML elements, attributes, semantic structure, and best practices for web accessibility. 
You will also dive deeply into CSS, learning about selectors, specificity, box model, positioning, Flexbox, Grid layouts, transitions, animations, and responsive design techniques. 
By the end of this course, you will have built several practical projects including a personal portfolio, landing pages, and fully responsive web interfaces. 
This course also emphasizes modern standards and practices to ensure that your web development skills are up-to-date with industry trends.`,
    price: "Free",
    category: "Web Development",
    instructor: "John Doe",
    duration: "4 weeks",
    rating: 4.5,
    reviews: [{ user: "Ali", comment: "Great course!" }, { user: "Sara", comment: "Loved the projects." }],
    suggested: ["react", "uiux"]
  },
  {
    id: "javascript",
    title: "JavaScript Essentials",
    image: "/unnamed-8-2.webp",
    description: `This JavaScript Essentials course provides a complete foundation for programming in JavaScript. 
It starts with core concepts like variables, data types, operators, and control structures, before moving into functions, objects, arrays, and ES6+ features such as arrow functions, classes, destructuring, template literals, and modules. 
You'll also learn DOM manipulation, event handling, and asynchronous programming with promises and async/await. 
Through multiple projects including interactive forms, calculators, and dynamic web pages, you'll gain practical skills to create fully functional web applications. 
This course ensures you develop strong problem-solving skills and a solid understanding of modern JavaScript practices.`,
    price: "$12",
    category: "Web Development",
    instructor: "David Miller",
    duration: "4 weeks",
    rating: 4.5,
    reviews: [{ user: "Sara", comment: "Super clear explanations." }, { user: "Ali", comment: "Loved the exercises." }],
    suggested: ["react", "node"]
  },
  {
    id: "react",
    title: "React for Beginners",
    image: "/1_NJSv6DGoKTloI8d8im98zg.png",
    description:`This React for Beginners course will take you from zero to creating fully functional, modern React applications. 
You will start by understanding the fundamentals of React, including JSX, components, props, state, and lifecycle methods. 
The course then dives into hooks such as useState, useEffect, useContext, and custom hooks, allowing you to build dynamic and interactive UIs. 
You'll also learn React Router for navigation, manage global state with Context API, and understand component composition patterns. 
Several practical projects, including a task tracker, a weather app, and a blog platform, ensure you gain hands-on experience. 
By the end of this course, you'll be ready to tackle real-world React applications and have a portfolio to showcase your skills.`,
    price: "$20",
    category: "Web Development",
    instructor: "Jane Smith",
    duration: "6 weeks",
    rating: 4.7,
    reviews: [{ user: "Hossam", comment: "React made simple!" }, { user: "Mona", comment: "Very helpful examples." }],
    suggested: ["html", "node"]
  },
  {
    id: "node",
    title: "Node.js & Express",
    image: "/node-logo.png",
    description: "Backend development with Node.js, Express, routing and APIs.",
    price: "$18",
    category: "Backend",
    instructor: "Robert Brown",
    duration: "5 weeks",
    rating: 4.6,
    reviews: [{ user: "Youssef", comment: "Practical projects." }, { user: "Maha", comment: "Good explanations for APIs." }],
    suggested: ["react", "python"]
  },
  {
    id: "python",
    title: "Python Programming Masterclass",
    image: "/2022-07-19-Melhores-cursos-de-Python.jpg",
    description: `This Python Programming Masterclass is designed to make you proficient in Python for web development, data analysis, automation, and more. 
You will start with Python basics such as variables, operators, loops, and conditionals, before advancing to functions, OOP concepts, modules, and error handling. 
The course includes working with popular libraries such as Pandas, NumPy, and Matplotlib for data processing and visualization. 
You will also learn to create automation scripts, build CLI applications, and understand Python best practices. 
Hands-on projects like a web scraper, a budget tracker, and simple games give you practical experience. 
By completing this course, you'll have the knowledge and confidence to apply Python in multiple real-world scenarios.`,
    price: "$15",
    category: "Programming",
    instructor: "Alice Johnson",
    duration: "5 weeks",
    rating: 4.8,
    reviews: [{ user: "Ahmed", comment: "Excellent explanations!" }, { user: "Laila", comment: "Loved the projects." }],
    suggested: ["ai", "node"]
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    image: "/pngtree-programming-and-coding-a-humanoid-ai-robot-with-futuristic-artificial-intelligence-picture-image_14489373.jpg",
    description:  `This AI & Machine Learning course introduces you to the fascinating world of artificial intelligence and machine learning. 
You'll begin with an overview of AI concepts, types of machine learning, and practical applications in different industries. 
The course covers supervised and unsupervised learning techniques, including linear regression, classification, clustering, decision trees, and more. 
You will also get hands-on experience using Python libraries like scikit-learn, TensorFlow, and Keras to build and train models. 
By the end of the course, you will understand how to preprocess data, select appropriate algorithms, train models, evaluate performance, and deploy AI solutions. 
This course is perfect for anyone looking to start a career in AI or enhance their technical skill set with machine learning knowledge.`,
    price: "$25",
    category: "Artificial Intelligence",
    instructor: "Michael Lee",
    duration: "8 weeks",
    rating: 4.6,
    reviews: [{ user: "Nadia", comment: "Challenging but rewarding." }, { user: "Omar", comment: "Clear explanations." }],
    suggested: ["python", "react"]
  },

  // 7-12 Design & DevOps
  {
    id: "uiux",
    title: "UI/UX Design from Scratch",
    image: "/UIUX-designing-1.jpg",
    description: "Learn modern UI/UX workflows, Figma, usability and prototyping.",
    price: "$10",
    category: "Design",
    instructor: "Emily Clark",
    duration: "3 weeks",
    rating: 4.4,
    reviews: [{ user: "Salma", comment: "Very creative." }, { user: "Karim", comment: "Learned a lot." }],
    suggested: ["html", "react"]
  },
  {
    id: "docker",
    title: "Docker for Beginners",
    image: "/Docker-Logo.png",
    description: "Learn Docker and containerization from scratch.",
    price: "$20",
    category: "DevOps",
    instructor: "Laura Adams",
    duration: "3 weeks",
    rating: 4.4,
    reviews: [{ user: "Hani", comment: "Very practical!" }, { user: "Nour", comment: "Good examples." }],
    suggested: ["node", "kubernetes"]
  },
  {
    id: "kubernetes",
    title: "Kubernetes Crash Course",
    image: "/Kubernetes_logo_without_workmark.svg.png",
    description: "Learn Kubernetes basics and deployment.",
    price: "$22",
    category: "DevOps",
    instructor: "Chris Evans",
    duration: "4 weeks",
    rating: 4.5,
    reviews: [{ user: "Tamer", comment: "Very helpful!" }, { user: "Maya", comment: "Learned a lot." }],
    suggested: ["docker"]
  },
  {
    id: "data-science",
    title: "Data Science Bootcamp",
    image: "/What Really Is Data Science A Super Simple Explanation For Anyone.png",
    description: "Complete Data Science course with Python and projects.",
    price: "$30",
    category: "Data Science",
    instructor: "Rachel Green",
    duration: "8 weeks",
    rating: 4.7,
    reviews: [{ user: "Omar", comment: "Amazing course." }, { user: "Sara", comment: "Loved the projects." }],
    suggested: ["python", "ai"]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Fundamentals",
    image: "/gempages_487642277401854988-8837ef3c-1052-4a8f-a5d4-2b1c6c2a89c6.webp",
    description: "Learn the basics of cybersecurity and protection methods.",
    price: "$15",
    category: "Security",
    instructor: "Mark Wilson",
    duration: "5 weeks",
    rating: 4.6,
    reviews: [{ user: "Ali", comment: "Very informative." }, { user: "Huda", comment: "Great for beginners." }],
    suggested: ["networking", "python"]
  },
  {
    id: "networking",
    title: "Networking Essentials",
    image: "/images.jpg",
    description: "Understand networking concepts and protocols.",
    price: "$18",
    category: "Networking",
    instructor: "Susan Parker",
    duration: "4 weeks",
    rating: 4.5,
    reviews: [{ user: "Ahmed", comment: "Excellent course." }, { user: "Laila", comment: "Very clear explanations." }],
    suggested: ["cybersecurity"]
  },

  // 13-18 Programming & AI
  {
    id: "java",
    title: "Java Programming Masterclass",
    image: "/0_gtY-llyEbkeoS1Sp.png",
    description: "Learn Java from basics to advanced OOP.",
    price: "$20",
    category: "Programming",
    instructor: "Brian Clark",
    duration: "6 weeks",
    rating: 4.6,
    reviews: [{ user: "Hana", comment: "Very detailed!" }, { user: "Omar", comment: "Good examples." }],
    suggested: ["python", "react"]
  },
  {
    id: "cplus",
    title: "C++ for Beginners",
    image: "/images_9353691196_3a8ed441774de-7-melhores-IDEs-e-editores-de-texto-C-para-desenvolvimento.jpg",
    description: "Learn C++ basics and OOP with projects.",
    price: "$18",
    category: "Programming",
    instructor: "Linda White",
    duration: "5 weeks",
    rating: 4.5,
    reviews: [{ user: "Ali", comment: "Excellent!" }, { user: "Sara", comment: "Very clear." }],
    suggested: ["java", "python"]
  },
  {
    id: "ml",
    title: "Machine Learning A-Z",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
    description: "Learn ML models and applications.",
    price: "$25",
    category: "Artificial Intelligence",
    instructor: "David Miller",
    duration: "8 weeks",
    rating: 4.7,
    reviews: [{ user: "Hossam", comment: "Very practical!" }, { user: "Mona", comment: "Excellent explanations." }],
    suggested: ["ai", "python"]
  },
  {
    id: "deep-learning",
    title: "Deep Learning Fundamentals",
    image: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2",
    description: "Introduction to neural networks and deep learning.",
    price: "$28",
    category: "Artificial Intelligence",
    instructor: "Sophia Lee",
    duration: "8 weeks",
    rating: 4.6,
    reviews: [{ user: "Omar", comment: "Challenging but clear." }, { user: "Nadia", comment: "Good course." }],
    suggested: ["ml", "ai"]
  },
  {
    id: "figma",
    title: "Figma UI Design",
    image: "/1693dcf9-d07a-45d0-89aa-974e605f49f2-cover.jpg",
    description: "Design user interfaces with Figma efficiently.",
    price: "$12",
    category: "Design",
    instructor: "Emily Clark",
    duration: "3 weeks",
    rating: 4.5,
    reviews: [{ user: "Salma", comment: "Very creative." }, { user: "Karim", comment: "Loved it." }],
    suggested: ["uiux"]
  },
  {
    id: "photoshop",
    title: "Photoshop Mastery",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28",
    description: "Master Photoshop for UI/UX and graphics.",
    price: "$15",
    category: "Design",
    instructor: "Laura Adams",
    duration: "4 weeks",
    rating: 4.6,
    reviews: [{ user: "Nour", comment: "Very practical." }, { user: "Hani", comment: "Loved it." }],
    suggested: ["figma", "uiux"]
  },

  // 19-24 DevOps & Misc
  {
    id: "aws",
    title: "AWS Cloud Basics",
    image: "/1_neG4D9C8UcJvNn6bverfIA.png",
    description: "Learn cloud computing with AWS.",
    price: "$25",
    category: "Cloud",
    instructor: "Robert Brown",
    duration: "5 weeks",
    rating: 4.5,
    reviews: [{ user: "Maha", comment: "Very informative." }, { user: "Youssef", comment: "Good practical examples." }],
    suggested: ["docker", "kubernetes"]
  },
  {
    id: "git",
    title: "Git & GitHub Essentials",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    description: "Version control with Git and GitHub.",
    price: "$10",
    category: "DevOps",
    instructor: "Chris Evans",
    duration: "2 weeks",
    rating: 4.4,
    reviews: [{ user: "Omar", comment: "Very helpful." }, { user: "Maya", comment: "Good examples." }],
    suggested: ["docker", "kubernetes"]
  },
  {
    id: "sql",
    title: "SQL Database Fundamentals",
    image: "/SQL-Databases.png",
    description: "Learn SQL databases and queries.",
    price: "$15",
    category: "Database",
    instructor: "Alice Johnson",
    duration: "4 weeks",
    rating: 4.6,
    reviews: [{ user: "Ahmed", comment: "Excellent explanations." }, { user: "Laila", comment: "Very clear." }],
    suggested: ["python", "data-science"]
  },
  {
    id: "mongo",
    title: "MongoDB for Beginners",
    image: "/mongodb_logo_Logo.jpg",
    description: "Learn MongoDB basics and CRUD operations.",
    price: "$18",
    category: "Database",
    instructor: "David Miller",
    duration: "3 weeks",
    rating: 4.5,
    reviews: [{ user: "Hani", comment: "Very practical." }, { user: "Nour", comment: "Loved it." }],
    suggested: ["node", "sql"]
  }
];

export default courses;


