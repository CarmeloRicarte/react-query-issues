/**
 * Sleep() returns a Promise that resolves to true after the specified number of seconds.
 * @param [seconds=1] - The number of seconds to sleep.
 * @returns A promise that resolves to true after a given number of seconds.
 */
export const sleep = (seconds = 1): Promise<boolean> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000)
  );
};
