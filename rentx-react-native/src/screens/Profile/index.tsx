import React, {useState} from 'react';
import {KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useAuth} from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';
import {useTheme} from 'styled-components';
import { useNavigation } from '@react-navigation/core';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

export function Profile(){
  const {user, signOut} = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  function handleBack(){
    navigation.goBack();
  }

  function handleSignOut() {
    Alert.alert(
        'Tem certeza ?',
        'Lembre-se, que ao você sair irá precisar de internet para conectar-se novamente.',
        [
            {
                text: 'Cancelar',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Sair',
                onPress: () => signOut(),
            },
        ],
    );
}

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Container>
      <Header>
        <HeaderTop>
          <BackButton
            color={theme.colors.shape}
            onPress={handleBack}
          />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut} >
            <Feather
              name="power"
              size={24}
              color={theme.colors.shape}
            />
          </LogoutButton>
        </HeaderTop>
        <PhotoContainer>
          <Photo source={{uri: "https://avatars.githubusercontent.com/u/35973050?v=4"}} />
          <PhotoButton onPress={() => {}}>
            <Feather
              name="camera"
              size={24}
              color={theme.colors.shape}
            />
          </PhotoButton>
        </PhotoContainer>
      </Header>

      <Content style={{marginBottom: useBottomTabBarHeight()}}>
        <Options>
          <Option
            active={option === 'dataEdit'}
            onPress={() => handleOptionChange('dataEdit')}>
            <OptionTitle active={option === 'dataEdit'}>
              Dados
            </OptionTitle>
          </Option>
          <Option
            active={option === 'passwordEdit'}
            onPress={() => handleOptionChange('passwordEdit')}>
            <OptionTitle active={option === 'passwordEdit'}>
              Trocar senha
            </OptionTitle>
          </Option>
        </Options>
        { option === 'dataEdit' ?
          <Section>
            <Input
              iconName="user"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              defaultValue={user.name}
            />
            <Input
              iconName='mail'
              editable={false}
              defaultValue={user.email}
            />
          </Section>
          :
          <Section>
            <PasswordInput
              iconName="lock"
              placeholder="Senha atual"
            />
            <PasswordInput
              iconName='lock'
              placeholder="Nova senha"
            />
            <PasswordInput
              iconName='lock'
              placeholder="Repetir senha"
            />
          </Section>

        }
      </Content>
    </Container>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
