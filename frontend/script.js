// Daily Affirmations
const affirmations = [
    "I am confident.",
    "I am positive.",
    "I can achieve my goals.",
    "I am grateful for today.",
    "I radiate happiness.",
    "I attract positivity into my life.",
    "I am focused and productive."
];

// Show one affirmation randomly
const randomIndex = Math.floor(Math.random() * affirmations.length);
document.getElementById('dailyAffirmation').innerText = affirmations[randomIndex];
