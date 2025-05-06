// seedProducts.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // Adjust path if needed

dotenv.config();

const products = [
  {
    name: "Toyota Corolla Brake Pads",
    category: "Brakes",
    price: 8500,
    condition: "New",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745731287/Screenshot_2025-04-27_091444_ur0rph.png",
    vendorId: "680ded66b235c97c60c9ddc1",
    tags: ["toyota", "corolla", "brake pads", "braking system", "car parts"]
  },
  {
    name: "Honda Civic Air Filter",
    category: "Engine",
    price: 3500,
    condition: "New",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745759611/Screenshot_2025-04-27_183822_ngdpp7.png",
    images: [
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745759611/Screenshot_2025-04-27_183822_ngdpp7.png",
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745759584/Screenshot_2025-04-27_183841_cy9scy.png",
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745759584/Screenshot_2025-04-27_184228_o4mowa.png"
    ],
    vendorId: "680deabbb235c97c60c9ddbc",
    tags: ["honda", "civic", "air filter", "engine parts", "car parts"]
  },
  {
    name: "Nissan Leaf Battery Pack",
    category: "Electrical",
    price: 320000,
    condition: "Used",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745760195/images123456_wbrpp7.jpg",
    vendorId: "680deabbb235c97c60c9ddbc",
    tags: ["nissan", "leaf", "battery pack", "electric car", "ev parts"]
  },
  {
    name: "Suzuki Swift Headlight",
    category: "Lights",
    price: 18000,
    condition: "New",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745760550/Screenshot_2025-04-27_185458_u9akya.png",
    images: [
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745760550/Screenshot_2025-04-27_185657_efcxho.png"
    ],
    vendorId: "680deabbb235c97c60c9ddbc",
    tags: ["suzuki", "swift", "headlight", "lighting", "car parts"]
  },
  {
    name: "Mitsubishi Lancer Radiator",
    category: "Cooling System",
    price: 22000,
    condition: "New",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745760793/W1-7771154-0_gtq5gy.jpg",
    images: [
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745760793/W1-7771154-0_gtq5gy.jpg",
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745760791/s-l225_wydy8v.jpg",
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745760791/images_9_fnr134.jpg"
    ],
    vendorId: "680deabbb235c97c60c9ddbc",
    tags: ["mitsubishi", "lancer", "radiator", "cooling system", "car parts"]
  },
  {
    name: "BMW 3 Series Side Mirror",
    category: "Body Parts",
    price: 42000,
    condition: "New",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745761142/41aYf9YwQfL._AC_UF894_1000_QL80__sicjyi.jpg",
    images: [
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745761189/Screenshot_2025-04-27_190744_ipyafy.png"
    ],
    vendorId: "680dea2cb235c97c60c9ddbb",
    tags: ["bmw", "3 series", "side mirror", "mirror", "body parts"]
  },
  {
    name: "Ford Ranger Fuel Injector",
    category: "Engine",
    price: 16000,
    condition: "New",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745761384/Screenshot_2025-04-27_191127_vfqk9n.png",
    images: [
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745761385/Screenshot_2025-04-27_191204_aypmor.png",
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745761385/Screenshot_2025-04-27_191229_pctvhb.png"
    ],
    vendorId: "680dee3eb235c97c60c9ddc3",
    tags: ["ford", "ranger", "fuel injector", "engine parts", "car parts"]
  },
  {
    name: "Kia Sportage Brake Disc",
    category: "Brakes",
    price: 14000,
    condition: "New",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745761798/7ea2ab775877db6e70715f9e1042a29653450a61_1595331435_tdcbx3.webp",
    images: [
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745761798/images_10_gyzh36.jpg"
    ],
    vendorId: "680dee3eb235c97c60c9ddc3",
    tags: ["kia", "sportage", "brake disc", "braking system", "car parts"]
  },
  {
    name: "Hyundai Elantra Spark Plug Set",
    category: "Engine",
    price: 7000,
    condition: "New",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745772752/61eus2DsllL._AC_UF894_1000_QL80__oro0ff.jpg",
    images: [
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745772752/61rCel8hUxL_tvff62.jpg",
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745772752/6a4733557b7a49518499eade02b2bb73_shzhqz.png"
    ],
    vendorId: "680dee3eb235c97c60c9ddc3",
    tags: ["hyundai", "elantra", "spark plug", "engine ignition", "car parts"]
  },
  {
    name: "Forester Oil Pump",
    category: "Engine",
    price: 25000,
    condition: "Used",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745773095/762d07170e47d82292d55a0a2a5f3939_bse9ss.png",
    images: [
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745773089/images_12_jynfsg.jpg"
    ],
    vendorId: "680decf0b235c97c60c9ddc0",
    tags: ["subaru", "forester", "oil pump", "engine parts", "used parts"]
  },
  {
    name: "Elantra Spark Plug Set",
    category: "Engine",
    price: 6500,
    condition: "New",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745772751/images_11_h9gqrr.jpg",
    vendorId: "680dede0b235c97c60c9ddc2",
    tags: ["hyundai", "elantra", "spark plug", "engine ignition", "car parts"]
  },
  {
    name: "Mercedes Benz Brake Disc",
    category: "Brakes",
    price: 14000,
    condition: "New",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745761799/750x750_5958_7ba2940cc350751be774e10056da66c7_ADU1743391_hhm2rb.jpg",
    vendorId: "680ded66b235c97c60c9ddc1",
    tags: ["mercedes benz", "brake disc", "braking system", "car parts"]
  },
  {
    name: "Alternator",
    category: "Electrical",
    price: 48000,
    condition: "Used",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745773403/71ZO19N5CmL._AC_UL210_SR210_210__zutbgb.jpg",
    images: [
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745773400/images_13_a7hnba.jpg",
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745773402/61oRZtUz2EL_bnimso.jpg"
    ],
    vendorId: "680ded66b235c97c60c9ddc1",
    tags: ["mercedes-benz", "c-class", "alternator", "electrical", "car parts"]
  },
  {
    name: "Renault Kwid Radiator Fan",
    category: "Cooling System",
    price: 13500,
    condition: "New",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745773586/images_15_yh7ije.jpg",
    images: [
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745773587/images_14_puykok.jpg"
    ],
    vendorId: "680decf0b235c97c60c9ddc0",
    tags: ["renault", "kwid", "radiator fan", "cooling system", "car parts"]
  },
  {
    name: "Hyundai i20 Clutch Kit",
    category: "Transmission System",
    price: 16500,
    condition: "New",
    image: "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745784778/images_17_a3yxgf.jpg",
    images: [
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745784778/images_18_yqzz9q.jpg",
      "https://res.cloudinary.com/diaxnjzsr/image/upload/v1745784778/images_19_rhu39c.jpg"
    ],
    vendorId: "680decf0b235c97c60c9ddc0",
    tags: ["hyundai", "i20", "clutch kit", "transmission", "car parts"]
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedProducts();
