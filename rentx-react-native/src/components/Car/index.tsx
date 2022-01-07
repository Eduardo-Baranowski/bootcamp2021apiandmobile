import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/star_empty.svg';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage
} from './styles';
import {CarDTO} from '../../dtos/CarDTO';
import { Image } from 'react-native';
import { api } from '../../services/api';

interface Props extends RectButtonProps{
  data: CarDTO;
}

export function Car({data, ...rest} : Props){
  return (
    <Container {...rest}>
    <Details>
    <Brand>{data.brand}</Brand>
    <Name>{data.name}</Name>

    <About>
    <Rent>
    <Period>{data.period}</Period>
    <Price>{`R$ ${data.price}`}</Price>
    </Rent>

    <Type>
    <GasolineSvg />
    </Type>
    </About>
    </Details>



    <CarImage
      source={{uri: data.thumbnail}}
      resizeMode="contain"
    />
    </Container>
    );
  }
