// Select the canvas and set up its context
const canvas = document.getElementById('engine-canvas');
const ctx = canvas.getContext('2d');

// Adjust canvas size to fit window
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;  // 80% width of the window
    canvas.height = 400; // Fixed height
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Simple animation loop for demo purposes
let angle = 0;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw a rotating square to demonstrate animation
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.fillStyle = '#1e90ff';
    ctx.fillRect(-50, -50, 100, 100);
    ctx.restore();
    
    angle += 0.02;  // Increase angle for rotation
    requestAnimationFrame(draw);
}

// Initialize and start animation loop
draw();

// FPS Counter (Optional)
let lastTimestamp = 0;
function calculateFPS(timestamp) {
    const delta = timestamp - lastTimestamp;
    const fps = (1000 / delta).toFixed(1);
    document.getElementById('fps').textContent = fps;
    lastTimestamp = timestamp;
    requestAnimationFrame(calculateFPS);
}
calculateFPS();

// Loading Animation for Hero Text
document.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('#hero h1');
    heroText.classList.add('loading');
});
