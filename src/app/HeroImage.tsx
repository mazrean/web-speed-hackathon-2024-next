import { Wrapper5 } from '@/components/foundation/components/Box';
import { Image2 } from '@/components/foundation/components/Image';

export const HeroImage: React.FC = () => {
  const width = 1024;
  const height = (width / 16) * 9;
  return (
    <Wrapper5>
      <Image2 alt="Cyber TOON" imageId='4a2c68cf-53eb-4b66-a4de-e1c2bf1c13c8' width={width} height={height} />
    </Wrapper5>
  );
};
