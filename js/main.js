// Set up canvas
const canvas = document.getElementById('engine-canvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the section
function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Animation loop for almond shape
let angle = 0;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Center and rotate the context
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);

    // Almond shape properties
    const almondWidth = 100;
    const almondHeight = 40;

    // Create a gradient for the almond shape
    const gradient = ctx.createLinearGradient(-almondWidth / 2, 0, almondWidth / 2, 0);
    gradient.addColorStop(0, '#8B4513');     // Dark brown
    gradient.addColorStop(0.5, '#D2691E');   // Lighter brown
    gradient.addColorStop(1, '#8B4513');     // Dark brown

    // Draw almond shape
    ctx.beginPath();
    ctx.moveTo(0, -almondHeight);
    ctx.quadraticCurveTo(-almondWidth / 2, 0, 0, almondHeight);  // Left side curve
    ctx.quadraticCurveTo(almondWidth / 2, 0, 0, -almondHeight);  // Right side curve
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();

    // Increment rotation angle for animation
    angle += 0.02;
    requestAnimationFrame(draw);
}

// Initialize and start the animation
draw();

// FPS Counter
let lastTimestamp = 0;
function calculateFPS(timestamp) {
    const delta = timestamp - lastTimestamp;
    const fps = (1000 / delta).toFixed(1);
    document.getElementById('fps').textContent = fps;
    lastTimestamp = timestamp;
    requestAnimationFrame(calculateFPS);
}
calculateFPS();
