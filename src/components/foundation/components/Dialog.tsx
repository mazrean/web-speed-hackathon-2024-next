"use client";

import { Close } from '@mui/icons-material';
import { useAtom } from 'jotai';
import styled from 'styled-components';

import { DialogContentAtom } from '../atoms/DialogContentAtom';
import { Color, Space } from '@/components/foundation/styles/variables';
import { Button2 } from './Button';

import { Button } from './Button';
import { useState } from 'react';

const _Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const _Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - ${Space * 8}px);
  max-width: 480px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
`;

const _Container = styled.div`
  padding: ${Space * 2}px;
  border-radius: 4px;
  background-color: ${Color.MONO_A};
  height: 540px;
  overflow: scroll;
`;

const _CloseButton = styled(Button)`
  border-radius: 50%;
  height: 32px;
  width: 32px;
  position: absolute;
  top: -${Space * 5}px;
  left: -${Space * 1}px;
`;

export const Dialog: React.FC = () => {
  const [content, updateContent] = useAtom(DialogContentAtom);

  return content != null ? (
    <_Overlay>
      <_Wrapper>
        <_CloseButton onClick={() => updateContent(null)}>
          <Close height={32} htmlColor={Color.MONO_A} width={32} />
        </_CloseButton>
        <_Container>{content}</_Container>
      </_Wrapper>
    </_Overlay>
  ) : null;
};

type Props = {
  children: React.ReactNode;
  label: string;
};

export const DialogWithButton: React.FC<Props> = ({children, label}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button2 disabled={false} onClick={() => setIsOpen(true)}>
        {label}
      </Button2>

      {isOpen && <_Overlay>
        <_Wrapper>
          <_CloseButton onClick={() => setIsOpen(false)}>
            <Close height={32} htmlColor={Color.MONO_A} width={32} />
          </_CloseButton>
          <_Container>{children}</_Container>
        </_Wrapper>
      </_Overlay>}
    </>
  );
};
