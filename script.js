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
    
    // Draw a rotating almond shape
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2); // Center of canvas
    ctx.rotate(angle);
    
    // Almond shape properties
    const almondWidth = 100;   // Width of the almond
    const almondHeight = 50;   // Height of the almond
    
    ctx.beginPath();
    ctx.ellipse(0, 0, almondWidth, almondHeight, 0, Math.PI / 4, Math.PI + Math.PI / 4, false);  // Skewed to form almond shape
    ctx.fillStyle = '#1e90ff';
    ctx.fill();
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
