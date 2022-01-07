import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StatusBar, useWindowDimensions} from 'react-native';
import LogoSvg from '../../assets/close.svg'
import DoneSvg from '../../assets/bell.svg'


import {
  Container,
  Content,
  Title,
  Message,
  Footer,
 } from './styles';

 interface Params {
   title: string;
   message: string;
   nextScreenRoute: string;
 }
import { ConfirmButton } from '../../components/ConfirmButton';

export function Confirmation(){
  const route = useRoute();
  const {width} = useWindowDimensions();
  const {title, message, nextScreenRoute} = route.params as Params;
  const navigation = useNavigation();

  function handleConfirm() {
    navigation.navigate(nextScreenRoute);
  }

  return (
    <Container>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>
        <Message>
          {message}
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm}/>
      </Footer>

    </Container>
  );
}
