// Virtual File System for Portfolio Navigation
// Provides directory structure and file management

const FileSystem = {
	// Current working directory
	currentPath: '/home/vaibhav',

	// Home directory shortcut
	homeDir: '/home/vaibhav',

	// File system structure
	structure: {
		'/home/vaibhav': {
			type: 'directory',
			files: {
				'README.md': {
					type: 'file',
					content: `# Vaibhav Raheja - Robotics Engineer

Welcome to my interactive terminal portfolio!

## Quick Navigation:
- cd education/    - View my education
- cd experience/   - Explore work history
- cd projects/     - Browse my projects
- cd skills/       - See technical skills
- cd contact/      - Get in touch

## Commands:
- ls              - List directory contents
- cat [file]      - View file contents
- cd [directory]  - Change directory
- pwd             - Print working directory
- tree            - Show directory structure
- help            - Show all commands

Type 'help' for more commands!`
				},
				'about.txt': {
					type: 'file',
					content: portfolioData.personal.bio
				}
			},
			directories: {
				'education': {
					type: 'directory',
					files: {
						'masters.txt': {
							type: 'file',
							content: `${portfolioData.education[0].degree}
${portfolioData.education[0].institution}
${portfolioData.education[0].location}
${portfolioData.education[0].year}

Highlights:
${portfolioData.education[0].highlights.map(h => `- ${h}`).join('\n')}`
						},
						'bachelors.txt': {
							type: 'file',
							content: `${portfolioData.education[1].degree}
${portfolioData.education[1].institution}
${portfolioData.education[1].location}
${portfolioData.education[1].year}

Highlights:
${portfolioData.education[1].highlights.map(h => `- ${h}`).join('\n')}`
						}
					},
					directories: {}
				},
				'experience': {
					type: 'directory',
					files: {},
					directories: {}
				},
				'projects': {
					type: 'directory',
					files: {},
					directories: {
						'igvc': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# Intelligent Ground Vehicle Competition (IGVC)

**Status:** ${portfolioData.projects[0].status} | **Year:** ${portfolioData.projects[0].year} | **Category:** ${portfolioData.projects[0].category}

## Overview
${portfolioData.projects[0].description}

## Detailed Description
${portfolioData.projects[0].longDescription}

The competition, hosted at Oakland University, Michigan, challenged teams to develop autonomous vehicles capable of navigating outdoor environments while detecting and avoiding obstacles, following GPS waypoints, and adhering to lane boundaries.

## Key Achievements
${portfolioData.projects[0].achievements.map(a => `- ${a}`).join('\n')}

## Technologies Used
${portfolioData.projects[0].technologies.map(t => `- ${t}`).join('\n')}

## Implementation Highlights
- Integrated multiple sensor systems for comprehensive environmental perception
- Developed robust path planning algorithms for dynamic obstacle avoidance
- Implemented real-time decision-making systems for autonomous navigation
- Optimized vehicle control systems for precise maneuvering

## Competition Results
- **2nd Place** in Cyber Challenge
- **3rd Place** in AutoNAV Challenge
- Successfully completed all challenge requirements

## Media
Use 'view demo.gif' to see the autonomous vehicle in action!`
								},
								'demo.gif': {
									type: 'media',
									path: 'images/thumbs/IGVC.gif',
									mediaType: 'image/gif'
								}
							},
							directories: {}
						},
						'reinforcement-learning': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# Reinforcement Learning for Game Optimization

**Status:** ${portfolioData.projects[1].status} | **Year:** ${portfolioData.projects[1].year} | **Category:** ${portfolioData.projects[1].category}

## Overview
${portfolioData.projects[1].description}

## Detailed Description
${portfolioData.projects[1].longDescription}

## Implementation Details
This project implemented two advanced reinforcement learning algorithms:

### Deep Q-Network (DQN)
- Utilized neural networks to approximate Q-values
- Employed experience replay memory for stable training
- Implemented ε-greedy policy for exploration vs exploitation balance
- Achieved mean reward of **8.04**

### Double DQN
- Enhanced DQN with separate networks for action selection and evaluation
- Reduced overestimation bias in Q-value predictions
- Improved training stability through decoupled target network
- Achieved mean reward of **10.1**

## Key Results
${portfolioData.projects[1].achievements.map(a => `- ${a}`).join('\n')}

## Technologies Used
${portfolioData.projects[1].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Implemented replay memory buffer for experience sampling
- Optimized ε-greedy exploration strategy with decay
- Used target network updates for stable Q-learning
- Achieved 25% performance improvement with Double DQN over baseline DQN

## Media
Use 'view demo.gif' to see the trained agent in action!`
								},
								'demo.gif': {
									type: 'media',
									path: 'images/thumbs/rl-video-episode-0.gif',
									mediaType: 'image/gif'
								}
							},
							directories: {}
						},
						'graic': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# Generalized Racing Intelligence Competition (GRAIC)

**Status:** ${portfolioData.projects[2].status} | **Year:** ${portfolioData.projects[2].year} | **Category:** ${portfolioData.projects[2].category}

## Overview
${portfolioData.projects[2].description}

## Detailed Description
${portfolioData.projects[2].longDescription}

## Implementation Details

### Path Planning: Hybrid A* Algorithm
- Combined discrete A* search with continuous state space exploration
- Optimized waypoint navigation in complex racetrack environments
- Accounted for vehicle kinematics and dynamic constraints
- Generated smooth, drivable trajectories for high-speed racing

### Control System: PD Controller
- Implemented Proportional-Derivative controller for real-time vehicle control
- Managed steering angle adjustments for precise trajectory tracking
- Controlled speed and braking for optimal cornering
- Integrated obstacle avoidance into control loop

## Key Achievements
${portfolioData.projects[2].achievements.map(a => `- ${a}`).join('\n')}

## Technologies Used
${portfolioData.projects[2].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Real-time path planning and replanning capabilities
- Robust control under varying track conditions
- Sensor integration for environmental perception
- Competition-ready autonomous racing system

## Links
${portfolioData.projects[2].github ? '- GitHub: ' + portfolioData.projects[2].github : '- GitHub: Repository not available'}

## Media
Use 'view demo.gif' to see the autonomous racing car in action!`
								},
								'demo.gif': {
									type: 'media',
									path: 'images/thumbs/GRAIC.gif',
									mediaType: 'image/gif'
								}
							},
							directories: {}
						},
						'slam': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# LiDAR-Based SLAM Implementation

**Status:** ${portfolioData.projects[3].status} | **Year:** ${portfolioData.projects[3].year} | **Category:** ${portfolioData.projects[3].category}

## Overview
${portfolioData.projects[3].description}

## Detailed Description
${portfolioData.projects[3].longDescription}

## Implementation Details

### SLAM Pipeline
1. **LiDAR Data Acquisition**: Processed raw point cloud data from LiDAR sensor
2. **Localization**: Used Extended Kalman Filter (EKF) for trajectory estimation
3. **Mapping**: Applied split-and-merge line fitting to identify geometric features
4. **Validation**: Compared results with Gmapping-generated maps

### Split-and-Merge Algorithm
- Segmented LiDAR scans into line features
- Identified corners and walls for map construction
- Reduced noise through recursive line fitting
- Created geometric map representation from extracted features

### Extended Kalman Filter (EKF)
- Estimated robot pose using motion and sensor models
- Fused odometry with LiDAR measurements
- Maintained uncertainty estimates for localization
- Enabled real-time trajectory tracking

## Key Achievements
${portfolioData.projects[3].achievements.map(a => `- ${a}`).join('\n')}

## Technologies Used
${portfolioData.projects[3].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Custom SLAM implementation without pre-built libraries
- Real-time processing of LiDAR point cloud data
- Robust feature extraction in complex environments
- Validation against industry-standard Gmapping

## Media
Use 'view map.jpg' to see the generated SLAM map!`
								},
								'map.jpg': {
									type: 'media',
									path: 'images/thumbs/SLAM.jpg',
									mediaType: 'image/jpeg'
								}
							},
							directories: {}
						},
						'lane-detection': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# Lane Detection Using Computer Vision

**Status:** ${portfolioData.projects[4].status} | **Year:** ${portfolioData.projects[4].year} | **Category:** ${portfolioData.projects[4].category}

## Overview
${portfolioData.projects[4].description}

## Detailed Description
${portfolioData.projects[4].longDescription}

## Implementation Pipeline

### 1. Image Preprocessing
- Applied Gaussian blur for noise reduction
- Converted to grayscale for edge detection
- Enhanced contrast for better lane visibility

### 2. Edge Detection
- Applied Sobel gradient thresholds to identify lane edges
- Used color thresholds to detect white and yellow lane markings
- Combined gradient and color information for robust detection

### 3. Perspective Transformation
- Applied bird's-eye view transformation
- Created top-down perspective for accurate lane curvature measurement
- Enabled better lane center identification

### 4. Lane Detection
- Used histogram-based segmentation to locate lane peaks
- Identified highest pixel density areas as lane positions
- Calculated lane center from left and right lane boundaries
- Generated steering commands based on lane center offset

## Key Achievements
${portfolioData.projects[4].achievements.map(a => `- ${a}`).join('\n')}

## Technologies Used
${portfolioData.projects[4].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Real-time video processing pipeline
- Robust to varying lighting conditions
- Handles curved and straight roads
- Integration with ROS for autonomous vehicle control

## Media
Use 'view demo.gif' to see the lane detection system in action!`
								},
								'demo.gif': {
									type: 'media',
									path: 'images/thumbs/Lane_detect.gif',
									mediaType: 'image/gif'
								}
							},
							directories: {}
						},
						'particle-filter': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# Monte Carlo Localization (Particle Filter)

**Status:** ${portfolioData.projects[5].status} | **Year:** ${portfolioData.projects[5].year} | **Category:** ${portfolioData.projects[5].category}

## Overview
${portfolioData.projects[5].description}

## Detailed Description
${portfolioData.projects[5].longDescription}

## Algorithm Implementation

### Monte Carlo Localization (MCL)
Monte Carlo Localization is a probabilistic approach to robot localization using particle filters:

1. **Initialization**: Generated random particle distribution across possible poses
2. **Prediction**: Updated particles based on vehicle motion model
3. **Update**: Weighted particles using LiDAR sensor measurements
4. **Resampling**: Selected particles proportional to their weights
5. **Convergence**: Particles converged towards vehicle's actual location

### LiDAR Point Cloud Processing
- Developed custom module to process raw LiDAR data
- Calculated distances from particles to map obstacles
- Compared sensor readings with expected measurements
- Computed particle weights based on measurement likelihood

## Key Achievements
${portfolioData.projects[5].achievements.map(a => `- ${a}`).join('\n')}

## Technologies Used
${portfolioData.projects[5].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Probabilistic approach to localization
- Robust to sensor noise and uncertainty
- Real-time particle convergence visualization
- Integration with ROS/Gazebo simulation environment
- Custom point cloud processing for distance calculations

## Media
Use 'view demo.gif' to see the particle filter convergence in action!`
								},
								'demo.gif': {
									type: 'media',
									path: 'images/thumbs/Particle Filter.gif',
									mediaType: 'image/gif'
								}
							},
							directories: {}
						},
						'gem-e2': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# Autonomous Vehicle (GEM e2)

