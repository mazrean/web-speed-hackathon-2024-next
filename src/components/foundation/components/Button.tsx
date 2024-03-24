"use client";

import styled from 'styled-components';

import { Typography, Color } from '@/components/foundation/styles/variables';

const _Button = styled.button`
  ${Typography.NORMAL14}
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

type Props = {
  children: React.ReactNode;
} & JSX.IntrinsicElements['button'];

export const Button: React.FC<Props> = ({ children, ...rest }) => {
  return <_Button {...rest}>{children}</_Button>;
};

export const Button2 = styled(Button)`
  color: ${Color.MONO_A};
`;
