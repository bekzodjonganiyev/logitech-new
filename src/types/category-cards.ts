import { StaticImageData } from "next/image";

export type CategoryCardsType = {
  img: StaticImageData;
  href: string;
  name: string;
  wh: {w: number, h: number};
  className?: string
  imgClassName?: string
};
