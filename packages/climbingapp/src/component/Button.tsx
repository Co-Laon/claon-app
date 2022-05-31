import styled from 'styled-components/native';
interface ButtonProps {
    color: string;
    width: string;
    height: string;
    icon?: React.ReactNode;
    onPress: ({ }: any) => void;
}

export const DefaultButton = styled.TouchableOpacity<ButtonProps>`
    background-color: ${props => props.color};
    width: max-width;
    height: 40px;
    border-radius: 8px;
    flex: 1;
`;
