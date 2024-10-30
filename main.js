const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

const circles = [];

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createCircle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 30 + 10,
        dx: (Math.random() - 0.5) * 5, 
        dy: (Math.random() - 0.5) * 5, 
        color: getRandomColor()
    };
}

for (let i = 0; i < 10; i++) {
    circles.push(createCircle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    circles.forEach(circle => {
        circle.x += circle.dx;
        circle.y += circle.dy;

        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
            circle.dx = -circle.dx;
            circle.color = getRandomColor(); 
        }
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
            circle.dy = -circle.dy;
            circle.color = getRandomColor(); 
        }

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();
    });

    requestAnimationFrame(animate); 
}

animate();

canvas.addEventListener('click', function (event) {
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;

    circles.forEach(circle => {
        const distance = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
        if (distance < circle.radius) {
            circle.color = getRandomColor(); 
        }
    });
});