**Status:** ${portfolioData.projects[6].status} | **Year:** ${portfolioData.projects[6].year} | **Category:** ${portfolioData.projects[6].category}

## Overview
${portfolioData.projects[6].description}

## Detailed Description
${portfolioData.projects[6].longDescription}

## Project Scope

### GEMstack Framework
Learning and implementing the GEMstack framework for autonomous vehicle control:
- Modular architecture for vehicle software stack
- Integration of perception, planning, and control modules
- Real-time sensor data processing and fusion
- Robust communication between system components

### Focus Areas
1. **Navigation Algorithms**: Developing path planning and obstacle avoidance
2. **Control Systems**: Implementing vehicle dynamics control
3. **Sensor Integration**: Fusing data from multiple sensors (LiDAR, cameras, GPS, IMU)
4. **Real-world Testing**: Deploying and testing on actual GEM e2 platform

## Technologies Used
${portfolioData.projects[6].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Hands-on experience with real autonomous vehicle platform
- Integration of theoretical concepts with practical implementation
- Real-world sensor fusion and perception challenges
- Safety-critical system development

## Media
Use 'view demo.gif' to see the GEM e2 vehicle in action!`
								},
								'demo.gif': {
									type: 'media',
									path: 'images/thumbs/AV.gif',
									mediaType: 'image/gif'
								}
							},
							directories: {}
						},
						'unitree-go1': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# Reinforcement Learning on Unitree Go1

**Status:** ${portfolioData.projects[7].status} | **Year:** ${portfolioData.projects[7].year} | **Category:** ${portfolioData.projects[7].category}

## Overview
${portfolioData.projects[7].description}

## Detailed Description
${portfolioData.projects[7].longDescription}

## Project Objectives

### Controller Development
Developing advanced reinforcement learning controller for quadruped locomotion:
- Implementing state-of-the-art RL algorithms for robot control
- Training policies for various gaits (walking, trotting, running)
- Handling diverse terrains and environmental conditions
- Ensuring robust and stable locomotion

### Benchmarking Against MPC
Comparing RL controller performance with baseline Model Predictive Control:
- **Speed**: Locomotion velocity and agility
- **Stability**: Balance and robustness to disturbances
- **Energy Efficiency**: Power consumption during movement
- **Adaptability**: Performance across different terrains
- **Recovery**: Ability to handle unexpected perturbations

## Technologies Used
${portfolioData.projects[7].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Implementation of advanced RL algorithms for legged locomotion
- Sim-to-real transfer techniques
- Real-time policy execution on hardware
- Comparative analysis with traditional control methods
- Multi-terrain locomotion capabilities

## Expected Outcomes
- Improved locomotion performance over baseline MPC
- Robust controller for real-world deployment
- Insights into RL vs traditional control for robotics

## Media
Use 'view demo.gif' to see the Unitree Go1 in action!`
								},
								'demo.gif': {
									type: 'media',
									path: 'images/thumbs/Go1_small.gif',
									mediaType: 'image/gif'
								}
							},
							directories: {}
						},
						'vehicle-control': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# Vehicle Control System

