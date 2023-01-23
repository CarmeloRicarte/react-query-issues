/**
 * It takes a date string and returns a string that represents the time since that date
 * @param {string} date - The date you want to calculate the time since.
 * @returns A string that represents the time since the date passed in.
 */
export const timeSince = (date: string) => {
  const baseDate = new Date(date);

  const seconds = Math.floor(
    (new Date().getTime() - baseDate.getTime()) / 1000
  );

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};
