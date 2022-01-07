import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal,
  RentalPriceDetails,
} from './styles';

import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { CarDTO } from '../../dtos/CarDTO';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { format } from 'date-fns';
import { api } from '../../services/api';
import { Alert } from 'react-native';
import { getAcessoryIcon } from '../../utils/getAcessoryIcon';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails(){
  const [loading, setLoading] = useState(false)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const theme = useTheme();

  const navigation = useNavigation();
  const route = useRoute();
  const {car, dates} = route.params as Params;

  const rentalTotal = Number(dates.length * car.price)

  async function handleConfirmRental() {
    console.log(car.id)
    console.log(rentalPeriod.start)
    console.log(rentalPeriod.end)
    console.log(dates.length)

    api.post(`/rentals`, {
      car_id: car.id,
      start_date: rentalPeriod.start,
      end_date: rentalPeriod.end,
      total:  dates.length
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'Home',
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\n até uma concessionária da RENTEX\n pegar o seu automóvel.`,
      })
    })
    .catch(() => {
      setLoading(false);
      Alert.alert("Não foi possível confirmar o agendamento!")
    })

  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  },[])

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
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {/* {
            car.acessories.map(accessory => {
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAcessoryIcon(accessory.type)}
              />
            })
          } */}
          <Accessory name="380Km/h" icon={speedSvg}/>
          <Accessory name="3.2s" icon={accelerationSvg}/>
          <Accessory name="800 HP" icon={forceSvg}/>
          <Accessory name="Gasoline" icon={gasolineSvg}/>
          <Accessory name="Auto" icon={exchangeSvg}/>
          <Accessory name="2 Pessoas" icon={peopleSvg}/>
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.text}
            />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
