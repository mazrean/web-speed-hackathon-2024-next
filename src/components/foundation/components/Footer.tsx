import React, { useId, lazy } from 'react';

import { Color, Space } from '@/components/foundation/styles/variables';

import { Box } from './Box';
import { Flex } from './Flex';
import { DialogWithButton } from './Dialog';

export const Footer: React.FC = () => {
  const termDialogA11yId = useId();
  const contactDialogA11yId = useId();
  const questionDialogA11yId = useId();
  const companyDialogA11yId = useId();
  const overviewDialogA11yId = useId();

  const Term = lazy(() => import('./internal/Term'));
  const Contact = lazy(() => import('./internal/Contact'));
  const Question = lazy(() => import('./internal/Question'));
  const Company = lazy(() => import('./internal/Company'));
  const Overview = lazy(() => import('./internal/Overview'));

  return (
    <Box as="footer" backgroundColor={Color.Background} p={Space * 1}>
      <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
        <img alt="Cyber TOON" src="/assets/cyber-toon.svg" />
        <Flex align="start" direction="row" gap={Space * 1.5} justify="center">
          <DialogWithButton label="利用規約">
            <Term a11yId={termDialogA11yId} />
          </DialogWithButton>
          <DialogWithButton label="お問い合わせ">
            <Contact a11yId={contactDialogA11yId} />
          </DialogWithButton>
          <DialogWithButton label="Q&A">
            <Question a11yId={questionDialogA11yId} />
          </DialogWithButton>
          <DialogWithButton label="運営会社">
            <Company a11yId={companyDialogA11yId} />
          </DialogWithButton>
          <DialogWithButton label="Cyber TOONとは">
            <Overview a11yId={overviewDialogA11yId} />
          </DialogWithButton>
        </Flex>
      </Flex>
    </Box>
  );
};
