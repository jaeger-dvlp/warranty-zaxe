import { v4 } from 'uuid';

const getRandomSerial = () =>
  `ZX${v4().slice(0, 13).replace(/-/g, '').toUpperCase()}`;

export default getRandomSerial;
