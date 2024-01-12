/// <reference lib="webworker" />

import { getItems } from './falso-items';

addEventListener('message', ({ data }) => {
  setInterval(() => {
    postMessage({ result: getItems(data.arraySize) });
  }, data.timer);
});
