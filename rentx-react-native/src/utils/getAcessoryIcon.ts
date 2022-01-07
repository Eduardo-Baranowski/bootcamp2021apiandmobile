import SpeedSvg from '../assets/location.svg';
import AccelerationSvg from '../assets/mastercard.svg';
import ForceSvg from '../assets/dollar.svg';
import GasolineSvg from '../assets/like.svg';
import ExchangeSvg from '../assets/clock.svg';
import PeopleSvg from '../assets/send.svg';
import CarSvg from '../assets/car.svg';

export function getAcessoryIcon(type: string) {
  switch (type) {
    case 'speed':
      return SpeedSvg;

    case 'acceleration':
      return AccelerationSvg;

    case 'force':
      return ForceSvg;

    case 'gasoline':
      return GasolineSvg;

    case 'exchange':
      return ExchangeSvg;

    case 'people':
      return PeopleSvg;

    default:
      return CarSvg;
  }
}
