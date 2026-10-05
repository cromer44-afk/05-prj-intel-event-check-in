// Attendance goal
const attendanceGoal = 50;

// Attendance counts
let attendeeCount = 0;
let waterCount = 0;
let zeroCount = 0;
let powerCount = 0;

// Get the HTML elements
const form = document.getElementById("checkInForm");
const attendeeName = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

const attendeeCountDisplay = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");

const waterCountDisplay = document.getElementById("waterCount");
const zeroCountDisplay = document.getElementById("zeroCount");
const powerCountDisplay = document.getElementById("powerCount");

// When someone checks in
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = attendeeName.value.trim();
    const team = teamSelect.value;

    // Add one to total attendance
    attendeeCount++;

    // Add one to the selected team
    if (team === "water") {
        waterCount++;
    } else if (team === "zero") {
        zeroCount++;
    } else if (team === "power") {
        powerCount++;
    }

    // Display a personalized greeting
    greeting.textContent = `Welcome, ${name}! Thank you for joining the Sustainability Summit.`;

    // Update the numbers on the page
    attendeeCountDisplay.textContent = attendeeCount;
    waterCountDisplay.textContent = waterCount;
    zeroCountDisplay.textContent = zeroCount;
    powerCountDisplay.textContent = powerCount;

    // Update the progress bar
    const progress = Math.min((attendeeCount / attendanceGoal) * 100, 100);
    progressBar.style.width = `${progress}%`;

    // Clear the form
    attendeeName.value = "";
    teamSelect.value = "";
});
