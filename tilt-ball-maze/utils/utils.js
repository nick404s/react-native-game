const getFormattedTime = (timeInSeconds) => {
  // convert seconds to minutes
  const minutes = Math.floor(timeInSeconds / 60);
  // get the remaining seconds
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${timeInSeconds
    .toString()
    .padStart(2, "0")}`;
};
export { getFormattedTime };
