import React, {useState, useEffect} from 'react';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import {AntDesign} from "@expo/vector-icons";
import {FlatList, StatusBar} from 'react-native';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { BackButton } from '../../components/BackButton';
import { Load } from '../../components/Load';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from 'styled-components';
import { Car } from '../../components/Car';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';

interface CarProps {
  car: CarDTO;
  id: string;
  start_date: string;
  end_date: string;
}

export function MyCars(){
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() =>{
    async function fetchCars() {
      try {
        const response = await api.get("/rentals")
        console.log(response.data)
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  },[])

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          o fim do aluguel
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>

      {loading ? <Load /> :
      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>
        <FlatList
          data={cars}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <CarWrapper>
              <Car data={item.car}/>
              <CarFooter>
                <CarFooterTitle>Período</CarFooterTitle>
                <CarFooterPeriod>
                  <CarFooterDate>{format(getPlatformDate(new Date(item.start_date)), 'dd/MM/yyyy')}</CarFooterDate>
                  <AntDesign
                    name="arrowright"
                    size={20}
                    color={theme.colors.title}
                    style={{marginHorizontal: 11}}
                  />
                  <CarFooterDate>{format(getPlatformDate(new Date(item.end_date)), 'dd/MM/yyyy')}</CarFooterDate>
                </CarFooterPeriod>
              </CarFooter>
            </CarWrapper>
          )}
        />
      </Content>
      }
    </Container>
  );
}
