// const dayjs = require("dayjs");
const initApp = () => {

  let myDate;
  let myTimeZone = "";

  // Plugins
  dayjs.extend(window.dayjs_plugin_utc);
  dayjs.extend(window.dayjs_plugin_timezone);

  // console.log(newDate);

  const currentDate = document.getElementById("date");
  const currentTime = document.getElementById("time");
  const currentTimezone = document.getElementById("timezone");
  const btApplyTimeZone = document.getElementById("apply-timezone");


  function setTimezone(myTimeZone) {
    // Get user timezone
    currentTimezone.innerText = myTimeZone;
  }

  function setDate(myTimeZone) {
    // Format the date to the user timezone and format
    myDate = new Date();
    let newDate = dayjs.utc(myDate).tz(myTimeZone).format("dddd, D MMM, YYYY");
    currentDate.innerText = newDate;
  }

  function setTime(myTimeZone) {
    let newTime = dayjs.utc(myDate).tz(myTimeZone).format("HH:mm:ss");
    currentTime.innerText = newTime;
  }

  function updateClock() {
    if (!myTimeZone) {
      myTimeZone = dayjs.tz.guess();
    }

    setDate(myTimeZone);
    setTimezone(myTimeZone);
    setTime(myTimeZone);
  }

  function loadTimeZones() {
    const stTimeZones = document.getElementById("stTimeZones");

    for (const timeZone of Intl.supportedValuesOf("timeZone")) {
      let option = new Option(timeZone);
      stTimeZones.appendChild(option);
    }

  }

  updateClock();
  window.setInterval(updateClock, 1000);
  MicroModal.init();
  loadTimeZones();

  btApplyTimeZone.addEventListener("click", () => {
    const newTimeZone = document.getElementById("stTimeZones").value;
    myTimeZone = newTimeZone ? newTimeZone : myTimeZone;
    console.log(myTimeZone);
    updateClock();
  });

}

document.addEventListener("DOMContentLoaded", initApp);