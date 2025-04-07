document.addEventListener('DOMContentLoaded', () => {
    const dogContainer = document.querySelector('.dog-container');
    const petBtn = document.getElementById('pet-btn');
    const playBtn = document.getElementById('play-btn');
    const moodDisplay = document.getElementById('mood');
    const dogBody = document.querySelector('.dog-body');
    
    let mood = 'happy';
    let lastActionTime = Date.now();
    let needsToGo = false;
    let isMoving = false;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let rotationX = 0;
    let rotationY = 0;
    
    // Create poop and pee elements
    const poop = document.createElement('div');
    poop.className = 'poop';
    const pee = document.createElement('div');
    pee.className = 'pee';
    dogContainer.appendChild(poop);
    dogContainer.appendChild(pee);
    
    // Position dog initially
    dogContainer.style.left = `${currentX}px`;
    dogContainer.style.top = `${currentY}px`;
    
    function updateMood(newMood) {
        mood = newMood;
        moodDisplay.textContent = newMood.charAt(0).toUpperCase() + newMood.slice(1);
    }
    
    function doBathroom() {
        if (Math.random() < 0.5) {
            poop.classList.add('show');
            setTimeout(() => poop.classList.remove('show'), 2000);
        } else {
            pee.classList.add('show');
            setTimeout(() => pee.classList.remove('show'), 2000);
        }
        needsToGo = false;
        updateMood('happy');
    }
    
    function checkBathroomNeeds() {
        const currentTime = Date.now();
        if (currentTime - lastActionTime > 10000 && !needsToGo) {
            needsToGo = true;
            updateMood('restless');
        }
    }
    
    function moveDog() {
        if (!isMoving) return;
        
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 5) {
            isMoving = false;
            return;
        }
        
        const speed = 5;
        currentX += (dx / distance) * speed;
        currentY += (dy / distance) * speed;
        
        // Calculate rotation based on movement direction
        rotationY = Math.atan2(dx, dy) * (180 / Math.PI);
        
        dogContainer.style.left = `${currentX}px`;
        dogContainer.style.top = `${currentY}px`;
        dogContainer.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
        
        requestAnimationFrame(moveDog);
    }
    
    function setRandomTarget() {
        if (!isMoving && Math.random() < 0.01) {
            targetX = Math.random() * (window.innerWidth - 200);
            targetY = Math.random() * (window.innerHeight - 200);
            isMoving = true;
            moveDog();
        }
    }
    
    setInterval(checkBathroomNeeds, 1000);
    setInterval(setRandomTarget, 100);
    
    // Mouse interaction
    dogContainer.addEventListener('mouseenter', () => {
        dogBody.classList.add('petting');
        updateMood('happy');
        lastActionTime = Date.now();
        
        // Add slight tilt when being petted
        rotationX = 10;
        dogContainer.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
    });
    
    dogContainer.addEventListener('mouseleave', () => {
        dogBody.classList.remove('petting');
        rotationX = 0;
        dogContainer.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
    });
    
    // Click to move dog
    document.addEventListener('click', (e) => {
        if (e.target !== dogContainer && !dogContainer.contains(e.target)) {
            targetX = e.clientX;
            targetY = e.clientY;
            isMoving = true;
            moveDog();
        }
    });
    
    petBtn.addEventListener('click', () => {
        if (needsToGo) {
            doBathroom();
        } else {
            updateMood('happy');
            // Animate tail wagging faster
            const tail = document.querySelector('.dog-tail');
            tail.style.animation = 'wag 0.5s infinite';
            setTimeout(() => {
                tail.style.animation = 'wag 1s infinite';
            }, 1000);
            
            // Add happy tilt
            rotationX = 15;
            dogContainer.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
            setTimeout(() => {
                rotationX = 0;
                dogContainer.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
            }, 500);
        }
        lastActionTime = Date.now();
    });
    
    playBtn.addEventListener('click', () => {
        if (needsToGo) {
            doBathroom();
        } else {
            updateMood('excited');
            // Animate the dog
            dogBody.classList.add('petting');
            setTimeout(() => {
                dogBody.classList.remove('petting');
            }, 500);
            
            // Add excited bounce
            rotationX = -10;
            dogContainer.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
            setTimeout(() => {
                rotationX = 0;
                dogContainer.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
            }, 300);
        }
        lastActionTime = Date.now();
    });
}); 