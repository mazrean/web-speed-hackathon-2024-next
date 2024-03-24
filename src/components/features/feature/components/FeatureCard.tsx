import { Suspense } from 'react';

import { Flex } from '../../../foundation/components/Flex';
import { Image, AvatarWrapper, ImgWrapper2 } from '../../../foundation/components/Image';
import { Wrapper2, ContentWrapper } from '../../../foundation/components/Box';
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

const FeatureCard: React.FC<Props> = ({ book }) => {
  return (
    <Wrapper2 href={`/books/${book.id}`}>
      <ImgWrapper2>
        <Image alt={book.image.alt} height={96} objectFit="cover" imageId={book.image.id} width={96} />
      </ImgWrapper2>

      <ContentWrapper>
        <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
          {book.name}
        </Text>
        <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
          {book.description}
        </Text>

        <Flex align="center" gap={Space * 1} justify="flex-end">
          <AvatarWrapper>
            <Image alt={book.author.name} height={32} loading='lazy' objectFit="cover" imageId={book.author.image.id} width={32} />
          </AvatarWrapper>
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            {book.author.name}
          </Text>
        </Flex>
      </ContentWrapper>
    </Wrapper2>
  );
};

const FeatureCardWithSuspense: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={null}>
      <FeatureCard {...props} />
    </Suspense>
  );
};

export { FeatureCardWithSuspense as FeatureCard };
