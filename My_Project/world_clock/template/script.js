const nepalTime = document.getElementById("nepal");
const indiaTime = document.getElementById("india");
const usaTime = document.getElementById("usa");
const qatarTime = document.getElementById("qatar");
const alarmInput = document.getElementById("alarm1");
const alarmBtn = document.querySelector(".alarm-btn");

const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

let alarmHour = null;
let alarmMinute = null;
let alarmSet = false;
let alarmTriggered = false;
let audio = new Audio("sunflower-street-drumloop-85bpm-163900.mp3");

alarmBtn.addEventListener("click", () => {
  if (!alarmInput.value) {
    alert("Please set a valid alarm time!");
    return;
  }
  [alarmHour, alarmMinute] = alarmInput.value.split(":").map(Number);
  alarmSet = true;
  alarmTriggered = false;
  alert(`Alarm set for ${alarmHour}:${alarmMinute}`);
});

const worldClock = () => {
  let date = new Date();

  nepalTime.innerHTML = date.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kathmandu",
    ...options,
  });

  indiaTime.innerHTML = date.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    ...options,
  });

  usaTime.innerHTML = date.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    ...options,
  });

  qatarTime.innerHTML = date.toLocaleTimeString("en-US", {
    timeZone: "Asia/Qatar",
    ...options,
  });

  if (
    alarmSet &&
    !alarmTriggered &&
    date.getHours() === alarmHour &&
    date.getMinutes() === alarmMinute
  ) {
    console.log("Alarm is ringing!");
    audio.play();
    alarmTriggered = true;
  }
};

setInterval(worldClock, 1000);
