import zoneVibe from "../../public/images/zone-vibe-1.png";
import ergo from "../../public/images/ergo-1.png";
import master from "../../public/images/master-1.png";
import streem from "../../public/images/streem-1.png";

export const categoryCardData = {
  headphone: {
    img: zoneVibe,
    href: "/products/category/quloqchinlar",
    name: "haedsets",
    wh: { w: 280, h: 200 },
  },
  keyboard: {
    img: ergo,
    href: "/products/category/klaviaturalar",
    name: "keyboards",
    wh: { w: 500, h: 500 },
  },
  mouse: {
    img: master,
    href: "/products/category/sichqonchalar",
    name: "mouses",
    wh: { w: 200, h: 300 },
  },
  camera: {
    img: streem,
    href: "/products/category/veb-kameralar",
    name: "cameras",
    wh: { w: 150, h: 350 },
  },
};

export const categorys = [
  { icon: master, name: "Sichqonchalar" },
  { icon: master, name: "Quloqchinlar" },
  { icon: master, name: "Klaviaturalar" },
  { icon: master, name: "Kombo to’plam" },
  { icon: master, name: "Veb Kameralar" },
  { icon: master, name: "Presenterlar" },
];

export const subHeaderLinks = [
  {
    name: "Top maxsulotlar",
    href: "/products/quick-search/top-rated",
    key: 1,
  },
  {
    name: "<b>PRO</b> seriya",
    href: "/products/quick-search/pro",
    key: 8,
  },
  {
    name: "<b>Gaming</b> seriya",
    href: "/products/quick-search/gaming",
    key: 6,
  },
  {
    name: "<b>ERGO</b> seriya",
    href: "/products/quick-search/ergo",
    key: 4,
  },
  {
    name: "<b>MX</b> seriya",
    href: "/products/quick-search/mx",
    key: 5,
  },
  {
    name: "<b>KOMBO</b> to'plamlar",
    href: "/products/quick-search/combo",
    key: 2,
  },
  {
    name: "Konferensiyalar uchun",
    href: "/products/quick-search/conference",
    key: 7,
  },
  {
    name: "Siz uchun",
    href: "/products/quick-search/for-you",
    key: 3,
  },
];

export const shortInfo = [
  { name: "Balandlik", value: "125,0 mm" },
  { name: "Kenglik", value: "63,5 mm" },
  { name: "Chuqurlik", value: "40,0 mm" },
  { name: "Vazn", value: "63 g" },
  { name: "Optik Sensor", value: "HERO 25K" },
  { name: "Rezolyutsiya", value: "25,600 DPI" },
  { name: "Batareya muddati", value: "70 soat" },
];

export const colors = [
  { name: "Qizil", value: "red" },
  { name: "Qora", value: "blue" },
  { name: "Oq", value: "white" },
  { name: "Kulrang", value: "gray" },
];

export const categories = [
  { name: "Sichoqonchalar", href: "sichoqonchalar" },
  { name: "Klaviaturalar", href: "klaviaturalar" },
  { name: "Quloqchinlar", href: "headsets" },
  { name: "Prezenterlar", href: "prezenters" },
];

export const productSliderImages = [
  // "https://cdn.mediapark.uz/imgs/390ecc17-a1b7-4a3f-b758-18287acae41c.webp",
  // "https://cdn.mediapark.uz/imgs/2f16e8ca-ea58-45cd-b380-0ab079c7e209.webp",
  // "https://cdn.mediapark.uz/imgs/baa898f6-b14b-4788-b1f0-cfc0fd9a4e7e.webp",
  // "https://cdn.mediapark.uz/imgs/b6ddb294-38d1-43ed-9c82-c7971473a668.webp",
  // "https://cdn.mediapark.uz/imgs/b6ddb294-38d1-43ed-9c82-c7971473a668.webp",
  // "https://cdn.mediapark.uz/imgs/5dfbba3b-54cb-462d-aa06-9ab73bcbbd7f.webp"
  "https://api.logitech.uz/media/products/9498ecbf-ae99-497b-a539-2c94634afbe4.webp",
  "https://api.logitech.uz/media/products/3b9e316f-595a-44e1-9dfb-90c96e833c8a.webp",
  "https://api.logitech.uz/media/products/6f7d0966-4121-4430-8008-1c50ceb21a1b.webp",
  "https://api.logitech.uz/media/products/25513d5f-f65d-409e-b84b-5dd7bb3fba31.webp",
  "https://api.logitech.uz/media/products/25513d5f-f65d-409e-b84b-5dd7bb3fba31.webp",
  "https://api.logitech.uz/media/products/25513d5f-f65d-409e-b84b-5dd7bb3fba31.webp",
];

export const bannerImages = [
  "https://api.logitech.uz/media/banner/859f9156-1fd0-4e54-bcca-c1c6c3afb415.webp",
  "https://api.logitech.uz/media/banner/2b1feec1-20e5-44ca-8793-5b4344f70d80.webp",
  "https://api.logitech.uz/media/banner/70fd088c-0a3e-49ec-85f2-2b2faadf9246.webp",
  "https://api.logitech.uz/media/banner/1cab7837-bd76-4891-bcc6-84918aa8e7e5.webp",
  "https://api.logitech.uz/media/banner/7793685a-c0e9-4739-8b55-04d54e7009a0.webp",
];


export const products = [
  {
    id: 1,
    name: "Logitech G PRO X | League of Legends edition",
    price: "1 362 000 so’m",
    image: "https://api.logitech.uz/media/products/9498ecbf-ae99-497b-a539-2c94634afbe4.webp",
    rating: 3,
    color: [{ id: 1, name: "Qizil", value: "red", qty: 10 }, { id: 2, name: "Oq", value: "white", qty: 10 }],
  },
  {
    id: 2,
    name: "Logitech G PRO X | League of Legends edition 2",
    price: "1 362 000 so’m",
    image: "https://api.logitech.uz/media/products/9498ecbf-ae99-497b-a539-2c94634afbe4.webp",
    rating: 4,
    color: [{ id: 1, name: "Qora", value: "black", qty: 10 }, { id: 2, name: "Qizil", value: "red", qty: 10 }],
  },
  {
    id: 3,
    name: "Logitech G PRO X | League of Legends edition 3",
    price: "1 362 000 so’m",
    image: "https://api.logitech.uz/media/products/9498ecbf-ae99-497b-a539-2c94634afbe4.webp",
    rating: 5,
    color: [
      { id: 1, name: "Oq", value: "white", qty: 10 },
      // {id: 2, name: "Qora", value: "black", qty: 10} 
    ],
  }
]