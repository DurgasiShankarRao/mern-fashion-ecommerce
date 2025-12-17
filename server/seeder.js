// server/seeder.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI in .env");
  process.exit(1);
}

const products = [
  {
    name: "Blue Slim Fit Jeans",
    description: "Slim fit blue denim jeans, comfortable and stylish.",
    price: 1099,
    category: "Men",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/12542760/2020/11/12/7dbe1e8f-bc3f-45fb-9dab-e9226e357f631605160347038-Mast--Harbour-Men-Jeans-7301605160345219-1.jpg",
    countInStock: 50
  },
  {
    name: "Red T-Shirt",
    description: "Classic red t-shirt made from 100% cotton.",
    price: 399,
    category: "Men",
    image: "https://assets.myntassets.com/w_200,q_30,dpr_3,fl_progressive,f_webp/assets/images/32257292/2025/6/2/f814edbd-761a-4cf0-b6e3-a85f634c3bd31748854434516-WROGN-Men-Typography-Printed-Round-Neck-Cotton-Relaxed-Fit-T-6.jpg",
    countInStock: 80
  },
  {
    name: "Black Hoodie",
    description: "Warm black hoodie with soft fleece lining.",
    price: 1299,
    category: "Men",
    image: "https://rukminim2.flixcart.com/image/368/490/xif0q/sweatshirt/n/a/h/m-hoodi-greenflair-original-imah4hn5qyvsphyp.jpeg?q=90&crop=false",
    countInStock: 40
  },
  {
    name: "White Casual Shirt",
    description: "Crisp white casual shirt for everyday wear.",
    price: 899,
    category: "Men",
    image: "https://pictures.kartmax.in/live/inside/800x800/sites/aPfvUDpPwMn1ZadNKhP7/product-images/HLSH024120_1.jpg",
    countInStock: 60
  },
  {
    name: "Floral Summer Dress",
    description: "Lightweight floral dress perfect for summer days.",
    price: 1499,
    category: "Women",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJnyHkB4l9yZSvydTAJuLhSc1-7Jd1hYJSgA&s",
    countInStock: 30
  },
  {
    name: "Women's Denim Jacket",
    description: "Classic denim jacket with button closure.",
    price: 1999,
    category: "Women",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/AUGUST/30/Kc35MlIa_cc8d026c882140f8aa6735f8038826c5.jpg",
    countInStock: 25
  },
  {
    name: "Black Leather Boots",
    description: "Durable black leather boots for everyday use.",
    price: 2999,
    category: "Women",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/20334788/2022/10/10/064dab95-c611-4df9-bfca-4c3ea147268a1665375906108Boots1.jpg",
    countInStock: 20
  },
  {
    name: "Sneakers - White",
    description: "Comfortable white sneakers for casual wear.",
    price: 1799,
    category: "Unisex",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/OCTOBER/23/YgxPTcH4_4b1013ebf42b450b87f0faa531f43490.jpg",
    countInStock: 70
  },
  {
    name: "Classic Watch",
    description: "Minimal analog watch with leather strap.",
    price: 2499,
    category: "Accessories",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/NOVEMBER/17/incVADNk_9895d5c0607c4059937d462298b0d099.jpg",
    countInStock: 15
  },
  {
    name: "Black Formal Shoes",
    description: "Elegant black formal shoes for office and events.",
    price: 2599,
    category: "Men",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2024/SEPTEMBER/3/paioXPum_7bbbdd2c194546c48db078ae975e880f.jpg",
    countInStock: 35
  },
  {
    name: "Sporty Track Pants",
    description: "Comfortable track pants with elastic waistband.",
    price: 799,
    category: "Men",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/33801826/2025/5/5/a67c532b-b4e6-46db-a5d2-5b31b86eb98e1746446462233-HRX-by-Hrithik-Roshan-Men-Track-Pants-861746446461441-1.jpg",
    countInStock: 45
  },
  {
    name: "Summer Sandals",
    description: "Light and breathable sandals for summer.",
    price: 699,
    category: "Women",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/26215172/2024/11/21/90c3ecec-7964-48b1-86ce-f56677c2713b1732181099839-Carlton-London-sports-Women-Textured-Sports-Sandals-42517321-1.jpg",
    countInStock: 60
  },
  {
    name: "Formal Blazer",
    description: "Tailored blazer ideal for meetings and events.",
    price: 3499,
    category: "Men",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/12554498/2022/4/28/a3e42528-019c-4bf9-a5bc-30cb76c747211651116245680-MANQ-Men-Blue-Slim-Fit-Solid-Single-Breasted-Formal-Blazer-6-1.jpg",
    countInStock: 10
  },
  {
    name: "Elegant Handbag",
    description: "Chic handbag with roomy interior and pockets.",
    price: 2199,
    category: "Women",
    image: "https://images-static.nykaa.com/media/catalog/product/d/a/da82310bmwha0125bk_1.jpg",
    countInStock: 18
  },
  {
    name: "Casual Polo Shirt",
    description: "Comfortable polo shirt in breathable fabric.",
    price: 699,
    category: "Men",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/30425647/2024/9/19/ac864bd4-227c-4690-bf52-94553488f62b1726721898772-US-Polo-Assn-Tailored-Fit-Textured-Self-Design-Pure-Cotton-C-1.jpg",
    countInStock: 55
  },
  {
    name: "Pleated Skirt",
    description: "Stylish pleated skirt for a modern look.",
    price: 999,
    category: "Women",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/SEPTEMBER/9/y40WC9h6_e2b2eed52b3c482f918a2f85a0382fdf.jpg",
    countInStock: 22
  },
  {
    name: "Yoga Leggings",
    description: "Stretchy leggings perfect for workouts and yoga.",
    price: 899,
    category: "Women",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/20528910/2024/3/22/0b97a336-9d44-47da-bec4-082d2ae1705f1711086717693-cultsportone-Women-All-Day-Performance-Tights-44117110867173-1.jpg",
    countInStock: 40
  },
  {
    name: "Kids' Graphic Tee",
    description: "Fun graphic tee for kids with soft cotton fabric.",
    price: 399,
    category: "Kids",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/SEPTEMBER/24/mgoJFMNc_6839b85fcce94807896ca374c618f19e.jpg",
    countInStock: 70
  },
  {
    name: "Kids Shorts",
    description: "Comfortable shorts for active kids.",
    price: 349,
    category: "Kids",
    image: "https://kidsonthemoon.com/wp-content/uploads/2022/03/kotm_ss22_-red-heart-shorts-600x800.jpg",
    countInStock: 80
  },
  {
    name: "Beanie Cap",
    description: "Warm beanie for cold weather.",
    price: 299,
    category: "Accessories",
    image: "https://www.poftik.com/cdn/shop/products/He6f252045d7d42cdb2d51ee8e1a9410bM.jpg?v=1657263623&width=600",
    countInStock: 90
  },
  {
    name: "Athletic Socks (Pack of 3)",
    description: "Durable socks with cushioned sole.",
    price: 249,
    category: "Unisex",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2024/AUGUST/26/pWGyhJV2_4035fa20f53e46539b8a5cd87d72dbe6.jpg",
    countInStock: 120
  },
  {
    name: "Summer Hat",
    description: "Stylish hat to protect from the sun.",
    price: 399,
    category: "Accessories",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/JUNE/20/Jlyl8LiC_3c60bd24283340349c7fa8fb1a88617f.jpg",
    countInStock: 60
  },
  {
    name: "Denim Shorts",
    description: "Casual denim shorts with a trendy cut.",
    price: 799,
    category: "Women",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/AUGUST/14/tjK5A4tv_9f356610026b4fb48a1ec518745a5403.jpg",
    countInStock: 35
  },
  {
    name: "Leather Belt",
    description: "Classic leather belt in brown.",
    price: 499,
    category: "Accessories",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/25304546/2023/10/2/615b42c4-f2c6-426e-9a23-9e5c8db131681696229503895Belts1.jpg",
    countInStock: 80
  },
  {
    name: "Formal Trousers",
    description: "Smart trousers for office and formal occasions.",
    price: 1699,
    category: "Men",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/24759222/2024/1/19/57438518-a610-4c40-82d1-1c154b6275761705649314914-encore-by-INVICTUS-Men-Trousers-6851705649314426-1.jpg",
    countInStock: 25
  },
  {
    name: "Printed Scarf",
    description: "Lightweight scarf with attractive prints.",
    price: 299,
    category: "Women",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2024/DECEMBER/9/JV7ypauP_9a35cb8b54ee4a52a11b985d10af967c.jpg",
    countInStock: 70
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with cushioned sole.",
    price: 2599,
    category: "Unisex",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/21821030/2023/3/27/ba9df912-a7be-47d9-81e8-dc5b4abaf9d61679897624231-Reebok-Unisex-Sports-Shoes-7231679897623908-1.jpg",
    countInStock: 40
  },
  {
    name: "Black Leggings",
    description: "Versatile black leggings for daily wear.",
    price: 699,
    category: "Women",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/32646611/2025/8/6/92ba6378-1489-4e35-bcf4-9e2c3047bec61754475992493-No-1-Logo-Womens-34-Leggings-571754475991933-1.jpg",
    countInStock: 65
  },
  {
    name: "Casual Hoodie - Grey",
    description: "Soft grey hoodie for casual comfort.",
    price: 1199,
    category: "Unisex",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/APRIL/24/PA9TE5J5_2eda106a55394fde848cfc57fb8b7a0d.jpg",
    countInStock: 50
  },
    {
    name: "Sunglasses",
    description: "Style sunglasses frames.",
    price: 499,
    category: "Unisex",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/32322980/2025/7/24/ddab7872-c6b7-4a6d-984c-e0381e17740b1753358124410-Voyage-Rimless-Sunglasses-for-Men--Women-Purple--Clear-Lens--1.jpg",
    countInStock: 100
  },
  {
    name: "Hoodies",
    description: "Warm and trendy hoodies for casual styling.",
    price: 799,
    category: "Men",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBrQQzaRdGaPoOZ_9X-dwY2Xn-rd829hSzxg&s",
    countInStock: 60
  },
  {
    name: "Kurta",
    description: "Traditional kurtas for festive and ethnic wear.",
    price: 1499,
    category: "Men",
    image: "https://i.pinimg.com/736x/7c/71/b4/7c71b4708f85d9aca85aaab7733358dd.jpg",
    countInStock: 60
  },
  {
    name: "Sherwani",
    description: "Premium sherwanis for weddings and celebrations.",
    price: 1099,
    category: "Men",
    image: "https://pictures.kartmax.in/cover/live/600x800/quality=6/sites/9s145MyZrWdIAwpU0JYS/product-images/light_grey_peshwai_style_raw_silk_sherwani_for_groom_173295350813325_01.jpg",
    countInStock: 100
  },
  {
    name: "Waistcoats",
    description: "Stylish waistcoats to enhance ethnic and formal outfits.",
    price: 799,
    category: "Men",
    image: "https://pictures.kartmax.in/live/inside/800x800/sites/9s145MyZrWdIAwpU0JYS/product-images/choco_brown_jute_fabricated_waistcoat_for_men_1745657243wt1663_24_1.jpg",
    countInStock: 50
  },
  {
    name: "Co-ord Sets",
    description: "Matching outfit sets for a modern and coordinated style.",
    price: 1299,
    category: "Men",
    image: "https://rgscashmere.com/wp-content/uploads/IMG_2294-600x800.jpg.webp",
    countInStock: 30
  },
  {
    name: "Shorts",
    description: "Comfortable shorts perfect for casual and summer outfits.",
    price: 299,
    category: "Men",
    image: "https://www.technosport.in/cdn/shop/files/OR46_20Lunargrey_1_0ca5fde8-7963-41e3-bf88-b3e60520c583.webp?v=1738846579",
    countInStock: 180
  },
  {
    name: "Tops",
    description: "Stylish tops designed for casual and everyday fashion.",
    price: 499,
    category: "Women",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/FEBRUARY/20/1icPFn5V_1c71a185856944aa9e4819294ab3ba73.jpg",
    countInStock: 90
  },
  {
    name: "Sarees",
    description: "Traditional sarees crafted with elegant fabrics and designs.",
    price: 1999,
    category: "Women",
    image: "https://i.pinimg.com/736x/76/bc/70/76bc7052b569c3f71962afa754032514.jpg",
    countInStock: 190
  },
  {
    name: "Shrugs",
    description: "Lightweight shrugs perfect for layering outfits.",
    price: 199,
    category: "Women",
    image: "https://assets.myntassets.com/w_200,q_30,dpr_3,fl_progressive,f_webp/assets/images/2025/NOVEMBER/21/yvyySfll_aee81dd0326f430a9ec5680a36a11c29.jpg",
    countInStock: 290
  },
  {
    name: "Lehengas",
    description: "Beautiful lehengas perfect for weddings and festivities.",
    price: 1099,
    category: "Women",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2024/AUGUST/31/pWYHzZAP_febaae2615154801b3471aece7a18871.jpg",
    countInStock: 90
  },
  {
    name: "Gowns",
    description: "Graceful gowns designed for special occasions and events.",
    price: 699,
    category: "Women",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/MARCH/17/JVFOAEoh_1a466273bfc941baa4bfabd21b89a764.jpg",
    countInStock: 140
  },
  {
    name: "Wallet",
    description: "Sleek wallets designed for everyday convenience.",
    price: 299,
    category: "Accessories",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/25815668/2023/11/9/351fabff-55e1-43f7-a332-24c9a0bdfcbb1699534357001PUMALeatherCruiseWalletV21.jpg",
    countInStock: 90
  },
  {
    name: "Backpacks",
    description: "Spacious backpacks ideal for travel and daily use.",
    price: 699,
    category: "Accessories",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/23518976/2023/6/3/761e36ba-f1dc-4055-a869-21bbd7910a751685798939419WROGNUnisexBlackYellowBrandLogoBackpackwithShoePocket1.jpg",
    countInStock: 50
  },
  {
    name: "Ties",
    description: "Classic ties suitable for formal and business attire.",
    price: 399,
    category: "Accessories",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/14790646/2023/9/11/18b8d352-d57c-4748-9aa2-8ef5aa595b721694436826867LOUISSTITCHMenDenimBlueItalianSilkNecktieAccessoryGiftSet1.jpg",
    countInStock: 170
  },
  {
    name: "Necklaces",
    description: "Trendy hair accessories for styling and convenience.",
    price: 2999,
    category: "Accessories",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/23266478/2024/1/2/c876cd57-bd31-49e2-9998-2ba5b2cea5731704184248346-Peora-Gold-Plated-Kundan-Necklace-Jewellery-Set-984170418424-13.jpg",
    countInStock: 60
  },
  {
    name: "Gloves",
    description: "Comfortable gloves designed for warmth and protection.",
    price: 499,
    category: "Accessories",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/NOVEMBER/16/ytSDnluD_390d8a251d814ff69a04e88344d1da30.jpg",
    countInStock: 120
  },
  {
    name: "Bracelets",
    description: "Fashionable bracelets for men and women.",
    price: 299,
    category: "Accessories",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/27248666/2024/1/30/f6ac37cb-4376-4df9-89d3-18847c6d269e1706621547563WROGNMenWraparoundBracelet1.jpg",
    countInStock: 200
  },
  {
    name: "SunGlasses",
    description: "Classic sunglasses for style",
    price: 499,
    category: "Accessories",
    image: "https://i.pinimg.com/736x/c8/5a/16/c85a16197f14bf1399776eb10dc4142c.jpg",
    countInStock: 70
  },
  {
    name: "Stylish Suit",
    description: "Classic Suit for style",
    price: 2999,
    category: "Men",
    image: "https://w0.peakpx.com/wallpaper/643/246/HD-wallpaper-virat-kohli-wali-blazer-look-virat-kohli-blazer-look-king-kohli-cricketer-thumbnail.jpg",
    countInStock: 30
  },
  {
    name: "Denim Jeans Shirt",
    description: "Classic Denim Jeans shirt",
    price: 999,
    category: "Men",
    image: "https://i.redd.it/some-of-the-biggest-fashion-moments-in-telugu-cinema-some-v0-u4ljybdgs7hc1.png?width=489&format=png&auto=webp&s=7eb43352276cdf0c33d0f17d8845f52d6f36c6de",
    countInStock: 70
  },
  {
    name: "Sneakers",
    description: "Stylish shoes for mens",
    price: 799,
    category: "Men",
    image: "https://www.campusshoes.com/cdn/shop/files/KNICK_22G-1217_D.GRY_0_0.jpg?v=1759994562",
    countInStock: 120
  },
  {
    name: "Raincoat",
    description: "Rainjackets for men",
    price: 1099,
    category: "Men",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/32224641/2025/1/7/bd7692f3-298c-415c-93e9-ebe0bda6bb331736226332788ColumbiaGlennakerLakeIILongSleeveHoodedRainJacket1.jpg",
    countInStock: 50
  },
  {
    name: "Smart Watch",
    description: "Smartwatches for men",
    price: 999,
    category: "Men",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/29576790/2024/5/29/53c01d40-d4d3-48a4-a6c9-494ff4589f511716962620631-Noise-ColorFit-Icon-4-Smartwatch---Jet-Black-803171696261998-1.jpg",
    countInStock: 70
  },
  {
    name: "Printed Shirt",
    description: "Fresh and Stylish printed shirts for men",
    price: 299,
    category: "Men",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/28055962/2024/3/5/c8c5df9a-7dd3-46c8-b5c3-0fcd0fa284561709659862478HERENOWMenSlimFitOpaquePrintedCasualShirt1.jpg",
    countInStock: 100
  },
  {
    name: "Dress",
    description: "Dresses for girls",
    price: 999,
    category: "Kids",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/FEBRUARY/5/9WDDVVl6_87abd68693884a12b3836d3fcf3dac15.jpg",
    countInStock: 50
  },
  {
    name: "Kids Wear",
    description: "Kids stylish dress",
    price: 499,
    category: "Kids",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/OCTOBER/27/e1wftEWo_267709597eaa42f3a566cfcaa02dc6ba.jpg",
    countInStock: 150
  },
  {
    name: "Baggy Pant",
    description: "Stylish Baggy jeans for men",
    price: 999,
    category: "Men",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/28749636/2025/4/19/49f549c4-84de-4dfd-a1cd-b04613c71b151745001139077-The-Roadster-Lifestyle-Co-Men-Beige-Pure-Cotton-Rigid-Baggy--1.jpg",
    countInStock: 180
  },
  {
    name: "Ripped Jeans",
    description: "Stylish torn jeans for men",
    price: 1099,
    category: "Men",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/12729788/2025/3/15/614c2ebf-caa8-4467-ac0f-c987935145fe1742035781906-Urbano-Fashion-Men-Blue-Slim-Fit-Mid-Rise-Highly-Distressed--1.jpg",
    countInStock: 160
  },
  {
    name: "Cotton Shirt",
    description: "Check shirt for men",
    price: 599,
    category: "Men",
    image: "https://i.pinimg.com/736x/ab/44/73/ab44736245c77fe9bd1e88ed3c659f6a.jpg",
    countInStock: 130
  },
  {
    name: "Girls top",
    description: "Love fashion top for girls",
    price:499,
    category: "women",
    image: "https://i.pinimg.com/736x/98/bb/f7/98bbf7dbcdcdd500206654d3be89b05a.jpg",
    countInStock: 130
  },


];

async function seed() {
  try {
    // 🔥 CONNECT FIRST
    await mongoose.connect(MONGO_URI);
    console.log("🔥 MongoDB Connected for Seeding");

    // 🧹 DELETE OLD PRODUCTS
    await Product.deleteMany({});
    console.log("🧹 Existing products removed.");

    // ✅ INSERT NEW PRODUCTS
    const created = await Product.insertMany(products);
    console.log(`✅ Inserted ${created.length} products.`);

    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

// 🚀 RUN
seed();

