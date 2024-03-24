'use client'

import type * as CSS from 'csstype';
import styled from 'styled-components';

import { addUnitIfNeeded } from '@/lib/css/addUnitIfNeeded';
import { useImage } from '@/lib/image/getImageUrl';
import { Suspense } from 'react';
import { Radius } from '../styles/variables';

const _Div = styled.div<{
  $height: number | string;
  $width: number | string;
}>`
  width: ${({ $width }) => addUnitIfNeeded($width)};
  height: ${({ $height }) => addUnitIfNeeded($height)};
`

const _Image = styled.img<{
  $height: number | string;
  $objectFit: string;
  $width: number | string;
}>`
  object-fit: ${({ $objectFit }) => $objectFit};
  width: ${({ $width }) => addUnitIfNeeded($width)};
  height: ${({ $height }) => addUnitIfNeeded($height)};
  display: block;
`;

type Props = {
  height: number;
  objectFit: CSS.Property.ObjectFit;
  width: number;
  imageId: string;
} & JSX.IntrinsicElements['img'];

export const Image: React.FC<Props> = ({ height, loading = 'lazy', objectFit, width, imageId, ...rest }) => {
  const imageUrl = useImage({ height, imageId, width });

  return (
    <Suspense fallback={<_Div $height={height} $width={width} />}>
      <_Image {...rest} $height={height} $objectFit={objectFit} $width={width} loading={loading} src={imageUrl} />
    </Suspense>
  );
};

const _Image2 = styled.img`
  display: inline-block;
  width: 100%;
  object-fit: fill;
  height: 100%;
`;

type Props2 = {
  height: number;
  width: number;
  imageId: string;
} & JSX.IntrinsicElements['img'];

export const Image2: React.FC<Props2> = ({ height, width, imageId, ...rest }) => {
  const imageUrl = useImage({ height, imageId, width });

  return (
    <Suspense fallback={<_Div $height="100%" $width="100%" />}>
      <_Image2 {...rest} loading="lazy" src={imageUrl} />
    </Suspense>
  );
};

export const ImgWrapper = styled.div`
  > img {
    border-radius: ${Radius.SMALL} ${Radius.SMALL} 0 0;
  }
`;

export const ImgWrapper2 = styled.div`
  width: 96px;
  height: 96px;
  > img {
    border-radius: ${Radius.SMALL};
  }
`;

export const AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  > img {
    border-radius: 50%;
  }
`;
