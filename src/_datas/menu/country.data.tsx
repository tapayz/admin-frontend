import { Country } from "./type/country.type";
import koIcon from "@/assets/icons/kr.png";
import EnIcon from "@/assets/icons/en.svg";
import scIcon from "@/assets/icons/sc.png";
import tcIcon from "@/assets/icons/tc.jpg";
import jpIcon from "@/assets/icons/jp.png";
import Image from "next/image";

export const countryData: Country[] = [
  {
    id: 1,
    name: "English",
    icon: <EnIcon />,
    code: "en",
  },
  {
    id: 2,
    name: "한국어",
    icon: <Image src={koIcon} alt="한국어" width={18} height={18} />,
    code: "ko",
  },
  {
    id: 3,
    name: "日本語",
    icon: <Image src={jpIcon} alt="日本語" width={18} height={18} />,
    code: "jp",
  },
  // {
  //   id: 3,
  //   name: '简体中文',
  //   icon: <Image src={scIcon} alt="简体中文" width={18} height={18} />,
  //   code: 'sc',
  // },
  // {
  //   id: 4,
  //   name: '繁體中文',
  //   icon: <Image src={tcIcon} alt="繁體中文" width={18} height={18} />,
  //   code: 'tc',
  // },
];
