import { colorStyles } from 'climbingapp/src/styles';
import styled from 'styled-components/native';

export const TitleContainer = styled.View`
    justify-content: center;
    margin-top: 10;
    flex: 1;
`;

export const Title = styled.Text`
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 30;
    color: ${colorStyles.Gray800};
`;