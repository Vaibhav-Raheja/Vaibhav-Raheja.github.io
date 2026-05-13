const portfolioData = {
  personal: {
    name: "Vaibhav Raheja",
    title: "Robotics Engineer",
    location: "San Francisco, CA",
    resume: "https://vaibhav-raheja.github.io/CV/Vaibhav_Resume.pdf",
    photo: "images/profile-vaibhav.jpg",
    headline: "I build robot systems that survive the field.",
    heroLede: "Robotics engineer focused on autonomy, perception, field deployment, and hardware-software integration. I have worked on deployed inspection robots, autonomous navigation vehicles, simulation-to-hardware locomotion, and medical robotics prototypes.",
    workIntro: "Five projects selected for technical depth, integration scope, and evidence of systems thinking. Each one had constraints beyond writing an isolated algorithm.",
    about: [
      "Robotics engineer, originally from Mumbai. I did my M.Eng at UIUC and am now in San Francisco. My best work sits in the gap between a working demo and a deployed system: software, sensors, actuators, operators, and field conditions.",
      "Outside the lab: I follow F1 obsessively and will explain tyre strategies and undercuts to anyone who'll sit still long enough. I play tennis, like the beach, drive whenever I get the chance, and genuinely enjoy a good networking event. I like meeting people who are building things.",
      "I care about logging, reproducibility, failure modes, maintainable interfaces, and the handoff from prototype to deployed system. Robotics gets expensive when nobody can explain why the robot did what it did."
    ]
  },

  proof: [
    { value: ">95%", label: "field uptime", note: "Solarbot deployed units" },
    { value: "40%", label: "fewer false detections", note: "after fusion and calibration work" },
    { value: "35+", label: "robotics PRs merged", note: "C++ and Python stack" },
    { value: "3+", label: "robot units delivered", note: "commercial solar sites" }
  ],

  featuredProjects: [
    {
      id: "solarbot",
      title: "Solarbot",
      category: "Autonomous solar inspection",
      year: "2024-2026",
      role: "Robotics Engineer / Project Lead, EarthSense",
      outcome: "Led robotics software and field integration for autonomous solar panel inspection robots across multiple commercial sites.",
      summary: "Solarbot combined LiDAR navigation, PTZ visual inspection, thermal imaging, ROS2 services, Dockerized deployment, telemetry, and remote intervention. My role moved from sensor prototyping into system ownership and team coordination.",
      stack: ["ROS2", "Docker", "Hesai LiDAR", "PTZ cameras", "Seek thermal", "AWS Kinesis WebRTC", "C++", "Python"],
      facts: ["3+ robot units", ">95% field uptime", "40% fewer false detections", "43-46 C validation"],
      image: "images/thumbs/solarbot.jpg",
      video: "images/thumbs/solarbot.mp4",
      imageAlt: "Solarbot autonomous inspection robot in a solar field",
      links: [],
      notes: {
        problem: "Solar farms need repeatable inspection without sending people through rows of panels for every anomaly. The engineering challenge was reliability: outdoor heat, mixed sensors, remote operation, and false detections that had to be reduced from field evidence.",
        constraints: [
          "Commercial deployments needed reproducible software behavior across robot units",
          "Sensors had to remain useful in 43-46 C field conditions",
          "Operators needed remote visibility and an intervention path when autonomy was not enough"
        ],
        role: "Led the Solarbot robotics effort across perception, telemetry, deployment, field debugging, and coordination with an 8+ person cross-functional team.",
        approach: "Built and maintained a ROS2-based system for navigation, inspection, thermal sensing, telemetry, and remote intervention. Docker was used to reduce drift between development machines, lab machines, and field robots.",
        tradeoffs: [
          "Used explicit ROS2 launch and lifecycle patterns over one-off shell scripts so field bring-up was easier to reason about",
          "Favored log-driven calibration iterations over relying on lab assumptions",
          "Built a Kinesis WebRTC teleoperation proof of concept for low-latency monitoring without making teleop the default operating mode"
        ],
        outcome: [
          "Helped deliver 3+ robot units for commercial solar-farm deployments",
          "Helped maintain >95% field uptime",
          "Helped reduce false detections by 40% through sensor fusion, calibration, and field iteration",
          "Contributed 35+ merged PRs across C++ and Python robotics software"
        ]
      }
    },
    {
      id: "igvc",
      title: "IGVC Team DARVIN",
      category: "Outdoor autonomous navigation",
      year: "2022-2023",
      role: "Vice-Captain, Team DARVIN, UIUC",
      outcome: "Vice-captain for an autonomous ground vehicle that placed 2nd in Cyber Challenge and 3rd in AutoNav.",
      summary: "The vehicle had to follow outdoor lanes, avoid obstacles, navigate GPS waypoints, and stay operational under competition pressure. I worked across perception, planning, integration, and test readiness.",
      stack: ["ROS", "C++", "Python", "LiDAR", "computer vision", "path planning", "sensor fusion"],
      facts: ["2nd Cyber Challenge", "3rd AutoNav", "outdoor course"],
      image: "images/thumbs/igvc_thumb.jpg",
      gif: "images/thumbs/IGVC.gif",
      imageAlt: "Autonomous ground vehicle from Team DARVIN",
      links: [],
      notes: {
        problem: "IGVC rewards complete autonomy more than isolated demos. The system must understand lanes, obstacles, and waypoints outdoors while still being debuggable during competition runs.",
        constraints: [
          "Outdoor perception had variable lighting and noisy lane markings",
          "Competition debugging windows were short, so subsystem boundaries mattered"
        ],
        role: "Vice-captain with responsibilities across autonomy integration, testing, and competition execution.",
        approach: "Integrated LiDAR obstacle detection, camera-based lane understanding, waypoint handling, and path planning into a ROS system that could be tested by module and then run end to end.",
        tradeoffs: [
          "Kept perception, planning, and control modules loosely coupled to isolate failures quickly",
          "Combined LiDAR and camera signals rather than depending on one outdoor perception channel",
          "Prioritized repeatable test routes and logs before competition runs"
        ],
        outcome: [
          "Placed 2nd in Cyber Challenge",
          "Placed 3rd in AutoNav",
          "Completed autonomous course runs with obstacle avoidance and waypoint following"
        ]
      }
    },
    {
      id: "graic",
      title: "GRAIC in CARLA",
      category: "Autonomous racing planner",
      year: "2023",
      role: "Developer, UIUC",
      outcome: "Improved Shanghai circuit lap time by 40.8% over baseline using Hybrid A* planning and a tuned PD controller.",
      summary: "This was a planning and control exercise under racing constraints: non-holonomic motion, obstacle-aware replanning, and controller tuning that mattered at speed.",
      stack: ["Python", "CARLA", "Hybrid A*", "PD control", "ROS"],
      facts: ["40.8% faster lap", "Hybrid A*", "dynamic obstacles", "controller tuning"],
      image: "images/thumbs/graic_thumb.jpg",
      gif: "images/thumbs/GRAIC.gif",
      imageAlt: "Autonomous racing scene from the CARLA simulator",
      links: [
        { label: "Source", url: "https://github.com/Vaibhav-Raheja/GRAIC" }
      ],
      notes: {
        problem: "The baseline racing stack could complete laps, but it left time on the table and did not handle track geometry aggressively enough.",
        constraints: [
          "Planner had to respect vehicle kinematics and turn-radius limits",
          "Controller needed to stay stable through fast straights and tight corners",
          "Replanning had to remain fast enough for simulator execution"
        ],
        role: "Designed and tuned the planning/control approach for the competition stack.",
        approach: "Benchmarked planning options, selected Hybrid A* for feasible vehicle motion, and paired it with a PD controller for steering, speed, and braking.",
        tradeoffs: [
          "Selected Hybrid A* over simpler spline approaches because feasibility mattered more than visual smoothness",
          "Tuned gains against different track segments instead of relying on one comfortable global setting",
          "Added obstacle-aware replanning so the race line was not treated as fixed"
        ],
        outcome: [
          "Reduced lap time by 40.8% over baseline on the Shanghai circuit",
          "Completed final runs without collisions",
          "Kept planning fast enough for real-time CARLA execution"
        ]
      }
    },
    {
      id: "unitree-go1",
      title: "Unitree Go1 RL Benchmark",
      category: "Legged locomotion",
      year: "2024",
      role: "Developer, UIUC",
      outcome: "Compared factory MPC and learned locomotion in Isaac Sim, then deployed the RL controller on physical Go1 hardware.",
      summary: "The useful part was benchmark discipline: define metrics, run both controllers against the same scenarios, and check where sim-to-real transfer actually held up.",
      stack: ["Python", "Isaac Sim", "reinforcement learning", "Unitree Go1", "sim-to-real"],
      facts: ["physical Go1 deployment", "MPC vs RL", "grass / gravel / inclines", "metric-led testing"],
      image: "images/thumbs/go1_thumb.jpg",
      gif: "images/thumbs/Go1.gif",
      imageAlt: "Unitree Go1 quadruped robot during locomotion testing",
      links: [],
      notes: {
        problem: "RL locomotion can look strong in simulation, but the practical question is where it beats a factory controller on measurable behavior and whether it transfers to hardware.",
        constraints: [
          "Simulation metrics had to be defined before tuning conclusions",
          "The learned controller had to leave simulation and run on physical hardware",
          "Terrain tests needed to go beyond flat indoor floors"
        ],
        role: "Built the benchmark workflow and deployed the learned controller for hardware checks.",
        approach: "Used Isaac Sim to compare factory MPC and learned locomotion across velocity tracking, body stability, and terrain response, then deployed the RL controller on a physical Unitree Go1.",
        tradeoffs: [
          "Separated simulator observations from hardware observations to expose transfer gaps",
          "Used terrain variation to identify where RL was useful rather than assuming it was better everywhere",
          "Focused on comparable controller behavior instead of only producing an impressive demo"
        ],
        outcome: [
          "Ran side-by-side MPC and RL comparisons",
          "Deployed the RL controller on physical Go1 hardware",
          "Tested locomotion on grass, gravel, and inclined surfaces"
        ]
      }
    },
    {
      id: "aiims-intubation",
      title: "Robot-Assisted Intubation",
      category: "Medical robotics",
      year: "2021-2023",
      role: "Robotics Research Developer, AIIMS Hospital via NMIMS",
      outcome: "Developed an ICMR-funded xArm5 teleoperation prototype for assisted intubation with camera-guided catheter tooling.",
      summary: "The project sat at the intersection of robotic manipulation, surgeon-facing control, rapid end-effector iteration, and real-time visual feedback.",
      stack: ["xArm5", "Python", "ROS", "OpenCV", "3D printing", "HOTAS teleoperation"],
      facts: ["ICMR funded", "xArm5", "custom catheter", "camera feedback"],
      image: "images/thumbs/xarm_thumb.jpg",
      video: "images/thumbs/xarm.mp4",
      imageAlt: "xArm robotic arm used for robot-assisted intubation prototyping",
      links: [],
      notes: {
        problem: "Endotracheal intubation requires precise navigation through sensitive anatomy. The prototype needed to give an operator controlled, visible, repeatable motion without overcomplicating the interface.",
        constraints: [
          "The end-effector had to support airway visualization",
          "Control had to remain understandable to a human operator",
          "Hardware iteration needed to be fast enough for interdisciplinary feedback"
        ],
        role: "Designed and integrated the robotic prototype, end-effector, teleoperation workflow, and camera feedback path.",
        approach: "Built a teleoperated xArm5 system with HOTAS input, ROS integration, OpenCV video processing, and a 3D-printed catheter end-effector with an integrated camera.",
        tradeoffs: [
          "Used HOTAS control to preserve hand-eye coordination instead of introducing an abstract control surface",
          "Used 3D printing so catheter geometry could change quickly after feedback",
          "Kept camera feedback central because the operator needed direct visual confirmation"
        ],
        outcome: [
          "Built and demonstrated a robot-assisted intubation prototype",
          "Integrated real-time camera feedback into the teleoperation workflow",
          "Produced an interdisciplinary prototype across engineering and medical collaborators"
        ]
      }
    }
  ],

  experience: [
    {
      role: "Founding Engineer",
      company: "TerraWise Solutions",
      location: "San Francisco, CA",
      period: "Mar 2026 - Present",
      current: true,
      summary: "Building the complete robotics stack for autonomous platforms from scratch, from early architecture through hardware integration.",
      details: [
        "Building stop-by-obstacle behavior using LiDAR for safe autonomous navigation",
        "Designing and implementing the full robotics stack from scratch on new autonomous platforms",
        "Applying field-proven ROS2 and Docker deployment practices across hardware-software boundaries"
      ]
    },
    {
      role: "Robotics Engineer / Project Lead",
      company: "EarthSense, Inc.",
      location: "Champaign, IL",
      period: "Aug 2024 - Mar 2026",
      current: false,
      summary: "Led Solarbot robotics work across autonomy, perception, telemetry, deployment, and field debugging.",
      details: [
        "Integrated Hesai / Unitree LiDAR, PTZ cameras, and Seek thermal imaging through ROS2 and Docker",
        "Helped achieve >95% field uptime and 40% fewer false detections through calibration and log-driven iteration",
        "Built an AWS Kinesis WebRTC teleoperation proof of concept for remote monitoring and control",
        "Contributed 35+ merged PRs across C++ and Python robotics software"
      ]
    },
    {
      role: "Robotics Research Developer",
      company: "Intelligent Motion Laboratory, UIUC",
      location: "Champaign, IL",
      period: "Aug 2023 - Dec 2023",
      current: false,
      summary: "Worked on vision-based head-pose estimation for robotic eye examination workflows.",
      details: [
        "Integrated MediaPipe FaceMesh and ZED depth sensing with UR5-based tracking",
        "Focused on real-time 3D tracking behavior for robotics-assisted examination"
      ]
    },
    {
      role: "Robotics Research Developer",
      company: "AIIMS Hospital via NMIMS",
      location: "Mumbai, India",
      period: "Feb 2021 - May 2023",
      current: false,
      summary: "Engineered an ICMR-funded robot-assisted intubation prototype on xArm5.",
      details: [
        "Designed a camera-equipped catheter end-effector",
        "Built a HOTAS teleoperation workflow for controlled manipulation"
      ]
    }
  ],

  capabilities: [
    {
      title: "Autonomy",
      items: "Path planning, SLAM, localization, Hybrid A*, particle filters, EKF, waypoint following, navigation behavior"
    },
    {
      title: "Perception",
      items: "OpenCV, LiDAR processing, depth cameras, sensor fusion, camera calibration, thermal imaging, object detection"
    },
    {
      title: "Robot software",
      items: "ROS, ROS2, Gazebo, CARLA, MoveIt, message design, launch systems, drivers, state machines"
    },
    {
      title: "Learning + simulation",
      items: "PyTorch, reinforcement learning, sim-to-real transfer, Isaac Sim, CNNs, DQN, controller benchmarking"
    },
    {
      title: "Deployment",
      items: "Docker, Linux, Git, AWS Kinesis, WebRTC, telemetry, remote monitoring, field logs, reproducible releases"
    },
    {
      title: "Hardware integration",
      items: "Hesai LiDAR, Unitree LiDAR, PTZ cameras, Seek thermal, IMU, GPS, Arduino, Raspberry Pi, xArm5, UR5"
    }
  ],

  education: [
    {
      degree: "M.Eng Autonomy and Robotics",
      institution: "University of Illinois Urbana-Champaign",
      period: "Aug 2023 - Dec 2024"
    },
    {
      degree: "B.Tech Computer Engineering",
      institution: "Mukesh Patel School of Technology Management & Engineering, NMIMS",
      period: "Jul 2019 - Jun 2023"
    }
  ],

  sideProjects: [
    {
      id: "domain-adaptation",
      title: "Satellite Image Domain Adaptation",
      year: "2024",
      category: "Computer Vision",
      description: "Used FastCUT (contrastive unpaired translation) to adapt building segmentation models across two satellite datasets: WHU-Building and Inria Aerial. Core problem: models trained on one city's imagery fall apart on another's. This fixed that without paired data.",
      stack: ["Python", "PyTorch", "FastCUT", "MMSegmentation"],
      link: "https://github.com/Vaibhav-Raheja/Domain-Adaptation-using-Satellite-Images"
    },
    {
      id: "robotis-mini",
      title: "Robotis Mini ROS Control",
      year: "2023",
      category: "Humanoid / ROS",
      description: "Built a ROS simulation and control stack for the Robotis Mini humanoid from scratch for ECE 598. Covered joint control, motion planning, and closing the gap between simulation and hardware behavior.",
      stack: ["ROS", "Python", "Robotis Mini", "Simulation"],
      link: "https://github.com/Vaibhav-Raheja/Robotis_Mini"
    },
    {
      id: "skin-disease",
      title: "Skin Disease Detection",
      year: "2022",
      category: "Medical AI / CNN",
      description: "Trained a CNN to classify skin diseases from dermatoscopic images. Full pipeline: preprocessing, training, validation. Built because dermatology access is unequal and a solid classifier is a useful baseline to beat.",
      stack: ["Python", "TensorFlow", "CNN", "Image Classification"],
      link: "https://github.com/Vaibhav-Raheja/Skin-Disease-Detection"
    },
    {
      id: "multi-disease",
      title: "Multi-Disease Prediction System",
      year: "2022",
      category: "Healthcare ML",
      description: "One system, four chronic diseases: kidney (LR + random forest), diabetes (LR + KNN), heart disease (RF + decision tree), pneumonia (CNN on chest X-rays). Integrated prediction pipeline, not four isolated notebooks.",
      stack: ["Python", "scikit-learn", "CNN", "Random Forest", "KNN"],
      link: "https://github.com/Vaibhav-Raheja/Multi-Disease-Prediction-System"
    },
    {
      id: "autonomy-mini",
      title: "Autonomy Mini-Projects",
      year: "2023–2024",
      category: "State Estimation / SLAM",
      description: "Autonomy fundamentals from my M.Eng: EKF for trajectory estimation, particle filter localization, SLAM, RTAB-Map 3D mapping, and lane detection with computer vision. Each one implemented from scratch, not wrapped around existing libraries.",
      stack: ["Python", "ROS", "EKF", "Particle Filter", "SLAM", "RTAB-Map", "OpenCV"],
      link: "https://github.com/Vaibhav-Raheja/Mini-Projects"
    }
  ],

  contact: {
    email: "Vaibhavvraheja@gmail.com",
    linkedin: "https://www.linkedin.com/in/vaibhav-raheja/",
    github: "https://github.com/vaibhav-raheja",
    resume: "https://vaibhav-raheja.github.io/CV/Vaibhav_Resume.pdf"
  }
};
