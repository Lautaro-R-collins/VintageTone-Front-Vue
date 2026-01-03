import guitarFender from '../assets/products/guitar_fender.png'
import guitarGibson from '../assets/products/guitar_gibson.png'
import ampTube from '../assets/products/amp_tube.png'
// Placeholder for missing images due to quota
import headerImg from '../assets/home/HeaderImg.webp'

export const mockProducts = [
    {
        id: 1,
        name: 'Fender Stratocaster 1964 Relic',
        category: 'Instrumentos',
        price: '4,500',
        image: guitarFender,
        badge: 'Vintage'
    },
    {
        id: 2,
        name: 'Gibson ES-335 Vintage Cherry',
        category: 'Instrumentos',
        price: '5,200',
        image: guitarGibson,
        badge: 'Limited'
    },
    {
        id: 3,
        name: 'Fender Deluxe Reverb 1965',
        category: 'Amplificadores',
        price: '3,800',
        image: ampTube,
        badge: 'Collector'
    },
    {
        id: 4,
        name: 'Precision Bass Olympic White',
        category: 'Instrumentos',
        price: '3,200',
        image: guitarFender, // Reusing for demo
        badge: 'Relic'
    },
    {
        id: 5,
        name: 'Boutique Fuzz Pedal Worn',
        category: 'Pedales',
        price: '450',
        image: ampTube, // Reusing for demo
        badge: 'Boutique'
    },
    {
        id: 6,
        name: 'Acoustic Dreadnought Aged',
        category: 'Instrumentos',
        price: '2,900',
        image: headerImg,
        badge: 'Aged'
    },
    {
        id: 7,
        name: 'Vintage Analog Synth',
        category: 'Instrumentos',
        price: '6,500',
        image: headerImg,
        badge: 'Rare'
    },
    {
        id: 8,
        name: 'Classical Guitar 1970',
        category: 'Instrumentos',
        price: '1,800',
        image: guitarFender,
        badge: 'Classic'
    },
    {
        id: 9,
        name: 'Vintage Cello Box',
        category: 'Instrumentos',
        price: '2,100',
        image: guitarGibson,
        badge: 'Acoustic'
    }
]
