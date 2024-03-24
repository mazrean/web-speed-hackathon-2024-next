import _ from 'lodash';
import moment from 'moment-timezone';
import { Suspense, useId } from 'react';

import { BookCard } from '@/components/features/book/components/BookCard';
import { FeatureCard } from '@/components/features/feature/components/FeatureCard';
import { RankingCard } from '@/components/features/ranking/components/RankingCard';
import { Box } from '@/components/foundation/components/Box';
import { Flex } from '@/components/foundation/components/Flex';
import { Spacer } from '@/components/foundation/components/Spacer';
import { Text } from '@/components/foundation/components/Text';
import { Color, Space, Typography } from '@/components/foundation/styles/variables';
import { getDayOfWeekStr } from '@/lib/date/getDayOfWeekStr';
import { Dialog } from '@/components/foundation/components/Dialog';
import { GlobalStyle } from '@/components/foundation/styles/GlobalStyle';

import { CoverSection } from './CoverSection';
import { featureRepository, rankingRepository, releaseRepository } from "@/lib/repositories";

const FeatureSection: React.FC<{
  a11yId: string;
}> = async ({a11yId}) => {
  const result = await featureRepository.readAll({ query: {} });
  if (result.isErr()) {
    throw result.error;
  }

  const featureList = result.value;
  return (
    <Box aria-labelledby={a11yId} as="section" maxWidth="100%" mt={16} width="100%">
      <Text as="h2" color={Color.MONO_100} id={a11yId} typography={Typography.NORMAL20} weight="bold">
        ピックアップ
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
        <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
          {_.map(featureList, (feature) => (
            <FeatureCard key={feature.id} book={feature.book} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const RankingSection: React.FC<{
  a11yId: string;
}> = async ({a11yId}) => {
  const result = await rankingRepository.readAll({ query: {} });
  if (result.isErr()) {
    throw result.error;
  }

  const rankingList = result.value;
  return (
    <Box aria-labelledby={a11yId} as="section" maxWidth="100%" width="100%">
      <Text as="h2" color={Color.MONO_100} id={a11yId} typography={Typography.NORMAL20} weight="bold">
        ランキング
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
        <Flex align="center" as="ul" direction="column" justify="center">
          {_.map(rankingList, (ranking) => (
            <RankingCard key={ranking.id} book={ranking.book} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const ReleaseSection: React.FC<{
  a11yId: string;
}> = async ({a11yId}) => {
  const todayStr = getDayOfWeekStr(moment());
  const result = await releaseRepository.read({ params: { dayOfWeek: todayStr } })
  if (result.isErr()) {
    throw result.error;
  }

  const release = result.value;
  return (
    <Box aria-labelledby={a11yId} as="section" maxWidth="100%" width="100%">
      <Text as="h2" color={Color.MONO_100} id={a11yId} typography={Typography.NORMAL20} weight="bold">
        本日更新
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
        <Flex align="stretch" gap={Space * 2} justify="flex-start">
          {_.map(release.books, (book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default function Home() {
  const pickupA11yId = useId();
  const rankingA11yId = useId();
  const todayA11yId = useId();

  return (
    <>
      <GlobalStyle />
      <Dialog />
      <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
        <Box as="header" maxWidth="100%" width="100%">
          <CoverSection />
        </Box>
        <Box as="main" maxWidth="100%" width="100%">
          <Suspense fallback={null}>
            <FeatureSection a11yId={pickupA11yId} />
          </Suspense>

          <Spacer height={Space * 2} />

          <Suspense fallback={null}>
            <RankingSection a11yId={rankingA11yId} />
          </Suspense>

          <Spacer height={Space * 2} />

          <Suspense fallback={null}>
            <ReleaseSection a11yId={todayA11yId} />
          </Suspense>
        </Box>
      </Flex>
    </>
  );
}
