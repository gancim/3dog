import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Initialize scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue background
scene.fog = new THREE.Fog(0x87CEEB, 10, 20); // Add fog for depth

// Set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// Set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Create ground
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x7CFC00,
    side: THREE.DoubleSide
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI / 2;
ground.position.y = -0.5;
ground.receiveShadow = true;
scene.add(ground);

// Create trees
function createTree(x, z) {
    const tree = new THREE.Group();
    
    // Tree trunk
    const trunkGeometry = new THREE.BoxGeometry(0.3, 1, 0.3);
    const trunkMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8B4513,
        flatShading: true
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 0.5;
    tree.add(trunk);
    
    // Tree leaves
    const leavesGeometry = new THREE.ConeGeometry(1, 2, 4);
    const leavesMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x228B22,
        flatShading: true
    });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.y = 2;
    tree.add(leaves);
    
    tree.position.set(x, -0.5, z); // Adjusted y position to match ground level
    return tree;
}

// Add some trees around the scene
const trees = [
    createTree(-8, -8),
    createTree(8, -8),
    createTree(-8, 8),
    createTree(8, 8),
    createTree(-5, -5),
    createTree(5, -5),
    createTree(-5, 5),
    createTree(5, 5)
];

trees.forEach(tree => {
    scene.add(tree);
    // Add shadow to each tree
    tree.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });
});

// Walking space boundaries
const WALKING_SPACE = {
    minX: -8,
    maxX: 8,
    minZ: -8,
    maxZ: 8
};

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minPolarAngle = Math.PI / 4; // Prevent camera from going below 45 degrees
controls.maxPolarAngle = Math.PI / 2; // Prevent camera from going above horizontal
controls.minDistance = 3; // Minimum distance from target
controls.maxDistance = 10; // Maximum distance from target
controls.enablePan = false; // Disable panning to keep focus on dog
controls.target.set(0, 0, 0);
controls.update();

