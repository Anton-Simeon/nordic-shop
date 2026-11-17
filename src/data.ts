export type Category = 'lighting' | 'furniture' | 'textiles' | 'kitchen';

export interface Product {
  id: string;
  name: { en: string; de: string };
  description: { en: string; de: string };
  category: Category;
  price: number; // EUR, cents
  rating: number; // 0..5
  stock: number;
  colors: string[]; // hex values used for the generated product artwork
  isNew?: boolean;
}

export const products: Product[] = [
  { id: 'p1', category: 'lighting', price: 8900, rating: 4.7, stock: 12, colors: ['#e9c46a', '#264653'], isNew: true,
    name: { en: 'Fjord Pendant Lamp', de: 'Fjord Pendelleuchte' },
    description: { en: 'Hand-spun aluminium shade with a warm, glare-free light.', de: 'Handgedrückter Aluminiumschirm mit warmem, blendfreiem Licht.' } },
  { id: 'p2', category: 'lighting', price: 5400, rating: 4.4, stock: 30, colors: ['#f4a261', '#2a9d8f'],
    name: { en: 'Birch Table Lamp', de: 'Birken-Tischleuchte' },
    description: { en: 'Solid birch base and linen shade – dimmable.', de: 'Sockel aus massiver Birke, Leinenschirm – dimmbar.' } },
  { id: 'p3', category: 'furniture', price: 34900, rating: 4.8, stock: 4, colors: ['#8d6e63', '#d7ccc8'],
    name: { en: 'Oslo Lounge Chair', de: 'Oslo Loungesessel' },
    description: { en: 'Oak frame, wool upholstery, built to last decades.', de: 'Eichengestell, Wollbezug, gebaut für Jahrzehnte.' } },
  { id: 'p4', category: 'furniture', price: 21900, rating: 4.5, stock: 9, colors: ['#a1887f', '#3e2723'], isNew: true,
    name: { en: 'Aspen Side Table', de: 'Aspen Beistelltisch' },
    description: { en: 'Round side table with a hidden storage drawer.', de: 'Runder Beistelltisch mit verdeckter Schublade.' } },
  { id: 'p5', category: 'furniture', price: 59900, rating: 4.9, stock: 2, colors: ['#5d737e', '#f0f7ee'],
    name: { en: 'Lumi Three-Seater Sofa', de: 'Lumi Dreisitzer-Sofa' },
    description: { en: 'Deep seats, removable covers, sustainable foam.', de: 'Tiefe Sitze, abnehmbare Bezüge, nachhaltiger Schaum.' } },
  { id: 'p6', category: 'textiles', price: 7900, rating: 4.6, stock: 25, colors: ['#e76f51', '#f4e1d2'],
    name: { en: 'Merino Throw Blanket', de: 'Merino Wohndecke' },
    description: { en: 'Soft merino wool, woven in Portugal.', de: 'Weiche Merinowolle, in Portugal gewebt.' } },
  { id: 'p7', category: 'textiles', price: 3900, rating: 4.2, stock: 40, colors: ['#6d6875', '#e5989b'],
    name: { en: 'Linen Cushion Cover', de: 'Leinen-Kissenbezug' },
    description: { en: 'Stone-washed linen, 50 × 50 cm.', de: 'Stonewashed Leinen, 50 × 50 cm.' } },
  { id: 'p8', category: 'textiles', price: 12900, rating: 4.3, stock: 7, colors: ['#b5838d', '#ffcdb2'], isNew: true,
    name: { en: 'Nordic Wool Rug', de: 'Nordischer Wollteppich' },
    description: { en: 'Hand-tufted rug with a subtle geometric pattern.', de: 'Handgetufteter Teppich mit dezentem Muster.' } },
  { id: 'p9', category: 'kitchen', price: 4500, rating: 4.5, stock: 60, colors: ['#457b9d', '#f1faee'],
    name: { en: 'Stoneware Mug Set', de: 'Steingut-Becherset' },
    description: { en: 'Set of four glazed stoneware mugs.', de: 'Vier glasierte Steingutbecher.' } },
  { id: 'p10', category: 'kitchen', price: 6900, rating: 4.7, stock: 18, colors: ['#1d3557', '#a8dadc'],
    name: { en: 'Oak Serving Board', de: 'Servierbrett aus Eiche' },
    description: { en: 'Oiled oak board with juice groove.', de: 'Geöltes Eichenbrett mit Saftrille.' } },
  { id: 'p11', category: 'kitchen', price: 9900, rating: 4.1, stock: 0, colors: ['#bc6c25', '#fefae0'],
    name: { en: 'Cast Iron Casserole', de: 'Gusseisen-Bräter' },
    description: { en: 'Enamelled cast iron, oven safe up to 250 °C.', de: 'Emailliertes Gusseisen, ofenfest bis 250 °C.' } },
  { id: 'p12', category: 'lighting', price: 15900, rating: 4.6, stock: 5, colors: ['#ffb703', '#023047'],
    name: { en: 'Halo Floor Lamp', de: 'Halo Stehleuchte' },
    description: { en: 'Arched floor lamp with a marble base.', de: 'Bogenleuchte mit Marmorsockel.' } },
];

export const categories: Category[] = ['lighting', 'furniture', 'textiles', 'kitchen'];
