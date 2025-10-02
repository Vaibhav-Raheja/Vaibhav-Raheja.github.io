// Portfolio Data Structure
// All content in one centralized location for easy updates

const portfolioData = {
	// Personal Information
	personal: {
		name: "Vaibhav Raheja",
		username: "vaibhav",
		hostname: "portfolio",
		role: "Robotics Engineer",
		tagline: "Building the future of autonomous systems",
		location: "Champaign, Illinois",
		bio: `I'm a passionate robotics engineer with a Master's in Autonomy and Robotics
from the University of Illinois Urbana-Champaign. My journey in robotics began at
age eight, inspired by iconic robots like R2D2 and Optimus Prime, and has evolved
into a dedicated pursuit of advancing robotic technologies for an autonomous future.`,
		avatar: "images/profile-pic (1).png"
	},

	// Education
	education: [
		{
			degree: "M.Eng in Autonomy and Robotics",
			institution: "University of Illinois at Urbana-Champaign",
			shortName: "UIUC",
			location: "Urbana-Champaign, Illinois",
			year: "2023-2024",
			gpa: "",
			highlights: [
				"Specialized in autonomous systems and robot control",
				"Advanced coursework in computer vision and machine learning",
				"Research in intelligent motion and robotic perception"
			]
		},
		{
			degree: "B.Tech in Computer Engineering",
			institution: "NMIMS (Narsee Monjee Institute of Management Studies)",
			shortName: "NMIMS",
			location: "Mumbai, India",
			year: "2019-2023",
			gpa: "",
			highlights: [
				"Foundation in computer science and engineering",
				"Projects in robotics and embedded systems",
				"Active in robotics competitions and research"
			]
		}
	],

	// Work Experience
	experience: [
		{
			id: 1,
			role: "Robotics Engineer",
			company: "EarthSense, Inc.",
			location: "Champaign, Illinois",
			period: "Jan 2025 - Present",
			startDate: "2025-01",
			endDate: "Present",
			current: true,
			type: "Full-time",
			achievements: [
				"Developing autonomous navigation and control systems for agricultural robotics",
				"Implementing computer vision algorithms for crop monitoring and analysis",
				"Working with ROS and sensor fusion for real-time robotic applications",
				"Collaborating on machine learning models for agricultural data processing"
			],
			technologies: ["ROS", "Python", "C++", "Computer Vision", "Machine Learning", "Sensor Fusion"]
		},
		{
			id: 2,
			role: "Robotics Intern",
			company: "EarthSense, Inc.",
			location: "Champaign, Illinois",
			period: "Aug 2024 - Jan 2025",
			startDate: "2024-08",
			endDate: "2025-01",
			current: false,
			type: "Internship",
			achievements: [
				"Contributed to autonomous systems development for agricultural robotics platforms",
				"Developed and tested navigation algorithms",
				"Sensor integration and data processing pipelines",
				"Collaborated with cross-functional teams on robotic systems optimization"
			],
			technologies: ["ROS", "Python", "Navigation Algorithms", "Sensor Integration"]
		},
		{
			id: 3,
			role: "Research Developer",
			company: "Intelligent Motion Laboratory, UIUC",
			location: "Urbana-Champaign, Illinois",
			period: "Aug 2023 - Dec 2023",
			startDate: "2023-08",
			endDate: "2023-12",
			current: false,
			type: "Research",
			achievements: [
				"Implemented facial detection using FaceMesh, OpenFace 1.0, and DeepFace",
				"Developed head pose estimation system with ZED camera depth tracking",
				"Engineered and simulated robotic arm for 3D mapping",
				"Improved precision of face detection for comprehensive eye examinations"
			],
			technologies: ["Computer Vision", "Python", "OpenCV", "3D Mapping", "Robot Simulation"]
		},
		{
			id: 4,
			role: "Research Intern",
			company: "AIIMS (All India Institute of Medical Sciences)",
			location: "New Delhi, India",
			period: "2021 - Apr 2023",
			startDate: "2021-01",
			endDate: "2023-04",
			current: false,
			type: "Research",
			achievements: [
				"Developed research project financed by Indian Council of Medical Research (ICMR)",
				"Achieved 20% enhancement in accuracy through advanced methodologies",
				"Key role in design of custom 2-directional catheter with integrated camera",
				"Contributed to successful intubation procedures through engineering innovations"
			],
			technologies: ["Medical Robotics", "Computer Vision", "Research", "Prototyping"]
		}
	],

	// Projects
	projects: [
		{
			id: 1,
			name: "Intelligent Ground Vehicle Competition (IGVC)",
			shortName: "IGVC",
			description: "Achieved 2nd place in Cyber and 3rd place in AutoNAV challenges at the annual international competition. Developed a fully autonomous vehicle equipped with advanced object detection, path planning, and traversal capabilities.",
			longDescription: `Developed a fully autonomous vehicle for the Intelligent Ground Vehicle Competition hosted at Oakland University, Michigan. The system integrated multiple technologies for obstacle detection and avoidance, efficient route planning, and autonomous navigation through complex environments.`,
			technologies: ["ROS", "Computer Vision", "Path Planning", "Autonomous Navigation", "Sensor Fusion", "Python", "C++"],
			category: "Autonomous Vehicles",
			year: "2024",
			status: "Completed",
			achievements: [
				"2nd place in Cyber Challenge",
				"3rd place in AutoNAV Challenge",
				"Successfully navigated complex outdoor environments",
				"Real-time obstacle detection and avoidance"
			],
			image: "images/thumbs/IGVC.gif",
			github: "",
			demo: ""
		},
		{
			id: 2,
			name: "Reinforcement Learning for Game Optimization",
			shortName: "RL Game",
			description: "Optimized gameplay in BreakoutDeterministic using Deep Q-Networks (DQN) and Double DQN, achieving mean rewards of 8.04 and 10.1 respectively.",
			longDescription: `Implemented advanced reinforcement learning algorithms for game optimization. Used ε-greedy policy for balanced exploration and exploitation with replay memory for stable learning. DQN used reward prediction errors while Double DQN utilized a second network for more reliable training.`,
			technologies: ["Python", "TensorFlow", "Reinforcement Learning", "Deep Q-Networks", "OpenAI Gym"],
			category: "Machine Learning",
			year: "2024",
			status: "Completed",
			achievements: [
				"Mean reward of 8.04 with DQN",
				"Mean reward of 10.1 with Double DQN",
				"Implemented replay memory for stable learning",
				"Optimized ε-greedy exploration strategy"
			],
			image: "images/thumbs/rl-video-episode-0.gif",
			github: "",
			demo: ""
		},
		{
			id: 3,
			name: "Generalized Racing Intelligence Competition (GRAIC)",
			shortName: "GRAIC",
			description: "Implemented path planning and control algorithms for autonomous racing car in CARLA simulator using Hybrid A* and PD controller.",
			longDescription: `Developed autonomous racing algorithms in CARLA simulator. Utilized Hybrid A* search for optimal waypoint navigation in complex racetrack environments combined with Proportional-Derivative (PD) controller for real-time control including obstacle avoidance, steering angle, speed, and braking adjustments.`,
			technologies: ["Python", "CARLA Simulator", "Path Planning", "Hybrid A*", "Control Systems", "ROS"],
			category: "Autonomous Vehicles",
			year: "2023",
			status: "Completed",
			achievements: [
				"Implemented Hybrid A* path planning",
				"Real-time PD controller for vehicle dynamics",
				"Obstacle avoidance in racing scenarios",
				"Competition-ready autonomous racing system"
			],
			image: "images/thumbs/GRAIC.gif",
			github: "https://github.com/Vaibhav-Raheja/GRAIC",
			demo: ""
		},
		{
			id: 4,
			name: "LiDAR-Based SLAM Implementation",
			shortName: "SLAM",
			description: "Developed SLAM algorithm using ROS and Python with split-and-merge line fitting to identify corners for geometric map creation.",
			longDescription: `Implemented Simultaneous Localization and Mapping algorithm processing LiDAR measurements and EKF-estimated trajectory. Used split-and-merge line fitting algorithm to identify corners in LiDAR data for geometric map creation. Compared custom results with Gmapping-generated maps for validation.`,
			technologies: ["ROS", "Python", "LiDAR", "SLAM", "Extended Kalman Filter", "Point Cloud Processing"],
			category: "Localization & Mapping",
			year: "2023",
			status: "Completed",
			achievements: [
				"Custom SLAM implementation from scratch",
				"Split-and-merge line fitting algorithm",
				"Real-time map generation",
				"Validated against Gmapping results"
			],
			image: "images/thumbs/SLAM.jpg",
			github: "",
			demo: ""
		},
		{
			id: 5,
			name: "Lane Detection Using Computer Vision",
			shortName: "Lane Detection",
			description: "Implemented lane detection system for autonomous vehicles using ROS, Gazebo, and Python OpenCV with gradient/color thresholds and perspective transformation.",
			longDescription: `Developed comprehensive lane detection system processing video feeds frame-by-frame. Applied gradient and color thresholds to identify road edges and lane markings. Used perspective transformation for top-down view and histogram-based segmentation to locate lane center by identifying highest pixel density areas.`,
			technologies: ["Python", "OpenCV", "ROS", "Gazebo", "Computer Vision", "Image Processing"],
			category: "Computer Vision",
			year: "2023",
			status: "Completed",
			achievements: [
				"Real-time lane detection pipeline",
				"Perspective transformation and bird's-eye view",
				"Histogram-based lane center identification",
				"Robust to varying lighting conditions"
			],
			image: "images/thumbs/Lane_detect.gif",
			github: "",
			demo: ""
		},
		{
			id: 6,
			name: "Monte Carlo Localization",
			shortName: "Particle Filter",
			description: "Implemented particle filtering for vehicle localization using LiDAR data in ROS/Gazebo simulations with custom point cloud processing.",
			longDescription: `Developed Monte Carlo Localization (MCL) algorithm for vehicle localization. System initializes with randomly generated particles that adjust iteratively as vehicle moves, converging towards actual location. Implemented specialized module to process raw LiDAR point cloud data for distance calculations.`,
			technologies: ["Python", "ROS", "Gazebo", "Particle Filtering", "LiDAR", "Probabilistic Robotics"],
			category: "Localization & Mapping",
			year: "2023",
			status: "Completed",
			achievements: [
				"Monte Carlo Localization implementation",
				"Custom LiDAR point cloud processing",
				"Real-time particle convergence",
				"Accurate vehicle pose estimation"
			],
			image: "images/thumbs/Particle Filter.gif",
			github: "",
			demo: ""
		},
		{
			id: 7,
			name: "Autonomous Vehicle (GEM e2)",
			shortName: "GEM e2",
			description: "Learning GEMstack framework to control the GEM e2 autonomous vehicle for navigation and control tasks.",
			longDescription: `Working with GEM e2 autonomous vehicle platform using GEMstack framework. Focusing on navigation algorithms, control systems, and sensor integration for real-world autonomous driving scenarios.`,
			technologies: ["ROS", "GEMstack", "Python", "Autonomous Driving", "Sensor Fusion"],
			category: "Autonomous Vehicles",
			year: "2024",
			status: "In Progress",
			achievements: [],
			image: "images/thumbs/AV.gif",
			github: "",
			demo: ""
		},
		{
			id: 8,
			name: "Reinforcement Learning on Unitree Go1",
			shortName: "Unitree Go1",
			description: "Implementing reinforcement learning controller to replace and benchmark the baseline MPC controller for quadruped locomotion.",
			longDescription: `Developing advanced RL controller for Unitree Go1 quadruped robot. Comparing performance against baseline Model Predictive Control (MPC) for various locomotion tasks and terrains.`,
			technologies: ["Python", "Reinforcement Learning", "Robot Control", "MPC", "Simulation"],
			category: "Robot Control",
			year: "2024",
			status: "In Progress",
			achievements: [],
			image: "images/thumbs/Go1_small.gif",
			github: "",
			demo: ""
		},
		{
			id: 9,
			name: "Vehicle Control System",
			shortName: "Vehicle Control",
			description: "Designed control system for GEM e2 autonomous vehicle with longitudinal and lateral controllers.",
			longDescription: `Developed comprehensive control system for GEM e2 autonomous vehicle. Implemented longitudinal controller for speed management and lateral controller for steering, enabling precise vehicle control for autonomous navigation tasks.`,
			technologies: ["ROS", "Control Systems", "Python", "GEMstack", "PID Control"],
			category: "Autonomous Vehicles",
			year: "2024",
			status: "Completed",
			achievements: ["Longitudinal controller implementation", "Lateral controller design", "Real-world vehicle testing"],
			image: "images/thumbs/VC.gif",
			github: "",
			demo: ""
		},
		{
			id: 10,
			name: "Robotis Mini Robot Control",
			shortName: "Robotis Mini",
			description: "Implementing basic kinematics to control the Mini Robot in real world and ROS simulation.",
			longDescription: `Developing control system for Robotis Mini humanoid robot. Implementing forward and inverse kinematics for precise control of robot movements in both real-world hardware and ROS simulation environment.`,
			technologies: ["ROS", "Python", "Kinematics", "Robot Control", "Simulation"],
			category: "Robot Control",
			year: "2024",
			status: "In Progress",
			achievements: [],
			image: "images/thumbs/Mini.jpeg",
			github: "",
			demo: ""
		},
		{
			id: 11,
			name: "Semi-Soft Robotic Hand",
			shortName: "Robotic Hand",
			description: "Created a soft robotic hand controlled by five individual stepper motors for enhanced dexterity.",
			longDescription: `Designed and fabricated a semi-soft robotic hand with five degrees of freedom. Each finger controlled independently by stepper motors using Arduino. Utilized 3D modeling and printing for custom mechanical design, achieving enhanced dexterity and flexibility.`,
			technologies: ["Arduino", "Stepper Motors", "3D Printing", "Mechanical Design", "Embedded Systems"],
			category: "Robotics Hardware",
			year: "2022",
			status: "Completed",
			achievements: ["5-DOF hand design", "Independent finger control", "3D printed structure"],
			image: "images/thumbs/hand.png",
			github: "",
			demo: ""
		},
		{
			id: 12,
			name: "Chronic Disease Detection System",
			shortName: "Disease Detection",
			description: "Expert system using machine learning to diagnose chronic diseases including kidney disease, diabetes, heart disease, pneumonia, and COVID-19.",
			longDescription: `Developed comprehensive machine learning-based diagnostic system for multiple chronic diseases. Implemented various algorithms including Logistic Regression, Random Forest, K-Nearest Neighbor for disease prediction. Used CNN for pneumonia and COVID-19 detection from medical images. Published research paper in IEEE 2023.`,
			technologies: ["Python", "Machine Learning", "CNN", "TensorFlow", "Scikit-learn", "Medical Imaging"],
			category: "Machine Learning",
			year: "2023",
			status: "Completed",
			achievements: ["Published in IEEE 2023", "Multi-disease detection system", "CNN for medical image analysis"],
			image: "images/thumbs/fyp1.png",
			github: "",
			demo: ""
		},
		{
			id: 13,
			name: "Custom Surveillance Drone",
			shortName: "Drone",
			description: "Engineered a custom surveillance drone with modular 3D-printed body and high-performance flight system.",
			longDescription: `Designed and built custom surveillance drone from scratch. Engineered modular 3D-printed body for easy assembly and maintenance. Integrated Pixhawk flight controller with ESC and 1200KV BLDC motors for high-performance flight capabilities.`,
			technologies: ["Pixhawk", "ESC", "BLDC Motors", "3D Printing", "Drone Design", "Flight Control"],
			category: "Robotics Hardware",
			year: "2022",
			status: "Completed",
			achievements: ["Custom modular design", "3D printed body", "High-performance flight system"],
			image: "images/thumbs/drone.gif",
			github: "",
			demo: ""
		},
		{
			id: 14,
			name: "Lane Detection using Hough Transform",
			shortName: "Hough Lane Detection",
			description: "Vision-based lane recognition algorithm for self-driving cars using Hough Transform and histogram techniques.",
			longDescription: `Implemented computer vision-based lane detection system for autonomous vehicles. Utilized Hough Transform for line detection and histogram-based segmentation for identifying lane markings. Developed robust algorithm for various lighting and road conditions.`,
			technologies: ["Python", "OpenCV", "Computer Vision", "Hough Transform", "Image Processing"],
			category: "Computer Vision",
			year: "2023",
			status: "Completed",
			achievements: ["Hough Transform implementation", "Histogram-based segmentation", "Robust lane detection"],
			image: "images/thumbs/lane_detect.png",
			github: "",
			demo: ""
		},
		{
			id: 15,
			name: "e-Yantra Robotics Competition",
			shortName: "eYRC",
			description: "Participated in e-Yantra Robotics Competition organized by IIT Bombay.",
			longDescription: `Competed in the prestigious e-Yantra Robotics Competition organized by IIT Bombay. Developed autonomous robot for competition tasks involving navigation, object manipulation, and problem-solving challenges.`,
			technologies: ["Embedded Systems", "Robot Control", "Sensors", "Arduino", "Autonomous Navigation"],
			category: "Robotics Competition",
			year: "2021",
			status: "Completed",
			achievements: ["IIT Bombay competition", "Autonomous robot development"],
			image: "images/thumbs/eyrc1.png",
			github: "",
			demo: ""
		}
	],

	// Technical Skills
	skills: {
		languages: ["Python", "C++", "C", "JavaScript", "MATLAB", "Bash"],
		frameworks: ["ROS", "ROS2", "TensorFlow", "PyTorch", "OpenCV", "Gazebo"],
		robotics: ["Path Planning", "SLAM", "Computer Vision", "Sensor Fusion", "Control Systems", "Autonomous Navigation"],
		ml: ["Reinforcement Learning", "Deep Learning", "Neural Networks", "Computer Vision", "Object Detection"],
		tools: ["Git", "Docker", "Linux", "CARLA", "PCL", "NumPy", "Matplotlib"],
		hardware: ["LiDAR", "Cameras", "IMU", "GPS", "Embedded Systems", "Arduino"]
	},

	// Contact Information
	contact: {
		email: ["Vaibhavvraheja@gmail.com", "vraheja3@illinois.edu"],
		phone: "+1 (217) 202-9970",
		location: "Champaign, Illinois, USA",
		github: "github.com/vaibhav-raheja",
		linkedin: "linkedin.com/in/vaibhav-raheja",
		medium: "medium.com/@vaibhavraheja32",
		resume: "https://vaibhav-raheja.github.io/CV/Vaibhav_Resume.pdf"
	},

	// Social Links
	social: [
		{
			name: "GitHub",
			url: "https://github.com/vaibhav-raheja",
			username: "@vaibhav-raheja",
			icon: "fab fa-github"
		},
		{
			name: "LinkedIn",
			url: "https://www.linkedin.com/in/vaibhav-raheja/",
			username: "vaibhav-raheja",
			icon: "fab fa-linkedin"
		},
		{
			name: "Medium",
			url: "https://medium.com/@vaibhavraheja32",
			username: "@vaibhavraheja32",
			icon: "fab fa-medium"
		},
		{
			name: "Email",
			url: "mailto:Vaibhavvraheja@gmail.com",
			username: "Vaibhavvraheja@gmail.com",
			icon: "fas fa-envelope"
		}
	],

	// Fun Facts & Easter Eggs
	funFacts: [
		"Started coding at age 12",
		"Built first robot at age 15",
		"Competed in 10+ robotics competitions",
		"Coffee-powered debugging sessions",
		"vim > emacs (fight me)",
		"Favorite robot: R2D2",
		"Dream project: Autonomous Mars rover"
	],

	// Portfolio Stats
	stats: {
		projectsCompleted: 15,
		linesOfCode: "50000+",
		robotsBuilt: 8,
		cupsOfCoffee: "∞",
		githubRepos: 25,
		yearsExperience: 3
	}
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
	module.exports = portfolioData;
}