// Create Shiba Inu model
const createShibaInu = () => {
    const shiba = new THREE.Group();

    // Store original positions and rotations
    const originalPositions = {};
    const originalRotations = {};

    // Body
    const bodyGeometry = new THREE.BoxGeometry(1.2, 0.8, 1.4);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xE6A23C,
        flatShading: true
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    shiba.add(body);
    originalPositions.body = { x: 0, y: 0.15, z: 0 };
    originalRotations.body = { x: 0, y: 0, z: 0 };

    // Head
    const headGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const headMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xE6A23C,
        flatShading: true
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.95;
    head.position.z = 0.6;
    shiba.add(head);
    originalPositions.head = { x: 0, y: 0.95, z: 0.6 };
    originalRotations.head = { x: 0, y: 0, z: 0 };

    // Snout
    const snoutGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.4);
    const snoutMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xE6A23C,
        flatShading: true
    });
    const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
    snout.position.z = 0.55;
    head.add(snout);

    // Nose
    const noseGeometry = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const noseMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2C2C2C,
        flatShading: true
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.z = 0.3;
    snout.add(nose);

    // Eyes
    const eyeGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.08);
    const eyeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2C2C2C,
        flatShading: true
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, 0.15, 0.35);
    head.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, 0.15, 0.35);
    head.add(rightEye);

    // Cheeks
    const cheekGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    const cheekMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFFB6C1,
        flatShading: true
    });
    
    const leftCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
    leftCheek.position.set(-0.3, 0, 0.3);
    head.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeometry, cheekMaterial);
    rightCheek.position.set(0.3, 0, 0.3);
    head.add(rightCheek);

    // Modify ears based on breed type
    const earGeometry = new THREE.BoxGeometry(
        0.2,
        0.6,
        0.2
    );
    const earMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xE6A23C,
        flatShading: true
    });
    
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.35, 1.0, 0.3);
    leftEar.rotation.z = -0.2;
    shiba.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.35, 1.0, 0.3);
    rightEar.rotation.z = 0.2;
    shiba.add(rightEar);

    // Legs
    const legGeometry = new THREE.BoxGeometry(0.2, 0.5, 0.2);
    const legMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xE6A23C,
        flatShading: true
    });
    
    const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontLeftLeg.position.set(-0.4, -0.35, 0.5);
    shiba.add(frontLeftLeg);

    const frontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontRightLeg.position.set(0.4, -0.35, 0.5);
    shiba.add(frontRightLeg);

    const backLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    backLeftLeg.position.set(-0.4, -0.35, -0.5);
    shiba.add(backLeftLeg);

    const backRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    backRightLeg.position.set(0.4, -0.35, -0.5);
    shiba.add(backRightLeg);

    // Modify tail based on breed
    const tailGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.9);
    const tailMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xE6A23C,
        flatShading: true
    });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(0, 0.05, -0.8);
    tail.rotation.x = Math.PI / 2;
    shiba.add(tail);

    // Adjust body position
    body.position.y = 0.15;

    // Adjust head position
    head.position.y = 0.85;
    head.position.z = 0.5;

    // Adjust ears position
    leftEar.position.y = 0.9;
    rightEar.position.y = 0.9;

    // Adjust tail position
    tail.position.y = 0.05;

    // Function to reset position
    shiba.resetPosition = function() {
        // Reset body rotation
        body.rotation.set(
            originalRotations.body.x,
            originalRotations.body.y,
            originalRotations.body.z
        );
        
        // Reset head rotation
        head.rotation.set(
            originalRotations.head.x,
            originalRotations.head.y,
            originalRotations.head.z
        );
        
        // Reset legs rotations
        const legs = [
            shiba.children[5],
            shiba.children[6],
            shiba.children[7],
            shiba.children[8]
        ];
        legs.forEach(leg => {
            if (leg) {
                leg.rotation.set(0, 0, 0);
            }
        });
        
        // Reset tail rotation
        const tail = shiba.children.find(child => child.geometry instanceof THREE.BoxGeometry && child.geometry.parameters.width === 0.15);
        if (tail) {
            tail.rotation.set(Math.PI / 2, 0, 0);
        }
        
        // Reset group rotation and ensure it's on the ground
        shiba.rotation.set(0, shiba.rotation.y, 0); // Keep y rotation (facing direction)
        shiba.position.y = 0; // Ensure dog is on the ground
    };

    return shiba;
};

const shiba = createShibaInu();
scene.add(shiba);

// Walking state
let targetPosition = new THREE.Vector3(0, 0, 0);
let walkingSpeed = 0.02;
let rotationSpeed = 0.02;
let isWalking = false;
let mood = 'happy';
let tailWagSpeed = 0;
let isPetting = false;
let isPlaying = false;
let legAnimationPhase = 0;
const legSpeed = 0.2; // Speed of leg movement

// Behavior state
let currentBehavior = 'walking';
let behaviorTimer = 0;
let behaviorDuration = 0;
let jumpHeight = 0;
let sleepRotation = 0;
let stools = []; // Array to store stool objects
let stoolTimer = 0; // Timer for stool creation

// Add ball to the scene
let ball = null;
let ballTarget = null;
let isFetching = false;

// Add ball physics variables
let ballVelocity = new THREE.Vector3();
let ballGravity = 0.02; // Increased gravity
let ballBounce = 0.7;   // Increased bounce
let ballRolling = false;
let ballBounceCount = 0;
const MAX_BOUNCES = 3;  // Maximum number of bounces before rolling

// Add camera following variables
let isCameraFollowing = false;
let cameraTarget = new THREE.Vector3();

// Add body movement variables
let bodyBounce = 0;
let bodySway = 0;

// Function to get random position within boundaries
function getRandomPosition() {
    return new THREE.Vector3(
        Math.random() * (WALKING_SPACE.maxX - WALKING_SPACE.minX) + WALKING_SPACE.minX,
        0,
        Math.random() * (WALKING_SPACE.maxZ - WALKING_SPACE.minZ) + WALKING_SPACE.minZ
    );
}

