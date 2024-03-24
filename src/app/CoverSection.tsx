import { Search } from '@mui/icons-material';

import { SearchLink, Wrapper4 } from '@/components/foundation/components/Box';
import { Text } from '@/components/foundation/components/Text';
import { Color, Typography } from '@/components/foundation/styles/variables';

import { HeroImage } from './HeroImage';

export const CoverSection: React.FC = () => {
  return (
    <Wrapper4>
      <HeroImage />
      <SearchLink href="/search">
        <Search height={24} htmlColor={Color.MONO_A} width={24} />
        <Text color={Color.MONO_A} typography={Typography.NORMAL16}>
          検索
        </Text>
      </SearchLink>
    </Wrapper4>
  );
};
