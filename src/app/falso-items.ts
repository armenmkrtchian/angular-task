import { randNumber, randColor } from '@ngneat/falso';
import { IItem } from './interfaces/IItem.interface';

export const NUMBERS_WITH_COMMAS_PATTERN = /^[0-9,\s]*$/;

export function getItems(arraySize: number): IItem[] {
  return new Array(arraySize).fill(null).map(() => {
    return {
      id: `${randNumber({ min: 100, max: arraySize + 100 })}`,
      int: randNumber({ min: 10000, max: 1000000 }),
      float: getRandomFloatNumberWithPrecision(18),
      color: randColor(),
      child: {
        id: `${randNumber({ min: 1, max: 1000 })}`,
        color: randColor(),
      },
    };
  });
}


export function getRandomFloatNumberWithPrecision(precision: number, minimum = 0, maximum = 99): string {
  const random = Math.random() * (maximum - minimum) + minimum;
  return random.toFixed(precision);
}