// Function to choose random behavior
function chooseRandomBehavior() {
    const behaviors = [
        'walking', 'sleeping', 'jumping', 'peeing', 'pooping',
        'barking', 'sitting', 'rolling', 'chasing_tail', 'digging'
    ];
    const weights = [
        0.6,  // walking (increased from 0.4)
        0.2,  // sleeping (decreased from 0.3)
        0.03, // jumping (decreased from 0.05)
        0.02, // peeing (decreased from 0.03)
        0.02, // pooping (decreased from 0.03)
        0.03, // barking (decreased from 0.05)
        0.03, // sitting (decreased from 0.05)
        0.03, // rolling (decreased from 0.05)
        0.02, // chasing_tail (kept same)
        0.02  // digging (kept same)
    ];
    let random = Math.random();
    let sum = 0;
    
    for (let i = 0; i < behaviors.length; i++) {
        sum += weights[i];
        if (random <= sum) {
            return behaviors[i];
        }
    }
    return 'walking';
}

// Function to set behavior duration
function setBehaviorDuration(behavior) {
    switch(behavior) {
        case 'walking':
            return Math.random() * 15000 + 10000; // 10-25 seconds (increased from 5-13)
        case 'sleeping':
            return Math.random() * 20000 + 15000; // 15-35 seconds (increased from 10-25)
        case 'jumping':
            return Math.random() * 4000 + 3000; // 3-7 seconds (increased from 1-3)
        case 'peeing':
            return Math.random() * 5000 + 4000; // 4-9 seconds (increased from 2-5)
        case 'pooping':
            return Math.random() * 5000 + 4000; // 4-9 seconds (increased from 2-5)
        case 'barking':
            return Math.random() * 4000 + 3000; // 3-7 seconds (increased from 1-3)
        case 'sitting':
            return Math.random() * 8000 + 6000; // 6-14 seconds (increased from 3-8)
        case 'rolling':
            return Math.random() * 5000 + 4000; // 4-9 seconds (increased from 2-5)
        case 'chasing_tail':
            return Math.random() * 6000 + 4000; // 4-10 seconds (increased from 2-6)
        case 'digging':
            return Math.random() * 6000 + 4000; // 4-10 seconds (increased from 2-6)
        default:
            return 3000;
    }
}

// Set initial target position
targetPosition = getRandomPosition();

// Add event listeners for buttons
document.getElementById('pet-btn').addEventListener('click', () => {
    mood = 'happy';
    document.getElementById('mood').textContent = 'Happy';
    isPetting = true;
    setTimeout(() => {
        isPetting = false;
    }, 2000);
});

document.getElementById('play-btn').addEventListener('click', () => {
    mood = 'excited';
    document.getElementById('mood').textContent = 'Excited';
    isPlaying = true;
    isCameraFollowing = true;
    
    // Throw the ball
    throwBall();
    
    setTimeout(() => {
        isPlaying = false;
        isFetching = false;
        isCameraFollowing = false;
        // Remove the ball
        if (ball) {
            scene.remove(ball);
            ball = null;
        }
        // Set new target position for walking from current position
        targetPosition = getRandomPosition();
        isWalking = true;
        currentBehavior = 'walking';
        behaviorTimer = 0;
        behaviorDuration = 5000; // 5 seconds to reach new position
    }, 5000);
});

// Add double-click event listener
renderer.domElement.addEventListener('dblclick', (event) => {
    // Calculate mouse position in normalized device coordinates
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    // Create a raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Calculate intersection with ground plane
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(groundPlane, intersection);

    // Set target position for dog
    targetPosition.copy(intersection);
    isWalking = true;
    currentBehavior = 'walking';
    behaviorTimer = 0;
    behaviorDuration = 5000; // 5 seconds to reach the position
});

