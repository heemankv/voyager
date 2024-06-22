import { BigNumber } from "ethers";
import { ActualFee } from "./types";

function toCamelCase(snakeStr: string): string {
  return snakeStr.replace(/(_\w)/g, matches => matches[1].toUpperCase());
}

function convertKeysToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => convertKeysToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelCaseKey = toCamelCase(key);
      result[camelCaseKey] = convertKeysToCamelCase(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
}

function truncateHash(hash: string): string {
  return `${hash.slice(0, 5)}...${hash.slice(-4)}`;
}


function getCurrentTime(): number{
  return Math.floor(Date.now() / 1000);
};

function timeAgo(now: number, past: number): string {
  const oneMinuteInSeconds = 60;
  const oneHourInSeconds = 60 * oneMinuteInSeconds;
  const oneDayInSeconds = 24 * oneHourInSeconds;
  const oneMonthInSeconds = 30 * oneDayInSeconds;
  const oneYearInSeconds = 365 * oneDayInSeconds;
  const totalSeconds: number = past > now ? past - now : now - past;
  const totalYears: number = Math.floor(totalSeconds / oneYearInSeconds);
  const totalMonths: number = Math.floor(totalSeconds / oneMonthInSeconds);
  const totalDays: number = Math.floor(totalSeconds / oneDayInSeconds);
  const totalHours: number = Math.floor(totalSeconds / oneHourInSeconds);
  const totalMinutes: number = Math.floor(totalSeconds / oneMinuteInSeconds);
  if (totalYears > 0) {
      return `${totalYears} year${totalYears > 1 ? 's' : ''}`;
  } else if (totalMonths > 0) {
      return `${totalMonths} month${totalMonths > 1 ? 's' : ''}`;
  } else if (totalDays > 0) {
      return `${totalDays} day${totalDays > 1 ? 's' : ''}`;
  } else if (totalHours > 0) {
      return `${totalHours} hour${totalHours > 1 ? 's' : ''}`;
  } else if (totalMinutes > 0) {
      return `${totalMinutes} minute${totalMinutes > 1 ? 's' : ''}`;
  } else {
      return `${totalSeconds} second${totalSeconds > 1 ? 's' : ''}`;
  }
};



function priceCalculator(actualFee: ActualFee, price : number) : { eth : string , usd : string} {
  if (price === null || price === undefined) {
    return {
      eth: 'N/A',
      usd: 'N/A'
    }
  }
  const gasPriceWei = BigNumber.from(actualFee.amount)
  .mul(BigNumber.from(price * 10**4)).div(10**4).toNumber();

  return {
    eth :  (BigNumber.from(actualFee.amount).toNumber() / (10**18)).toString(),
    usd :  (gasPriceWei  / (10**18)).toString()
  }
}

export {priceCalculator, convertKeysToCamelCase, truncateHash, timeAgo, getCurrentTime};