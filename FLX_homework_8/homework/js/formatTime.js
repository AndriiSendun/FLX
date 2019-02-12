function formatTime(time) {
  let remainTime = time;
  const days = parseInt(remainTime / 1440);
  remainTime = remainTime - days * 1440;
  const hours = parseInt(remainTime / 60);
  remainTime = remainTime - hours * 60;
  const minutes = remainTime;

  return `${days} day(s) ${hours} hour(s) ${minutes} minute(s)`;
}

formatTime(70);

