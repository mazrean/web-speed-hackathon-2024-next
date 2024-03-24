import React from "react";
import { COMPANY } from '../../constants/Company';
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
        運営会社
      </Text>
      <Spacer height={Space * 1} />
      <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
        {COMPANY}
      </Text>
    </Content>
  );
};

export default Contact;
