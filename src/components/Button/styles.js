import styled from 'styled-components';
import { shade } from 'polished';

export const SHADE = 0.2;

export const StyledButton = styled.button`
  width: 108px;
  height: 36px;
  border: none;
  background-color: #ff872c;
  color: white;
  border-radius: 5px;
  margin-right: 16px;

  &:enabled:hover {
    background-color: ${shade(SHADE, '#ff872c')};
  }

  &:disabled {
    background-color: grey;
  }
`;
