import React from "react";
import { QUESTION } from '../../constants/Question';
import { Text, Content } from '../Text';
import { Spacer } from '../Spacer';
import { Color, Space, Typography } from '@/components/foundation/styles/variables';

type Props = {
  a11yId: string;
};

const Contact: React.FC<Props> = ({ a11yId }) => {
  return (
    <Content aria-labelledby={a11yId} role="dialog">
      <Text as="h2" color={Color.MONO_100} id={a11yId} typography={Typography.NORMAL16}>
        Q&A
      </Text>
      <Spacer height={Space * 1} />
      <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
        {QUESTION}
      </Text>
    </Content>
  );
};

export default Contact;
