import React, {useEffect, useState} from "react";
import {FlatList, StatusBar} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo.svg';
import { Container, Header, TotalCars, HeaderContent, CarList, MyCarsButton} from './styles';
import { RFValue } from "react-native-responsive-fontsize";

import {Car} from '../../components/Car';
import {Load} from '../../components/Load';
import {api} from '../../services/api';
import {CarDTO} from '../../dtos/CarDTO';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', {car});
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        if(isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      }finally{
        if(isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
  },[]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
          </HeaderContent>
      </Header>
      {loading ? <Load /> :
      <FlatList
        contentContainerStyle={
          {padding: 24}
        }
        data={cars}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Car data={item} onPress={() => handleCarDetails(item)} />
        )}
      />
    }
    </Container>
  );
}
