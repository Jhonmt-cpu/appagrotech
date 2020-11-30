import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled, { css } from 'styled-components/native';

interface CarenciaContainer {
  isInCarencia: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px ${Platform.OS === 'android' ? 60 : 40}px;
  background: #fff;
`;

export const InfoContainer = styled.View`
  margin-top: 24px;
  padding: 24px 24px 0 24px;
  width: 100%;
  border: 1px solid #74d469;
  border-radius: 20px;
`;

export const Line = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const DataOne = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #74d469;
`;

export const DataTwo = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

export const CarenciaContainer = styled.View<CarenciaContainer>`
  align-items: center;
  margin-bottom: 20px;
  border: #74d469 solid 1px;
  padding: 20px;
  border-radius: 20px;

  ${props =>
    props.isInCarencia &&
    css`
      border-color: red;
    `}
`;

export const CarenciaText = styled.Text<CarenciaContainer>`
  color: #74d469;
  font-weight: bold;
  font-size: 14px;

  ${props =>
    props.isInCarencia &&
    css`
      color: red;
    `}
`;

export const AnotacoesContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
  border: #74d469 solid 1px;
  padding: 20px;
  border-radius: 20px;
`;

export const AnotacoesText = styled.Text`
  color: #74d469;
  font-weight: bold;
  font-size: 14px;
`;

export const AddDoencaContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 20px;
  border: #74d469 solid 1px;
  padding: 20px;
  border-radius: 20px;
`;

export const AddDoencaText = styled.Text`
  color: #74d469;
  font-weight: bold;
  font-size: 14px;
`;

export const VeterinaryTableContainer = styled.View`
  align-items: center;
  width: 100%;
`;

export const VeterinaryTableHeader = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

export const VeterinaryTableTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
`;

export const VeterinaryTable = styled.View`
  width: 100%;
  margin-top: 24px;
`;

export const Item = styled.TouchableOpacity`
  width: 100%;
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: #74d469 solid 1px;
  padding: 24px;
  border-radius: 20px;
  margin-bottom: 20px;
`;

export const ItemInfo = styled.View``;

export const Info = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #74d469;
`;

export const Date = styled.Text`
  color: #74d469;
`;

export const EditAnimalButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #74d469;
  border-top-width: 1px;
  border-color: #74d469;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const EditAnimalButtonText = styled.Text`
  font-size: 18px;
`;
