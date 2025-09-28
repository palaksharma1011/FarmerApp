const products = [
  {
    id: 1,
    name: 'Organic Dragon Fruit (Balangir, Odisha)',
    href: '#',
    price: '₹150/kg',
    imageSrc: 'https://etvbharatimages.akamaized.net/etvbharat/prod-images/15-09-2024/1200-675-22458919-thumbnail-16x9-dr.jpg',
    imageAlt: 'Fresh organic dragon fruit halves',
  },
  {
    id: 2,
    name: 'Kandhamal Haldi (Turmeric, Odisha)',
    href: '#',
    price: '₹89/100g',
    imageSrc: 'https://ritikart.com/cdn/shop/products/haldi.jpg?v=1585829899',
    imageAlt: 'Organic turmeric roots and powder',
  },
  {
    id: 3,
    name: 'Palm Jaggery (Odisha)',
    href: '#',
    price: '₹79/250g',
    imageSrc: 'https://rythubazaaru.com/wp-content/uploads/2020/06/palm-jaggery.jpg',
    imageAlt: 'Palm jaggery blocks from Odisha',
  },
  {
    id: 4,
    name: 'Forest Honey (Jajpur, Odisha)',
    href: '#',
    price: '₹250/500g',
    imageSrc: 'https://cdn.shopify.com/s/files/1/0636/6920/7236/files/Pure_forest_honey_A_natural_health_booster_480x480.webp?v=1731403412',
    imageAlt: 'Jar of organic forest honey',
  },
  {
    id: 5,
    name: 'Organic Apple (Himalayan)',
    href: '#',
    price: '₹180/kg',
    imageSrc: 'https://freshindiaorganics.com/cdn/shop/products/Apples.jpg?v=1686739530',
    imageAlt: 'Fresh organic Himalayan apples',
  },
  {
    id: 6,
    name: 'Organic Elaichi Banana',
    href: '#',
    price: '₹66/500g',
    imageSrc: 'https://www.kediaorganic.com/cdn/shop/products/DSC03353.jpg?v=1697091897',
    imageAlt: 'Bunch of organic elaichi bananas',
  },
  {
    id: 7,
    name: 'Organic Papaya',
    href: '#',
    price: '₹90/each',
    imageSrc: 'https://m.media-amazon.com/images/I/51nMzzVWkjL._UF1000,1000_QL80_.jpg',
    imageAlt: 'Ripe organic papaya fruit',
  },
  {
    id: 8,
    name: 'Organic Pomegranate',
    href: '#',
    price: '₹140/kg',
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCf8x5oXPHVGdxsutuvyixAr7m_eM634NmeA&s',
    imageAlt: 'Organic pomegranate with seeds',
  },
  {
    id: 9,
    name: 'Organic Wheat Dalia (Broken Wheat)',
    href: '#',
    price: '₹75/500g',
    imageSrc: 'https://images.meesho.com/images/products/199740052/njjod_512.webp?width=512',
    imageAlt: 'Organic broken wheat in bowl',
  },
  {
    id: 10,
    name: 'Organic Brown Chana (Whole)',
    href: '#',
    price: '₹120/kg',
    imageSrc: 'https://5.imimg.com/data5/SELLER/Default/2024/8/440054949/SB/AH/QM/224464632/chana-500x500.jpeg',
    imageAlt: 'Organic brown chana (chickpeas)',
  },
  {
    id: 11,
    name: 'Organic White Basmati Rice',
    href: '#',
    price: '₹224/kg',
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM5QeZDjgHEM4B3e52LHrkOer3Q2D5SYayBA&s',
    imageAlt: 'Organic white basmati rice grains',
  },
  {
    id: 12,
    name: 'Organic Rajgira / Amaranth Seed',
    href: '#',
    price: '₹157/250g',
    imageSrc: 'https://nuttyyogi.com/cdn/shop/products/Rajgeera_Seeds.jpg?v=1690787363',
    imageAlt: 'Organic amaranth seeds',
  },
]



export default function Products() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
