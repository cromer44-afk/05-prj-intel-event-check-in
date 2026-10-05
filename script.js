// Attendance goal
const attendanceGoal = 50;

// Attendance counts
let attendeeCount = 0;
let waterCount = 0;
let zeroCount = 0;
let powerCount = 0;

// Load saved attendance counts
attendeeCount = Number(localStorage.getItem("attendeeCount")) || 0;
waterCount = Number(localStorage.getItem("waterCount")) || 0;
zeroCount = Number(localStorage.getItem("zeroCount")) || 0;
powerCount = Number(localStorage.getItem("powerCount")) || 0;

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

const attendeeList = document.getElementById("attendeeList");

// Display saved attendance counts
attendeeCountDisplay.textContent = attendeeCount;
waterCountDisplay.textContent = waterCount;
zeroCountDisplay.textContent = zeroCount;
powerCountDisplay.textContent = powerCount;

// Display saved progress
const savedProgress = Math.min((attendeeCount / attendanceGoal) * 100, 100);
progressBar.style.width = `${savedProgress}%`;

// When someone checks in
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = attendeeName.value.trim();
  const team = teamSelect.value;

  if (name === "" || team === "") {
    alert("Please enter your name and select a team.");
    return;
  }

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
  // Add attendee to the attendee list
  const listItem = document.createElement("li");

  let teamName = "";

  if (team === "water") {
    teamName = "Team Water Wise";
  } else if (team === "zero") {
    teamName = "Team Net Zero";
  } else if (team === "power") {
    teamName = "Team Renewables";
  }

  listItem.textContent = `${name} — ${teamName}`;
  attendeeList.appendChild(listItem);

  // Display a personalized greeting
  greeting.textContent = `Welcome, ${name}! Thank you for joining the Sustainability Summit.`;

  // Update the numbers on the page
  attendeeCountDisplay.textContent = attendeeCount;
  waterCountDisplay.textContent = waterCount;
  zeroCountDisplay.textContent = zeroCount;
  powerCountDisplay.textContent = powerCount;

  // Save attendance counts
  localStorage.setItem("attendeeCount", attendeeCount);
  localStorage.setItem("waterCount", waterCount);
  localStorage.setItem("zeroCount", zeroCount);
  localStorage.setItem("powerCount", powerCount);

  // Update the progress bar
  const progress = Math.min((attendeeCount / attendanceGoal) * 100, 100);
  progressBar.style.width = `${progress}%`;

  // Celebration when attendance goal is reached
  if (attendeeCount === attendanceGoal) {
    let winningTeam = "";

    if (waterCount >= zeroCount && waterCount >= powerCount) {
      winningTeam = "Team Water Wise";
    } else if (zeroCount >= waterCount && zeroCount >= powerCount) {
      winningTeam = "Team Net Zero";
    } else {
      winningTeam = "Team Renewables";
    }

    greeting.textContent = `🎉 Attendance goal reached! Congratulations ${winningTeam}! 🎉`;
  }

  // Clear the form
  attendeeName.value = "";
  teamSelect.value = "";
});
