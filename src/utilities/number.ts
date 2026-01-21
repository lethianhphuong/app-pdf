/**
 * Convert total seconds to minutes:seconds
 * @param seconds - seconds
 */
export function transformToTimeCountDown(seconds: number) {
  const SECONDS_A_MINUTE = 60;
  function fillZero(num: number) {
    return num.toString().padStart(2, '0');
  }
  const minuteNum = Math.floor(seconds / SECONDS_A_MINUTE);
  const minute = fillZero(minuteNum);
  const second = fillZero(seconds - minuteNum * SECONDS_A_MINUTE);
  return `${minute}: ${second}`;
}

/**
 * Get a random integer in the specified integer range
 * @param start - start range
 * @param end - end range
 */
export function getRandomInteger(end: number, start = 0) {
  const range = end - start;
  const random = Math.floor(Math.random() * range + start);
  return random;
}

export function addLeadingZero(number: number) {
  const strNumber = String(number);
  return strNumber.length === 1 ? `0${strNumber}` : strNumber;
}
