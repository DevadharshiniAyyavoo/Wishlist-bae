import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'MacBook Pro 16" M3 Max',
    category: 'LAPTOPS',
    rating: 4.9,
    price: 3499,
    originalPrice: 3999,
    image: 'https://picsum.photos/id/0/800/600',
    additionalImages: [
      'https://picsum.photos/id/1/800/600', 
      'https://picsum.photos/id/2/800/600', 
      'https://picsum.photos/id/3/800/600'
    ],
    specs: '48GB RAM, 1TB SSD, Space Black',
    inStock: true,
    isDeal: true,
    shoppingMethod: 'online',
    onlineUrl: 'https://www.apple.com/macbook-pro/',
    description: 'The most powerful MacBook Pro ever is here. With the blazing-fast M3 Max chip, get meaningful work done faster than ever. Includes a stunning Liquid Retina XDR display and all the ports you need.'
  },
  {
    id: '2',
    title: 'Sony WH-1000XM5',
    category: 'AUDIO',
    rating: 4.7,
    price: 348,
    originalPrice: 399,
    image: 'https://picsum.photos/id/4/800/600',
    additionalImages: [
      'https://picsum.photos/id/5/800/600', 
      'https://picsum.photos/id/6/800/600', 
      'https://picsum.photos/id/7/800/600'
    ],
    specs: 'Noise Cancelling, 30hr Battery',
    inStock: true,
    isDeal: true,
    shoppingMethod: 'instore',
    storeLocations: ['Downtown Tech Center, 5th Ave', 'Westside Electronics, Mall Road', 'Audio World, Tech Park'],
    description: 'Industry-leading noise cancellation optimized for you. Magnificent Sound, engineered to perfection. Crystal clear hands-free calling.'
  },
  {
    id: '3',
    title: 'Fujifilm X100VI',
    category: 'CAMERAS',
    rating: 4.8,
    price: 1599,
    image: 'https://picsum.photos/id/250/800/600',
    additionalImages: [
      'https://picsum.photos/id/251/800/600', 
      'https://picsum.photos/id/252/800/600', 
      'https://picsum.photos/id/253/800/600'
    ],
    specs: '40MP APS-C, IBIS, 6.2K Video',
    inStock: false,
    isDeal: false,
    shoppingMethod: 'instore',
    storeLocations: ['Camera House, 42 Shutter St', 'Visual Arts Supply, Downtown'],
    description: 'The sixth generation of the X100 Series, the X100VI features a new 40.2 megapixel sensor and X-Processor 5 for brilliant image quality and speed.'
  },
  {
    id: '4',
    title: 'DJI Mavic 3 Pro',
    category: 'DRONES',
    rating: 4.9,
    price: 2199,
    image: 'https://picsum.photos/id/96/800/600',
    additionalImages: [
      'https://picsum.photos/id/98/800/600', 
      'https://picsum.photos/id/99/800/600', 
      'https://picsum.photos/id/100/800/600'
    ],
    specs: 'Triple-Camera, 4/3 CMOS Hasselblad',
    inStock: true,
    isDeal: false,
    shoppingMethod: 'online',
    onlineUrl: 'https://www.dji.com/mavic-3-pro',
    description: 'Equipped with a Hasselblad camera and dual tele cameras, Mavic 3 Pro unlocks new shooting perspectives, allowing you to embrace creative freedom.'
  },
  {
    id: '5',
    title: 'iPad Pro 13" M4',
    category: 'TABLETS',
    rating: 4.5,
    price: 1299,
    originalPrice: 1399,
    image: 'https://picsum.photos/id/119/800/600',
    additionalImages: [
      'https://picsum.photos/id/120/800/600', 
      'https://picsum.photos/id/121/800/600', 
      'https://picsum.photos/id/122/800/600'
    ],
    specs: 'Ultra Retina XDR, Standard Glass',
    inStock: true,
    isDeal: true,
    shoppingMethod: 'online',
    onlineUrl: 'https://www.apple.com/ipad-pro/',
    description: 'The thinnest Apple product ever. Features the breakthrough M4 chip, outrageous performance, and the Ultra Retina XDR display.'
  },
  {
    id: '6',
    title: 'Samsung Odyssey OLED G9',
    category: 'MONITORS',
    rating: 4.6,
    price: 1799,
    image: 'https://picsum.photos/id/180/800/600',
    additionalImages: [
      'https://picsum.photos/id/181/800/600', 
      'https://picsum.photos/id/182/800/600', 
      'https://picsum.photos/id/183/800/600'
    ],
    specs: '49" Curved, 240Hz, 0.03ms',
    inStock: true,
    isDeal: false,
    shoppingMethod: 'instore',
    storeLocations: ['Samsung Experience Store, City Center', 'Best Electronics, Highway 9', 'Gaming Hub, North District'],
    description: 'The world\'s first 49 inch OLED monitor. Determine your victory with a massive screen and incredibly fast reaction times.'
  },
  {
    id: '7',
    title: 'Keychron Q1 HE',
    category: 'ACCESSORIES',
    rating: 4.7,
    price: 219,
    image: 'https://picsum.photos/id/366/800/600',
    additionalImages: [
      'https://picsum.photos/id/367/800/600', 
      'https://picsum.photos/id/368/800/600', 
      'https://picsum.photos/id/369/800/600'
    ],
    specs: 'Wireless, Hall Effect Magnetic Switches',
    inStock: true,
    isDeal: false,
    shoppingMethod: 'online',
    onlineUrl: 'https://www.keychron.com',
    description: 'The Q1 HE is a full metal QMK/VIA wireless custom mechanical keyboard with 2.4G wireless connection and Hall Effect magnetic switches.'
  },
  {
    id: '8',
    title: 'PlayStation 5 Pro',
    category: 'GAMING',
    rating: 4.5,
    price: 699,
    image: 'https://picsum.photos/id/550/800/600',
    additionalImages: [
      'https://picsum.photos/id/551/800/600', 
      'https://picsum.photos/id/552/800/600', 
      'https://picsum.photos/id/553/800/600'
    ],
    specs: '2TB SSD, Disc Drive Not Included',
    inStock: false,
    isDeal: false,
    shoppingMethod: 'instore',
    storeLocations: ['Sony Center, Plaza Mall', 'GameStop, 3rd Street', 'Electronics Giant, West Wing'],
    description: 'Witness play unleashed. The PS5 Pro console offers the world’s greatest creators the ability to enhance their games with incredible features.'
  }
];