// Add obstacle detection function
function checkObstacleCollision(position, radius = 0.5) {
    const obstacles = scene.children.filter(child => 
        child !== shiba && 
        child !== ground && 
        child !== ball && 
        child !== ambientLight && 
        child !== directionalLight
    );

    for (const obstacle of obstacles) {
        const obstaclePosition = new THREE.Vector3();
        obstacle.getWorldPosition(obstaclePosition);
        
        // Calculate distance to obstacle
        const distance = position.distanceTo(obstaclePosition);
        
        // If too close to obstacle, return true
        if (distance < radius) {
            return true;
        }
    }
    return false;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Behavior timer
    behaviorTimer += 16; // Assuming 60fps
    if (behaviorTimer >= behaviorDuration) {
        // Remove all stools
        stools.forEach(stool => {
            scene.remove(stool);
        });
        stools = [];
        stoolTimer = 0;
        
        // Reset position before starting new behavior
        shiba.resetPosition();
        
        currentBehavior = chooseRandomBehavior();
        behaviorDuration = setBehaviorDuration(currentBehavior);
        behaviorTimer = 0;
        document.getElementById('mood').textContent = currentBehavior.charAt(0).toUpperCase() + currentBehavior.slice(1);
    }

    // Handle different behaviors
    if (!isPetting && !isPlaying) {
        switch(currentBehavior) {
            case 'walking':
                const direction = new THREE.Vector3().subVectors(targetPosition, shiba.position);
                const distance = direction.length();

                if (distance > 0.1) {
                    direction.normalize();
                    
                    // Check for obstacles in the path
                    const nextPosition = new THREE.Vector3().addVectors(
                        shiba.position,
                        direction.multiplyScalar(walkingSpeed)
                    );
                    
                    if (checkObstacleCollision(nextPosition)) {
                        // If there's an obstacle, try to find a way around
                        const avoidDirection = new THREE.Vector3(-direction.z, 0, direction.x);
                        const newPosition = new THREE.Vector3().addVectors(
                            shiba.position,
                            avoidDirection.multiplyScalar(walkingSpeed)
                        );
                        
                        if (!checkObstacleCollision(newPosition)) {
                            shiba.position.copy(newPosition);
                        }
                    } else {
                        shiba.position.copy(nextPosition);
                    }

                    // Rotate dog to face movement direction
                    const targetRotation = Math.atan2(direction.x, direction.z);
                    shiba.rotation.y = THREE.MathUtils.lerp(shiba.rotation.y, targetRotation, rotationSpeed);

                    // Add body movement
                    bodyBounce += 0.2;
                    bodySway += 0.1;
                    
                    // Apply body movement to the dog's body
                    const body = shiba.children[0]; // Assuming body is the first child
                    if (body) {
                        body.rotation.x = Math.sin(bodyBounce) * 0.05; // Gentle up and down
                        body.rotation.z = Math.sin(bodySway) * 0.05;   // Gentle side to side
                    }

                    // Animate legs during walking
                    legAnimationPhase += legSpeed;
                    const legAngle = Math.sin(legAnimationPhase) * 0.3;
                    const backLegAngle = Math.sin(legAnimationPhase + Math.PI) * 0.3;
                    
                    // Get leg references
                    const frontLeftLeg = shiba.children[5];
                    const frontRightLeg = shiba.children[6];
                    const backLeftLeg = shiba.children[7];
                    const backRightLeg = shiba.children[8];
                    
                    // Apply leg rotations
                    if (frontLeftLeg) frontLeftLeg.rotation.x = legAngle;
                    if (frontRightLeg) frontRightLeg.rotation.x = -legAngle;
                    if (backLeftLeg) backLeftLeg.rotation.x = backLegAngle;
                    if (backRightLeg) backRightLeg.rotation.x = -backLegAngle;
                } else {
                    isWalking = false;
                    targetPosition = getRandomPosition();
                }
                break;

            case 'sleeping':
                shiba.rotation.y = Math.sin(behaviorTimer * 0.0002) * 0.1; // Reduced from 0.0005
                shiba.position.y = -0.1 + Math.sin(behaviorTimer * 0.0004) * 0.05; // Reduced from 0.001
                break;

            case 'jumping':
                jumpHeight = Math.sin(behaviorTimer * 0.001) * 0.5; // Reduced from 0.003
                shiba.position.y = jumpHeight;
                break;

            case 'peeing':
                shiba.rotation.y = Math.sin(behaviorTimer * 0.0004) * 0.2; // Reduced from 0.001
                shiba.position.y = Math.sin(behaviorTimer * 0.001) * 0.1; // Reduced from 0.003
                break;

            case 'pooping':
                shiba.rotation.y = Math.sin(behaviorTimer * 0.0002) * 0.1; // Reduced from 0.0005
                shiba.position.y = Math.sin(behaviorTimer * 0.0008) * 0.05; // Reduced from 0.002

                // Create stools during pooping
                stoolTimer += 16;
                if (stoolTimer >= 1000) { // Increased from 500ms
                    const stool = shiba.createStool();
                    stools.push(stool);
                    stoolTimer = 0;
                }
                break;

            case 'barking':
                shiba.position.y = Math.sin(behaviorTimer * 0.002) * 0.1; // Reduced from 0.005
                shiba.rotation.x = Math.sin(behaviorTimer * 0.004) * 0.1; // Reduced from 0.01
                break;

            case 'sitting':
                shiba.position.y = -0.2;
                shiba.rotation.x = -0.3;
                break;

            case 'rolling':
                shiba.rotation.x += 0.02; // Reduced from 0.05
                shiba.rotation.z += 0.01; // Reduced from 0.025
                shiba.position.y = Math.sin(behaviorTimer * 0.001) * 0.2; // Reduced from 0.003
                break;

            case 'chasing_tail':
                shiba.rotation.y += 0.05; // Reduced from 0.1
                shiba.position.y = Math.sin(behaviorTimer * 0.002) * 0.1; // Reduced from 0.005
                break;

            case 'digging':
                shiba.position.y = -0.1;
                shiba.rotation.x = -0.2;
                shiba.rotation.y = Math.sin(behaviorTimer * 0.002) * 0.2; // Reduced from 0.005
                break;
        }
    }

    // Tail wagging
    const tail = shiba.children.find(child => child.geometry instanceof THREE.BoxGeometry && child.geometry.parameters.width === 0.15);
    if (tail) {
        if (isPetting || isPlaying || currentBehavior === 'jumping' || currentBehavior === 'chasing_tail') {
            tailWagSpeed = 0.05;
        } else if (currentBehavior === 'barking') {
            tailWagSpeed = 0.08;
        } else {
            tailWagSpeed *= 0.95;
        }
        tail.rotation.x += tailWagSpeed;
    }

    // Body movement
    if (isPetting) {
        shiba.rotation.y += 0.01;
    } else if (isPlaying) {
        shiba.position.y = Math.sin(Date.now() * 0.005) * 0.1;
    }

    // Handle ball and fetch behavior
    if (isFetching && ball && ballTarget) {
        if (!ballRolling) {
            // Apply gravity
            ballVelocity.y -= ballGravity;
            
            // Update ball position
            ball.position.add(ballVelocity);
            
            // Check for ground collision
            if (ball.position.y <= 0.2) { // Ball radius is 0.2
                ball.position.y = 0.2;
                ballVelocity.y *= -ballBounce;
                ballBounceCount++;
                
                // Add some horizontal movement after bounce
                if (ballBounceCount < MAX_BOUNCES) {
                    const horizontalSpeed = 0.1;
                    ballVelocity.x += (Math.random() - 0.5) * horizontalSpeed;
                    ballVelocity.z += (Math.random() - 0.5) * horizontalSpeed;
                }
                
                // If ball has bounced enough or is moving slowly, start rolling
                if (ballBounceCount >= MAX_BOUNCES || (Math.abs(ballVelocity.y) < 0.05 && ballVelocity.length() < 0.1)) {
                    ballRolling = true;
                }
            }
        } else {
            // Ball is rolling
            const ballDirection = new THREE.Vector3().subVectors(ballTarget, ball.position);
            const ballDistance = ballDirection.length();
            
            if (ballDistance > 0.1) {
                ballDirection.normalize();
                ball.position.add(ballDirection.multiplyScalar(0.05)); // Slow rolling speed
            }
        }
        
        // Make dog chase the ball
        const dogToBall = new THREE.Vector3().subVectors(ball.position, shiba.position);
        const dogDistance = dogToBall.length();
        
        if (dogDistance > 0.5) {
            // Dog is still chasing
            dogToBall.normalize();
            shiba.position.add(dogToBall.multiplyScalar(0.1));
            
            // Rotate dog to face the ball
            const targetRotation = Math.atan2(dogToBall.x, dogToBall.z);
            shiba.rotation.y = THREE.MathUtils.lerp(shiba.rotation.y, targetRotation, 0.1);
            
            // Animate legs faster during chase
            legAnimationPhase += 0.2;
            const legAngle = Math.sin(legAnimationPhase) * 0.3;
            const backLegAngle = Math.sin(legAnimationPhase + Math.PI) * 0.3;
            
            const legs = [
                shiba.children[5],
                shiba.children[6],
                shiba.children[7],
                shiba.children[8]
            ];
            
            if (legs[0]) legs[0].rotation.x = legAngle;
            if (legs[1]) legs[1].rotation.x = -legAngle;
            if (legs[2]) legs[2].rotation.x = backLegAngle;
            if (legs[3]) legs[3].rotation.x = -backLegAngle;
        }
    }

    // Handle camera following during fetch
    if (isCameraFollowing && ball && shiba) {
        // Calculate center point between dog and ball
        const centerPoint = new THREE.Vector3().addVectors(shiba.position, ball.position).multiplyScalar(0.5);
        
        // Calculate distance between dog and ball
        const distance = shiba.position.distanceTo(ball.position);
        
        // Set minimum and maximum camera distance
        const minDistance = 5;
        const maxDistance = 15;
        const cameraDistance = Math.min(maxDistance, Math.max(minDistance, distance * 1.5));
        
        // Calculate camera position
        const cameraOffset = new THREE.Vector3(0, cameraDistance * 0.5, cameraDistance);
        
        // Smoothly move camera
        camera.position.lerp(centerPoint.clone().add(cameraOffset), 0.1);
        controls.target.lerp(centerPoint, 0.1);
    }

    controls.update();
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Function to create a random tree
function createRandomTree(x, z) {
    const tree = new THREE.Group();
    
    // Random tree height and width
    const height = Math.random() * 2 + 2;
    const trunkWidth = Math.random() * 0.1 + 0.2;
    
    // Trunk with slight taper
    const trunkGeometry = new THREE.CylinderGeometry(
        trunkWidth * 0.8, // Top radius
        trunkWidth,       // Bottom radius
        height,           // Height
        8                 // Segments
    );
    const trunkMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8B4513,
        flatShading: true
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = height / 2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    tree.add(trunk);
    
    // Add bark texture
    trunkMaterial.bumpScale = 0.05;
    trunkMaterial.shininess = 0;
    
    // Create multiple layers of leaves for more depth
    const leafColors = [
        new THREE.Color(0x2E8B57), // Sea Green
        new THREE.Color(0x228B22), // Forest Green
        new THREE.Color(0x006400), // Dark Green
        new THREE.Color(0x556B2F)  // Dark Olive Green
    ];
    
    // Create 3 layers of leaves
    for (let i = 0; i < 3; i++) {
        const layerHeight = height * (0.6 + i * 0.2);
        const layerWidth = 1 + i * 0.5;
        
        // Main foliage layer
        const leavesGeometry = new THREE.ConeGeometry(layerWidth, layerWidth * 1.5, 8);
        const leavesMaterial = new THREE.MeshPhongMaterial({ 
            color: leafColors[Math.floor(Math.random() * leafColors.length)],
            flatShading: true
        });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.y = layerHeight;
        leaves.castShadow = true;
        leaves.receiveShadow = true;
        tree.add(leaves);
        
        // Add some random branches
        if (i > 0) {
            const numBranches = Math.floor(Math.random() * 3) + 2;
            for (let j = 0; j < numBranches; j++) {
                const branchAngle = (j / numBranches) * Math.PI * 2;
                const branchLength = Math.random() * 0.5 + 0.3;
                
                const branchGeometry = new THREE.CylinderGeometry(
                    trunkWidth * 0.3,
                    trunkWidth * 0.5,
                    branchLength,
                    6
                );
                const branch = new THREE.Mesh(branchGeometry, trunkMaterial);
                branch.position.y = layerHeight - 0.2;
                branch.position.x = Math.cos(branchAngle) * (layerWidth * 0.5);
                branch.position.z = Math.sin(branchAngle) * (layerWidth * 0.5);
                branch.rotation.z = Math.PI / 2;
                branch.rotation.y = branchAngle;
                branch.castShadow = true;
                branch.receiveShadow = true;
                tree.add(branch);
                
                // Add small leaf clusters to branches
                const clusterGeometry = new THREE.SphereGeometry(0.2, 6, 6);
                const cluster = new THREE.Mesh(clusterGeometry, leavesMaterial);
                cluster.position.set(
                    Math.cos(branchAngle) * (layerWidth * 0.5 + branchLength),
                    layerHeight - 0.2,
                    Math.sin(branchAngle) * (layerWidth * 0.5 + branchLength)
                );
                cluster.castShadow = true;
                cluster.receiveShadow = true;
                tree.add(cluster);
            }
        }
    }
    
    // Add slight random rotation and tilt
    tree.rotation.y = Math.random() * Math.PI * 2;
    tree.rotation.x = (Math.random() - 0.5) * 0.1;
    tree.rotation.z = (Math.random() - 0.5) * 0.1;
    
    tree.position.set(x, 0, z);
    return tree;
}

// Function to create a flower
function createFlower(x, z) {
    const flower = new THREE.Group();
    
    // Stem
    const stemGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8);
    const stemMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 0.15;
    flower.add(stem);
    
    // Flower center
    const centerGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const centerMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFF00 }); // Yellow center
    const center = new THREE.Mesh(centerGeometry, centerMaterial);
    center.position.y = 0.3;
    flower.add(center);
    
    // Petals
    const petalColors = [
        { color: 0xFF69B4, name: 'Hot Pink' },
        { color: 0xFF1493, name: 'Deep Pink' },
        { color: 0xFFC0CB, name: 'Pink' },
        { color: 0xFFB6C1, name: 'Light Pink' },
        { color: 0xDA70D6, name: 'Orchid' },
        { color: 0xEE82EE, name: 'Violet' },
        { color: 0xDDA0DD, name: 'Plum' },
        { color: 0xBA55D3, name: 'Medium Orchid' },
        { color: 0x9370DB, name: 'Medium Purple' },
        { color: 0x8A2BE2, name: 'Blue Violet' },
        { color: 0x9400D3, name: 'Dark Violet' },
        { color: 0x9932CC, name: 'Dark Orchid' },
        { color: 0x8B008B, name: 'Dark Magenta' },
        { color: 0x800080, name: 'Purple' },
        { color: 0x4B0082, name: 'Indigo' },
        { color: 0x483D8B, name: 'Dark Slate Blue' }
    ];
    
    const randomColor = petalColors[Math.floor(Math.random() * petalColors.length)];
    
    // Create 5 petals in a circle
    for (let i = 0; i < 5; i++) {
        const petalGeometry = new THREE.CircleGeometry(0.1, 8);
        const petalMaterial = new THREE.MeshPhongMaterial({ 
            color: randomColor.color,
            side: THREE.DoubleSide
        });
        const petal = new THREE.Mesh(petalGeometry, petalMaterial);
        
        // Position petals in a circle
        const angle = (i / 5) * Math.PI * 2;
        petal.position.x = Math.cos(angle) * 0.1;
        petal.position.z = Math.sin(angle) * 0.1;
        petal.position.y = 0.3;
        
        // Rotate petals to face outward
        petal.rotation.x = Math.PI / 2;
        petal.rotation.z = angle;
        
        flower.add(petal);
    }
    
    // Add leaves
    const leafGeometry = new THREE.PlaneGeometry(0.15, 0.1);
    const leafMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x228B22,
        side: THREE.DoubleSide
    });
    
    // Left leaf
    const leftLeaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leftLeaf.position.set(-0.1, 0.1, 0);
    leftLeaf.rotation.z = -Math.PI / 4;
    flower.add(leftLeaf);
    
    // Right leaf
    const rightLeaf = new THREE.Mesh(leafGeometry, leafMaterial);
    rightLeaf.position.set(0.1, 0.1, 0);
    rightLeaf.rotation.z = Math.PI / 4;
    flower.add(rightLeaf);
    
    // Add slight random rotation to make flowers look more natural
    flower.rotation.y = Math.random() * Math.PI * 2;
    
    flower.position.set(x, -0.5, z);
    return flower;
}

