export const convertEpochToSpecificTimezone = (timeEpoch: number) => {
  if (Number.isInteger(timeEpoch) && timeEpoch > 0) {
    const d = new Date(timeEpoch);
    const utc = d.getTime() + d.getTimezoneOffset() * 60000; //This converts to UTC 00:00
    return new Date(utc + 3600000 * +1); //Hardcoded timezoneoffset
  }
};
