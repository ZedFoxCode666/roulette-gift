const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const resultDiv = document.getElementById("result");

const prizes = ["Mystery Box 🎁", "Zonk ❌", "Mystery Box 🎁", "Zonk ❌", "Mystery Box 🎁"];
const colors = ["#ffcc00", "#ff6666", "#ffcc00", "#ff6666", "#ffcc00"];

let startAngle = 0;
let arc = Math.PI / (prizes.length / 2);
let spinTimeout = null;
let spinning = false;

function drawWheel() {
    for (let i = 0; i < prizes.length; i++) {
        let angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, angle, angle + arc, false);
        ctx.lineTo(150, 150);
        ctx.fill();
        
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
        ctx.fillText(prizes[i], 130 + Math.cos(angle + arc / 2) * 100, 150 + Math.sin(angle + arc / 2) * 100);
    }
}

function spinWheel() {
    if (spinning) return;
    spinning = true;
    resultDiv.classList.add("hidden");
    
    let spins = Math.floor(Math.random() * 10) + 10;
    let finalAngle = startAngle + spins * (Math.PI * 2);
    
    let spinAnimation = setInterval(() => {
        startAngle += 0.1;
        if (startAngle >= finalAngle) {
            clearInterval(spinAnimation);
            let index = Math.floor(((startAngle % (Math.PI * 2)) / (Math.PI * 2)) * prizes.length);
            resultDiv.innerHTML = `Hasil: ${prizes[index]}`;
            resultDiv.classList.remove("hidden");
            spinning = false;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel();
    }, 50);
}

spinButton.addEventListener("click", spinWheel);
drawWheel();