**Status:** ${portfolioData.projects[8].status} | **Year:** ${portfolioData.projects[8].year} | **Category:** ${portfolioData.projects[8].category}

## Overview
${portfolioData.projects[8].description}

## Detailed Description
${portfolioData.projects[8].longDescription}

## Control System Architecture

### Longitudinal Controller
**Purpose**: Manage vehicle speed and acceleration
- Implemented PID control for speed regulation
- Commanded throttle and braking based on desired velocity
- Handled smooth acceleration and deceleration
- Ensured passenger comfort and safety

### Lateral Controller
**Purpose**: Manage vehicle steering and trajectory tracking
- Implemented Stanley controller for path following
- Calculated steering angle based on cross-track error
- Minimized heading error for precise trajectory tracking
- Enabled accurate waypoint following

## Key Achievements
${portfolioData.projects[8].achievements.map(a => `- ${a}`).join('\n')}

## Technologies Used
${portfolioData.projects[8].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Comprehensive control system for autonomous vehicle
- Real-world testing on GEM e2 platform
- Integration with GEMstack framework
- Precise trajectory tracking capabilities
- Safe and smooth vehicle operation

## Implementation Details
- Tuned PID parameters for optimal performance
- Tested in various scenarios (straight paths, curves, stops)
- Validated control accuracy through field testing
- Integrated with higher-level planning modules

## Media
Use 'view demo.gif' to see the vehicle control system in action!`
								},
								'demo.gif': {
									type: 'media',
									path: 'images/thumbs/VC.gif',
									mediaType: 'image/gif'
								}
							},
							directories: {}
						},
						'robotis-mini': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# Robotis Mini Robot Control

**Status:** ${portfolioData.projects[9].status} | **Year:** ${portfolioData.projects[9].year} | **Category:** ${portfolioData.projects[9].category}

## Overview
${portfolioData.projects[9].description}

## Detailed Description
${portfolioData.projects[9].longDescription}

## Project Scope

### Kinematics Implementation
Developing comprehensive kinematic models for humanoid robot control:

**Forward Kinematics**
- Calculating end-effector positions from joint angles
- Computing workspace limits and reachability
- Enabling motion planning and trajectory generation
- Simulating robot poses and movements

**Inverse Kinematics**
- Determining joint angles for desired end-effector positions
- Solving for arm and leg configurations
- Handling multiple solution cases
- Enabling task-space control

### Dual Platform Development
Working with both physical hardware and simulation:
- Real-world robot programming and control
- ROS simulation for rapid prototyping
- Bridging sim-to-real gap
- Testing algorithms safely before hardware deployment

## Technologies Used
${portfolioData.projects[9].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Hands-on humanoid robotics experience
- Mathematical modeling of robot kinematics
- Integration of theory with practical implementation
- ROS-based simulation environment
- Real hardware validation

## Learning Outcomes
- Understanding of robot kinematics principles
- Experience with humanoid robot control
- Sim-to-real transfer techniques
- ROS development skills

## Media
Use 'view robot.jpeg' to see the Robotis Mini robot!`
								},
								'robot.jpeg': {
									type: 'media',
									path: 'images/thumbs/Mini.jpeg',
									mediaType: 'image/jpeg'
								}
							},
							directories: {}
						},
						'robotic-hand': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# Semi-Soft Robotic Hand

