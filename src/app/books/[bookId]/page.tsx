import { useParams } from 'next/navigation'

import { EpisodeListItem } from '@/components/features/episode/components/EpisodeListItem';
import { Box, HeadingWrapper, AuthorWrapper } from '@/components/foundation/components/Box';
import { Flex } from '@/components/foundation/components/Flex';
import { Image, AvatarWrapper } from '@/components/foundation/components/Image';
import { Separator } from '@/components/foundation/components/Separator';
import { Spacer } from '@/components/foundation/components/Spacer';
import { Text } from '@/components/foundation/components/Text';
import { Color, Space, Typography } from '@/components/foundation/styles/variables';
import { Dialog } from '@/components/foundation/components/Dialog';
import { GlobalStyle } from '@/components/foundation/styles/GlobalStyle';

import { BottomNavigator } from './BottomNavigator';
import { bookRepository, episodeRepository } from '@/lib/repositories';

export default async function BookDetail({ params: {bookId} }: { params: { bookId: string } }) {
  const result = await bookRepository.read({ params: { bookId }});
  if (result.isErr()) {
    throw result.error;
  }
  const book = result.value;

  const episodeResult = await episodeRepository.readAll({ query: {
    bookId,
  }});
  if (episodeResult.isErr()) {
    throw episodeResult.error;
  }
  const episodeList = episodeResult.value;
  const latestEpisode = episodeList?.find((episode) => episode.chapter === 1);

  return (
    <>
      <GlobalStyle />
      <Dialog />
      <Box height="100%" position="relative" px={Space * 2}>
        <HeadingWrapper aria-label="作品情報">
          <Image alt={book.name} height={256} objectFit="cover" imageId={book.image.id} width={192} />
          <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-end">
            <Box>
              <Text color={Color.MONO_100} typography={Typography.NORMAL20} weight="bold">
                {book.name}
              </Text>
              <Spacer height={Space * 1} />
              <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL14}>
                {book.description}
              </Text>
            </Box>

            <Spacer height={Space * 1} />

            <AuthorWrapper href={`/authors/${book.author.id}`}>
              <AvatarWrapper>
                <Image alt={book.author.name} height={32} objectFit="cover" imageId={book.author.image.id} width={32} />
              </AvatarWrapper>
              <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
                {book.author.name}
              </Text>
            </AuthorWrapper>
          </Flex>
        </HeadingWrapper>

        <BottomNavigator
          bookId={bookId}
          latestEpisodeId={latestEpisode?.id ?? ''}
        />

        <Separator />

        <section aria-label="エピソード一覧">
          <Flex align="center" as="ul" direction="column" justify="center">
            {episodeList.map((episode) => (
              <EpisodeListItem key={episode.id} bookId={bookId} episode={episode} />
            ))}
            {episodeList.length === 0 && (
              <>
                <Spacer height={Space * 2} />
                <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
                  この作品はまだエピソードがありません
                </Text>
              </>
            )}
          </Flex>
        </section>
      </Box>
    </>
  );
};
