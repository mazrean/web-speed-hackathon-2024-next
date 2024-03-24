import { NavigateNext } from '@mui/icons-material';
import { Suspense } from 'react';

import { Box, Wrapper3, Link2 } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Image, AvatarWrapper, ImgWrapper2 } from '../../../foundation/components/Image';
import { Separator } from '../../../foundation/components/Separator';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Space, Typography } from '../../../foundation/styles/variables';

type Props = {
  book: {
    author: {
        description: string;
        id: string;
        image: {
            alt: string;
            id: string;
        };
        name: string;
    };
    description: string;
    episodes: {
        chapter: number;
        description: string;
        id: string;
        name: string;
    }[];
    id: string;
    image: {
        alt: string;
        id: string;
    };
    name: string;
  };
};

const RankingCard: React.FC<Props> = ({ book }) => {
  return (
    <Wrapper3>
      <Link2 href={`/books/${book.id}`}>
        <Spacer height={Space * 1.5} />
        <Flex align="flex-start" gap={Space * 2.5} justify="flex-start">
          <ImgWrapper2>
            <Image alt={book.name} height={96} loading='lazy' objectFit="cover" imageId={book.image.id} width={96} />
          </ImgWrapper2>
          <Box width="100%">
            <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
              <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                {book.name}
              </Text>
              <Text as="p" color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.description}
              </Text>
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" gap={Space * 1} justify="flex-end">
              <AvatarWrapper>
                <Image
                  alt={`${book.author.name}のアイコン`}
                  height={32}
                  loading='lazy'
                  objectFit="cover"
                  imageId={book.author.image.id}
                  width={32}
                />
              </AvatarWrapper>
              <Text color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.author.name}
              </Text>
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" justify="flex-end">
              <Text color={Color.Secondary} typography={Typography.NORMAL14} weight="bold">
                この漫画を読む
              </Text>
              <NavigateNext height={32} htmlColor={Color.Secondary} width={32} />
            </Flex>
          </Box>
        </Flex>
        <Spacer height={Space * 1.5} />
        <Separator />
      </Link2>
    </Wrapper3>
  );
};

const RankingCardWithSuspense: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={null}>
      <RankingCard {...props} />
    </Suspense>
  );
};

export { RankingCardWithSuspense as RankingCard };
