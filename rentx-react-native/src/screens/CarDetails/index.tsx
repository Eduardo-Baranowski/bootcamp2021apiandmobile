import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';

import speedSvg from '../../assets/location.svg';
import accelerationSvg from '../../assets/mastercard.svg';
import forceSvg from '../../assets/dollar.svg';
import gasolineSvg from '../../assets/like.svg';
import exchangeSvg from '../../assets/clock.svg';
import peopleSvg from '../../assets/send.svg';

import { Container, Header, CarImages,
  Content,
  Details,
  Description,
  Brand,
  Rent,
  Name,
  Period,
  Price,
  About,
  Accessories,
  Footer
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';

interface Params {
  car: CarDTO;
}

export function CarDetails(){
  const navigation = useNavigation();
  const route = useRoute();
  const {car} = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate('Scheduling', {car});
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos}/>
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ ${car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={speedSvg}/>
          <Accessory name="3.2s" icon={accelerationSvg}/>
          <Accessory name="800 HP" icon={forceSvg}/>
          <Accessory name="Gasoline" icon={gasolineSvg}/>
          <Accessory name="Auto" icon={exchangeSvg}/>
          <Accessory name="2 Pessoas" icon={peopleSvg}/>
        </Accessories>

        <About>
          {car.about}
        </About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