**Status:** ${portfolioData.projects[10].status} | **Year:** ${portfolioData.projects[10].year} | **Category:** ${portfolioData.projects[10].category}

## Overview
${portfolioData.projects[10].description}

## Detailed Description
${portfolioData.projects[10].longDescription}

## Design and Implementation

### Mechanical Design
**5 Degrees of Freedom (DOF) System**
- Each finger controlled independently
- Semi-soft structure for safe human interaction
- 3D modeled components for custom design
- Optimized for dexterity and flexibility

### Electronics and Control
**Arduino-Based Control System**
- Five individual stepper motors for precise finger control
- Custom motor driver circuit design
- Real-time position control
- Coordinated multi-finger movements

### Fabrication Process
**3D Printing**
- Custom-designed finger segments
- Modular construction for easy assembly
- Iterative design improvements
- Material selection for flexibility

## Key Achievements
${portfolioData.projects[10].achievements.map(a => `- ${a}`).join('\n')}

## Technologies Used
${portfolioData.projects[10].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Complete design-to-deployment cycle
- Integration of mechanical, electrical, and software systems
- Independent finger actuation for complex grasping
- 3D modeling and manufacturing experience
- Embedded systems programming

## Applications
- Object manipulation and grasping
- Human-robot interaction research
- Assistive robotics
- Educational demonstrations

## Media
Use 'view hand.png' to see the semi-soft robotic hand!`
								},
								'hand.png': {
									type: 'media',
									path: 'images/thumbs/hand.png',
									mediaType: 'image/png'
								}
							},
							directories: {}
						},
						'disease-detection': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# Chronic Disease Detection System

**Status:** ${portfolioData.projects[11].status} | **Year:** ${portfolioData.projects[11].year} | **Category:** ${portfolioData.projects[11].category}

## Overview
${portfolioData.projects[11].description}

## Detailed Description
${portfolioData.projects[11].longDescription}

## System Architecture

### Disease Prediction Module
Implemented multiple ML algorithms for disease prediction:

**Classical Machine Learning**
- **Logistic Regression**: Binary classification for disease presence
- **Random Forest**: Ensemble method for robust predictions
- **K-Nearest Neighbor**: Instance-based learning approach
- **Support Vector Machines**: High-dimensional data classification

**Diseases Diagnosed**
- Kidney Disease
- Diabetes
- Heart Disease

### Medical Image Analysis Module
**Convolutional Neural Networks (CNN)**
- Deep learning for medical image classification
- Automated feature extraction from X-rays
- High accuracy in detecting respiratory conditions

**Diseases Detected from Images**
- Pneumonia
- COVID-19

## Key Achievements
${portfolioData.projects[11].achievements.map(a => `- ${a}`).join('\n')}

## Technologies Used
${portfolioData.projects[11].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Multi-disease detection platform
- Hybrid approach combining classical ML and deep learning
- Real-world medical data processing
- Published research findings in IEEE 2023
- Comprehensive evaluation metrics (accuracy, precision, recall, F1-score)

## Research Publication
**IEEE 2023**: Published research paper on machine learning approaches for chronic disease detection, contributing to medical AI literature.

## Impact
- Potential for early disease detection
- Assisting healthcare professionals in diagnosis
- Reducing diagnostic time and cost
- Improving healthcare accessibility

## Media
Use 'view system.png' to see the disease detection system!`
								},
								'system.png': {
									type: 'media',
									path: 'images/thumbs/fyp1.png',
									mediaType: 'image/png'
								}
							},
							directories: {}
						},
						'drone': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# Custom Surveillance Drone

