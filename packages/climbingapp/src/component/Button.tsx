import styled from 'styled-components/native';
interface ButtonProps {
    bgColor: string;
    color: string;
    width: string;
    height: string;
    text: string;
    icon?: React.ReactNode;
    onPress: ({ }: any) => void;
}

export const DefaultButton = styled.TouchableOpacity<ButtonProps>`
    background-color: ${props => props.bgColor};
    width: ${props => props.width};
    height: ${props => props.height};
    text-align: center;
    justify-content: center;
    color: ${props => props.color};
    border-radius: 8px;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    flex: 1;
`;