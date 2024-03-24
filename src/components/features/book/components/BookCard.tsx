import { Flex } from '../../../foundation/components/Flex';
import { Image, ImgWrapper, AvatarWrapper } from '../../../foundation/components/Image';
import { Wrapper } from '../../../foundation/components/Box';
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

const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <Wrapper href={`/books/${book.id}`}>
      <ImgWrapper>
        <Image alt={book.image.alt} height={128} loading='lazy' objectFit="cover" imageId={book.image.id} width={192} />
      </ImgWrapper>

      <Flex align="stretch" direction="column" flexGrow={1} gap={Space * 1} justify="space-between" p={Space * 2}>
        <Text color={Color.MONO_100} typography={Typography.NORMAL14} weight="bold">
          {book.name}
        </Text>

        <Flex align="center" gap={Space * 1} justify="flex-end">
          <AvatarWrapper>
            <Image alt={book.author.name} height={32} loading='lazy' objectFit="cover" imageId={book.author.image.id} width={32} />
          </AvatarWrapper>
          <Text color={Color.MONO_100} typography={Typography.NORMAL12}>
            {book.author.name}
          </Text>
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export { BookCard };
