'use client'

import type * as CSS from 'csstype';
import type { AriaAttributes } from 'react';
import styled from 'styled-components';

import { addUnitIfNeeded } from '@/lib/css/addUnitIfNeeded';
import { Color, Radius, Space } from '@/components/foundation/styles/variables';
import { Link } from './Link';

const _Box = styled.div<{
  $backgroundColor?: string;
  $bottom?: number;
  $color?: string;
  $flexGrow?: CSS.Property.FlexGrow;
  $flexShrink?: CSS.Property.FlexShrink;
  $height?: number | string;
  $left?: number;
  $m?: number;
  $maxHeight?: number | string;
  $maxWidth?: number | string;
  $mb?: number;
  $ml?: number;
  $mr?: number;
  $mt?: number;
  $mx?: number;
  $my?: number;
  $overflow?: CSS.Property.Overflow;
  $overflowX?: CSS.Property.Overflow;
  $overflowY?: CSS.Property.Overflow;
  $p?: number;
  $pb?: number;
  $pl?: number;
  $position?: string;
  $pr?: number;
  $pt?: number;
  $px?: number;
  $py?: number;
  $radius?: string;
  $right?: number;
  $top?: number;
  $width?: number | string;
}>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: ${({ $radius }) => $radius};
  bottom: ${({ $bottom }) => addUnitIfNeeded($bottom)};
  color: ${({ $color }) => $color};
  flex-grow: ${({ $flexGrow }) => $flexGrow};
  flex-shrink: ${({ $flexShrink }) => $flexShrink};
  height: ${({ $height }) => addUnitIfNeeded($height)};
  left: ${({ $left }) => addUnitIfNeeded($left)};
  margin-bottom: ${({ $mb, $my }) => addUnitIfNeeded($my ?? $mb)};
  margin-left: ${({ $ml, $mx }) => addUnitIfNeeded($mx ?? $ml)};
  margin-right: ${({ $mr, $mx }) => addUnitIfNeeded($mx ?? $mr)};
  margin-top: ${({ $mt, $my }) => addUnitIfNeeded($my ?? $mt)};
  margin: ${({ $m }) => addUnitIfNeeded($m)};
  max-height: ${({ $maxHeight }) => addUnitIfNeeded($maxHeight)};
  max-width: ${({ $maxWidth }) => addUnitIfNeeded($maxWidth)};
  overflow-x: ${({ $overflow, $overflowX }) => $overflow ?? $overflowX};
  overflow-y: ${({ $overflow, $overflowY }) => $overflow ?? $overflowY};
  padding-bottom: ${({ $pb, $py }) => addUnitIfNeeded($py ?? $pb)};
  padding-left: ${({ $pl, $px }) => addUnitIfNeeded($px ?? $pl)};
  padding-right: ${({ $pr, $px }) => addUnitIfNeeded($px ?? $pr)};
  padding-top: ${({ $pt, $py }) => addUnitIfNeeded($py ?? $pt)};
  padding: ${({ $p }) => addUnitIfNeeded($p)};
  position: ${({ $position }) => $position};
  right: ${({ $right }) => addUnitIfNeeded($right)};
  top: ${({ $top }) => addUnitIfNeeded($top)};
  width: ${({ $width }) => addUnitIfNeeded($width)};
`;

type Props = {
  ['aria-label']?: AriaAttributes['aria-label'];
  ['aria-labelledby']?: AriaAttributes['aria-labelledby'];
  as?: keyof JSX.IntrinsicElements;
  backgroundColor?: Color;
  bottom?: number;
  children: React.ReactNode;
  color?: Color;
  flexGrow?: CSS.Property.FlexGrow;
  flexShrink?: CSS.Property.FlexShrink;
  height?: number | string;
  left?: number;
  m?: number;
  maxHeight?: number | string;
  maxWidth?: number | string;
  mb?: number;
  ml?: number;
  mr?: number;
  mt?: number;
  mx?: number;
  my?: number;
  overflow?: CSS.Property.Overflow;
  overflowX?: CSS.Property.Overflow;
  overflowY?: CSS.Property.Overflow;
  p?: number;
  pb?: number;
  pl?: number;
  position?: CSS.Property.Position;
  pr?: number;
  pt?: number;
  px?: number;
  py?: number;
  radius?: Radius;
  right?: number;
  top?: number;
  width?: number | string;
};

export const Box: React.FC<Props> = ({
  ['aria-label']: ariaLabel,
  ['aria-labelledby']: ariaLabelledBy,
  as,
  backgroundColor,
  bottom,
  children,
  color,
  flexGrow,
  flexShrink,
  height,
  left,
  m,
  maxHeight,
  maxWidth,
  mb,
  ml,
  mr,
  mt,
  mx,
  my,
  overflow,
  overflowX,
  overflowY,
  p,
  pb,
  pl,
  position,
  pr,
  pt,
  px,
  py,
  radius,
  right,
  top,
  width,
}) => {
  return (
    <_Box
      $backgroundColor={backgroundColor}
      $bottom={bottom}
      $color={color}
      $flexGrow={flexGrow}
      $flexShrink={flexShrink}
      $height={height}
      $left={left}
      $m={m}
      $maxHeight={maxHeight}
      $maxWidth={maxWidth}
      $mb={mb}
      $ml={ml}
      $mr={mr}
      $mt={mt}
      $mx={mx}
      $my={my}
      $overflow={overflow}
      $overflowX={overflowX}
      $overflowY={overflowY}
      $p={p}
      $pb={pb}
      $pl={pl}
      $position={position}
      $pr={pr}
      $pt={pt}
      $px={px}
      $py={py}
      $radius={radius}
      $right={right}
      $top={top}
      $width={width}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      as={as}
    >
      {children}
    </_Box>
  );
};

export const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: ${Radius.SMALL};
  background-color: ${Color.MONO_A};
  max-width: 192px;
  border: 1px solid ${Color.MONO_30};
`;

export const Wrapper2 = styled(Link)`
  display: grid;
  gap: ${Space * 1}px;
  background-color: ${Color.MONO_A};
  padding: ${Space * 1.5}px;
  border-radius: ${Radius.SMALL};
  grid-template-columns: auto 1fr;
  flex-shrink: 0;
  border: 1px solid ${Color.MONO_30};
`;

export const Wrapper3 = styled.li`
  width: 100%;
`;

export const Wrapper4 = styled.div`
  width: calc(100% + ${Space * 4}px);
  margin-left: -${Space * 2}px;
  margin-right: -${Space * 2}px;
  margin-top: -${Space * 2}px;
  position: relative;
`;

export const Wrapper5 = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: grid;
  gap: ${Space * 1}px;
  max-width: 200px;
  width: 100%;
`;

export const Link2 = styled(Link)`
  width: 100%;
`;

export const SearchLink = styled(Link)`
  position: absolute;
  right: ${Space * 1}px;
  top: 0;
  padding: ${Space * 1}px ${Space * 2}px;
  border: 2px solid ${Color.MONO_A};
  border-radius: ${Radius.X_LARGE};
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(50%);
`;

export const Content = styled.div`
  height: 100%;
  padding: 0 ${Space * 2}px;
`;
