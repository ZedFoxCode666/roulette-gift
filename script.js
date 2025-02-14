const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const resultDiv = document.getElementById("result");
const prizePopup = document.getElementById("prizePopup");
const prizeImage = document.getElementById("prizeImage");
const closePopup = document.getElementById("closePopup");

// Hadiah & warna
const prizes = [
    { name: "🎁 Mystery Box", img: "hadiah1.jpg" },
    { name: "❌ Zonk", img: null },
    { name: "🎁 Mystery Box", img: "hadiah2.jpg" },
    { name: "❌ Zonk", img: null },
    { name: "🎁 Mystery Box", img: "hadiah3.jpg" }
];

const colors = ["#ffcc00", "#ff6666", "#ffcc00", "#ff6666", "#ffcc00"];

let startAngle = 0;
let arc = (2 * Math.PI) / prizes.length;
let spinning = false;

const spinSound = new Audio("spin.mp3");
const winSound = new Audio("win.mp3");

// Gambar roda
function drawWheel() {
    for (let i = 0; i < prizes.length; i++) {
        let angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];

        // Buat sektor roda
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, angle, angle + arc, false);
        ctx.lineTo(150, 150);
        ctx.fill();

        // Rotasi teks biar jelas
        ctx.save();
        ctx.fillStyle = "black";
        ctx.translate(150, 150);
        ctx.rotate(angle + arc / 2);
        ctx.textAlign = "right";
        ctx.font = "16px Arial";
        ctx.fillText(prizes[i].name, 130, 10);
        ctx.restore();
    }
}

// Fungsi untuk memutar roda
function spinWheel() {
    if (spinning) return;
    spinning = true;
    resultDiv.classList.add("hidden");
    prizePopup.classList.add("hidden");

    spinSound.play();

    let spins = Math.floor(Math.random() * 10) + 10;
    let finalAngle = startAngle + spins * (Math.PI * 2);
    let speed = 0.2;

    let spinAnimation = setInterval(() => {
        startAngle += speed;
        speed *= 0.98;

        if (speed < 0.01) {
            clearInterval(spinAnimation);
            let index = Math.floor(((startAngle % (Math.PI * 2)) / (2 * Math.PI)) * prizes.length);
            let selectedPrize = prizes[index];

            resultDiv.innerHTML = `Hasil: ${selectedPrize.name}`;
            resultDiv.classList.remove("hidden");
            spinning = false;

            if (selectedPrize.name.includes("Mystery Box")) {
                winSound.play();
                prizeImage.src = selectedPrize.img; // Ganti dengan gambar hadiah
                prizePopup.classList.remove("hidden");
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel();
    }, 30);
}

// Tutup popup hadiah
closePopup.addEventListener("click", () => {
    prizePopup.classList.add("hidden");
});

spinButton.addEventListener("click", spinWheel);
drawWheel();