// Function to create a log
function createLog(x, z) {
    const log = new THREE.Group();
    
    const length = Math.random() * 1 + 1;
    const logGeometry = new THREE.CylinderGeometry(0.2, 0.2, length, 8);
    const logMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8B4513,
        flatShading: true
    });
    const logMesh = new THREE.Mesh(logGeometry, logMaterial);
    
    // Random rotation
    logMesh.rotation.x = Math.random() * Math.PI;
    logMesh.rotation.z = Math.random() * Math.PI;
    
    log.add(logMesh);
    log.position.set(x, -0.5, z);
    log.castShadow = true;
    log.receiveShadow = true;
    
    return log;
}

// Function to create a rock
function createRock(x, z) {
    const rock = new THREE.Group();
    
    const size = Math.random() * 0.5 + 0.3;
    const rockGeometry = new THREE.DodecahedronGeometry(size, 0);
    const rockMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x808080,
        flatShading: true
    });
    const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);
    
    rock.add(rockMesh);
    rock.position.set(x, -0.5 + size/2, z);
    rock.castShadow = true;
    rock.receiveShadow = true;
    
    return rock;
}

// Function to generate random natural elements
function generateNaturalElements() {
    // Generate trees
    for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 15 + 10;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        const tree = createRandomTree(x, z);
        scene.add(tree);
    }
    
    // Generate flowers (increased from 30 to 50)
    for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 8 + 5;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        const flower = createFlower(x, z);
        scene.add(flower);
    }
    
    // Generate logs
    for (let i = 0; i < 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 12 + 8;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        const log = createLog(x, z);
        scene.add(log);
    }
    
    // Generate rocks
    for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 10 + 5;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        const rock = createRock(x, z);
        scene.add(rock);
    }
}

// After creating the scene and before creating the dog
generateNaturalElements();

// Function to throw ball
function throwBall() {
    if (!ball) {
        ball = createBall();
        scene.add(ball);
    }
    
    // Set ball position near the dog
    const dogPosition = shiba.position.clone();
    ball.position.copy(dogPosition);
    ball.position.y += 0.5; // Slightly above the dog
    
    // Calculate random direction away from the dog
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 2 + 1; // 1-3 units away from dog (reduced from 2-5)
    ballTarget = new THREE.Vector3(
        dogPosition.x + Math.cos(angle) * distance,
        0,
        dogPosition.z + Math.sin(angle) * distance
    );
    
    // Set initial velocity with less force
    const throwDirection = new THREE.Vector3().subVectors(ballTarget, ball.position).normalize();
    ballVelocity = throwDirection.multiplyScalar(0.2); // Reduced from 0.4
    ballVelocity.y = 0.4; // Reduced from 0.8
    
    isFetching = true;
    ballRolling = false;
    ballBounceCount = 0;
}

// Function to create a ball
function createBall() {
    const ballGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const ballMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xFF0000,
        shininess: 100,
        specular: 0xFFFFFF
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.castShadow = true;
    ball.receiveShadow = true;
    return ball;
}

animate(); 