**Status:** ${portfolioData.projects[12].status} | **Year:** ${portfolioData.projects[12].year} | **Category:** ${portfolioData.projects[12].category}

## Overview
${portfolioData.projects[12].description}

## Detailed Description
${portfolioData.projects[12].longDescription}

## Design and Build Process

### Mechanical Design
**Modular 3D-Printed Body**
- Custom-designed frame for optimal weight distribution
- Modular construction for easy maintenance and repairs
- Optimized for both stability and agility
- Protective housing for electronics

**Design Features**
- Lightweight yet durable structure
- Easy component access for servicing
- Aerodynamic considerations
- Scalable and customizable architecture

### Flight System
**High-Performance Components**
- **Pixhawk Flight Controller**: Advanced autopilot system with GPS and IMU
- **ESC (Electronic Speed Controllers)**: Precise motor control and power management
- **1200KV BLDC Motors**: High-efficiency brushless motors for powerful flight
- **Battery System**: Optimized for flight time and performance

### Flight Controller Integration
**Pixhawk Capabilities**
- Autonomous flight modes
- GPS waypoint navigation
- Stabilization and attitude control
- Telemetry and data logging
- Mission planning support

## Key Achievements
${portfolioData.projects[12].achievements.map(a => `- ${a}`).join('\n')}

