function formatTime(minutes) {
  let days = parseInt(minutes / 1440);
  let hours = parseInt(minutes % 1440 / 60);
  minutes = minutes % 60;

  return `${days} day(s) ${hours} hour(s) ${minutes} minute(s)`;
}

formatTime(70);

