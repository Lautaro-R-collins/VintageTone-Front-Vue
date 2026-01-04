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
        badge: 'Vintage',
        stock: 2,
        description: 'Una pieza de coleccionista absoluta. Esta Stratocaster de 1964 conserva el tono acampanado original con un cuerpo de aliso seleccionado y un mástil de arce con perfil en C. El acabado relic captura décadas de historia musical en cada detalle.',
        specs: [
            { label: 'Cuerpo', value: 'Aliso seleccionado' },
            { label: 'Mástil', value: 'Arce con perfil C' },
            { label: 'Diapasón', value: 'Palisandro de India' },
            { label: 'Pickups', value: 'Custom Shop Single-Coil' }
        ]
    },
    {
        id: 2,
        name: 'Gibson ES-335 Vintage Cherry',
        category: 'Instrumentos',
        price: '5,200',
        image: guitarGibson,
        badge: 'Limited',
        stock: 1,
        description: 'El estándar de oro para las guitarras semi-huecas. Este modelo en Vintage Cherry ofrece una resonancia inigualable y la versatilidad necesaria para pasar del jazz más dulce al rock más crudo. Incluye estuche rígido original.',
        specs: [
            { label: 'Tipo', value: 'Semi-Hollow Body' },
            { label: 'Acabado', value: 'Nitrocellulose Lacquer' },
            { label: 'Pickups', value: 'Calibrated T-Type Humbuckers' },
            { label: 'Puente', value: 'ABR-1 Tune-O-Matic' }
        ]
    },
    {
        id: 3,
        name: 'Fender Deluxe Reverb 1965',
        category: 'Amplificadores',
        price: '3,800',
        image: ampTube,
        badge: 'Collector',
        stock: 3,
        description: 'El sonido que definió el surf y el country. Este amplificador de 22 vatios ofrece el "clean" más puro que jamás hayas escuchado, con una reverberación de muelles y un vibrato espectaculares.',
        specs: [
            { label: 'Potencia', value: '22 vatios' },
            { label: 'Válvulas', value: '2 x 6V6, 4 x 12AX7, 2 x 12AT7' },
            { label: 'Altavoz', value: '12" Jensen C12K' },
            { label: 'Canales', value: 'Normal y Vibrato' }
        ]
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
    },
    {
        id: 10,
        name: 'Vintage Guitarra Acustica',
        category: 'Instrumentos',
        price: '2,100',
        image: guitarGibson,
        badge: 'Acoustic'
    },
    {
        id: 11,
        name: 'Vintage Guitarra Acustica',
        category: 'Instrumentos',
        price: '2,100',
        image: guitarGibson,
        badge: 'Acoustic'
    },
    {
        id: 12,
        name: 'Vintage Guitarra Acustica',
        category: 'Instrumentos',
        price: '2,100',
        image: guitarGibson,
        badge: 'Acoustic'
    }


]