## Technologies Used
${portfolioData.projects[12].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Complete drone built from scratch
- Integration of mechanical, electrical, and flight control systems
- 3D modeling and manufacturing pipeline
- Flight testing and tuning
- Modular design philosophy

## Applications
- Aerial surveillance and monitoring
- Autonomous navigation research
- Educational demonstrations
- Platform for sensor payload testing

## Media
Use 'view demo.gif' to see the custom drone in flight!`
								},
								'demo.gif': {
									type: 'media',
									path: 'images/thumbs/drone.gif',
									mediaType: 'image/gif'
								}
							},
							directories: {}
						},
						'hough-lane-detection': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# Lane Detection using Hough Transform

**Status:** ${portfolioData.projects[13].status} | **Year:** ${portfolioData.projects[13].year} | **Category:** ${portfolioData.projects[13].category}

## Overview
${portfolioData.projects[13].description}

## Detailed Description
${portfolioData.projects[13].longDescription}

## Algorithm Implementation

### Hough Transform Methodology
The Hough Transform is a classical computer vision technique for detecting geometric shapes:

**Working Principle**
1. **Edge Detection**: Apply Canny edge detector to identify potential lane edges
2. **Hough Space**: Transform image space to Hough (parameter) space
3. **Line Detection**: Identify lines by finding peaks in Hough space
4. **Line Filtering**: Filter detected lines based on slope and position
5. **Lane Identification**: Classify lines as left or right lane boundaries

### Image Processing Pipeline

**1. Preprocessing**
- Grayscale conversion for simplified processing
- Gaussian blur to reduce noise
- Region of interest (ROI) masking

**2. Edge Detection**
- Canny edge detection algorithm
- Adaptive thresholding for varying conditions
- Edge thinning for precise localization

**3. Hough Transform**
- Line detection in polar coordinate system
- Accumulator array for vote counting
- Peak detection for prominent lines

**4. Post-processing**
- Line averaging and extrapolation
- Temporal smoothing across frames
- Lane marking identification

## Key Achievements
${portfolioData.projects[13].achievements.map(a => `- ${a}`).join('\n')}

## Technologies Used
${portfolioData.projects[13].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Classical computer vision approach
- Robust to varying lighting conditions
- Real-time processing capability
- Handles both straight and slightly curved lanes
- Efficient computational performance

## Applications
- Autonomous vehicle lane keeping
- Driver assistance systems
- Lane departure warning systems
- Traffic lane analysis

## Media
Use 'view lane_detect.png' to see the Hough Transform lane detection!`
								},
								'lane_detect.png': {
									type: 'media',
									path: 'images/thumbs/lane_detect.png',
									mediaType: 'image/png'
								}
							},
							directories: {}
						},
						'eyrc': {
							type: 'directory',
							files: {
								'README.md': {
									type: 'file',
									content: `# e-Yantra Robotics Competition

**Status:** ${portfolioData.projects[14].status} | **Year:** ${portfolioData.projects[14].year} | **Category:** ${portfolioData.projects[14].category}

## Overview
${portfolioData.projects[14].description}

## Detailed Description
${portfolioData.projects[14].longDescription}

## Competition Details

### About e-Yantra
e-Yantra is a prestigious robotics competition organized by IIT Bombay, funded by the Ministry of Education, Government of India. The competition aims to:
- Promote robotics education and innovation
- Develop problem-solving skills through hands-on challenges
- Foster embedded systems and robotics expertise
- Encourage collaborative learning and teamwork

### Project Scope
Developed autonomous robot for complex competition challenges:

**Navigation**
- Path planning in constrained environments
- Obstacle detection and avoidance
- Precise position control
- Multi-waypoint navigation

**Object Manipulation**
- Pick and place operations
- Gripper control and coordination
- Object detection and recognition
- Task sequencing and execution

**Problem-Solving Challenges**
- Real-time decision making
- Strategy optimization
- Resource management
- Competition-specific task completion

## Key Achievements
${portfolioData.projects[14].achievements.map(a => `- ${a}`).join('\n')}

## Technologies Used
${portfolioData.projects[14].technologies.map(t => `- ${t}`).join('\n')}

## Technical Highlights
- Embedded systems programming
- Sensor integration and signal processing
- Motor control and actuation
- Algorithm development for autonomous behavior
- Hardware-software integration

## Learning Outcomes
- Hands-on robotics experience
- Competition robotics skills
- Team collaboration and project management
- Rapid prototyping and iteration
- Problem-solving under time constraints

## Competition Impact
- Exposure to prestigious IIT Bombay competition
- Networking with robotics enthusiasts nationwide
- Practical application of theoretical knowledge
- Portfolio-building experience

## Media
Use 'view competition.png' to see the e-Yantra robotics competition!`
								},
								'competition.png': {
									type: 'media',
									path: 'images/thumbs/eyrc1.png',
									mediaType: 'image/png'
								}
							},
							directories: {}
						}
					}
				},
				'skills': {
					type: 'directory',
					files: {
						'languages.txt': {
							type: 'file',
							content: `Programming Languages:\n${portfolioData.skills.languages.join(', ')}`
						},
						'frameworks.txt': {
							type: 'file',
							content: `Frameworks & Libraries:\n${portfolioData.skills.frameworks.join(', ')}`
						},
						'robotics.txt': {
							type: 'file',
							content: `Robotics Skills:\n${portfolioData.skills.robotics.join(', ')}`
						},
						'ml.txt': {
							type: 'file',
							content: `Machine Learning:\n${portfolioData.skills.ml.join(', ')}`
						},
						'tools.txt': {
							type: 'file',
							content: `Tools & Platforms:\n${portfolioData.skills.tools.join(', ')}`
						}
					},
					directories: {}
				},
				'contact': {
					type: 'directory',
					files: {
						'email.txt': {
							type: 'file',
							content: `Email Addresses:\n${portfolioData.contact.email.join('\n')}`
						},
						'phone.txt': {
							type: 'file',
							content: `Phone: ${portfolioData.contact.phone}`
						},
						'social.txt': {
							type: 'file',
							content: `Social Media:\n${portfolioData.social.map(s => `${s.name}: ${s.url}`).join('\n')}`
						}
					},
					directories: {}
				}
			}
		}
	},

	// Initialize experience files dynamically
	init() {
		// Add experience files
		const expDir = this.structure[this.homeDir].directories.experience;
		portfolioData.experience.forEach((exp, index) => {
			const filename = `${exp.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${exp.role.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
			expDir.files[filename] = {
				type: 'file',
				content: `${exp.role} @ ${exp.company}
${exp.location}
${exp.period}

Achievements:
${exp.achievements.map(a => `- ${a}`).join('\n')}

Technologies: ${exp.technologies.join(', ')}`
			};
		});
	},

	// Get contents of a directory
	getDirectoryContents(path) {
		const dir = this.resolvePath(path);
		if (!dir || dir.type !== 'directory') {
			return null;
		}

		const contents = [];

		// Add directories
		if (dir.directories) {
			Object.keys(dir.directories).forEach(name => {
				contents.push({
					name: name,
					type: 'directory',
					icon: ''
				});
			});
		}

		// Add files
		if (dir.files) {
			Object.keys(dir.files).forEach(name => {
				const file = dir.files[name];
				let icon = '';
				let itemType = 'file';

				if (file.type === 'media') {
					icon = '';
					itemType = 'media';
				} else if (name.endsWith('.md')) {
					icon = '';
				}

				contents.push({
					name: name,
					type: itemType,
					icon: icon,
					mediaPath: file.path
				});
			});
		}

		return contents;
	},

	// Resolve a path to its directory/file object
	resolvePath(path) {
		// Handle relative paths
		if (!path.startsWith('/')) {
			path = this.joinPath(this.currentPath, path);
		}

		// Handle . and ..
		path = this.normalizePath(path);

		// Split path and traverse
		const parts = path.split('/').filter(p => p);
		let current = this.structure['/home/vaibhav'];

		for (let i = 2; i < parts.length; i++) { // Skip 'home' and 'vaibhav'
			const part = parts[i];

			if (current.directories && current.directories[part]) {
				current = current.directories[part];
			} else if (current.files && current.files[part]) {
				return current.files[part];
			} else {
				return null;
			}
		}

		return current;
	},

	// Change directory
	cd(path) {
		// Handle ~ (home)
		if (path === '~' || path === '') {
			this.currentPath = this.homeDir;
			return { success: true, path: this.currentPath };
		}

		// Handle ..
		if (path === '..') {
			const parts = this.currentPath.split('/').filter(p => p);
			if (parts.length > 3) { // Don't go above /home/vaibhav
				parts.pop();
				this.currentPath = '/' + parts.join('/');
			}
			return { success: true, path: this.currentPath };
		}

		// Resolve full path
		const fullPath = path.startsWith('/') ? path : this.joinPath(this.currentPath, path);
		const normalized = this.normalizePath(fullPath);

		// Check if directory exists
		const dir = this.resolvePath(normalized);
		if (!dir || dir.type !== 'directory') {
			return { success: false, error: 'No such directory' };
		}

		this.currentPath = normalized;
		return { success: true, path: this.currentPath };
	},

	// Get file content
	getFile(filename) {
		const file = this.resolvePath(this.joinPath(this.currentPath, filename));
		return file;
	},

	// List directory contents
	ls(path = null) {
		const targetPath = path || this.currentPath;
		return this.getDirectoryContents(targetPath);
	},

	// Get current directory
	pwd() {
		return this.currentPath;
	},

	// Join path components
	joinPath(base, relative) {
		if (relative.startsWith('/')) return relative;
		return base + '/' + relative;
	},

	// Normalize path (resolve . and ..)
	normalizePath(path) {
		const parts = path.split('/').filter(p => p);
		const normalized = [];

		parts.forEach(part => {
			if (part === '..') {
				if (normalized.length > 2) normalized.pop(); // Don't go above /home/vaibhav
			} else if (part !== '.') {
				normalized.push(part);
			}
		});

		return '/' + normalized.join('/');
	},

	// Get short path for display (~ for home)
	getShortPath() {
		if (this.currentPath === this.homeDir) {
			return '~';
		}
		return this.currentPath.replace('/home/vaibhav', '~');
	},

	// Get all media files in current directory
	getMediaFiles() {
		const contents = this.getDirectoryContents(this.currentPath);
		if (!contents) return [];
		return contents.filter(item => item.type === 'media');
	}
};

// Initialize filesystem when loaded
if (typeof portfolioData !== 'undefined') {
	FileSystem.init();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
	module.exports = FileSystem;
}
