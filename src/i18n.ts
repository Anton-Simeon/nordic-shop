export type Lang = 'en' | 'de';

const dict = {
  en: {
    tagline: 'Scandinavian home goods, delivered across Europe',
    search: 'Search products…',
    all: 'All',
    lighting: 'Lighting', furniture: 'Furniture', textiles: 'Textiles', kitchen: 'Kitchen',
    sort: 'Sort', sortFeatured: 'Featured', sortPriceAsc: 'Price: low to high', sortPriceDesc: 'Price: high to low', sortRating: 'Top rated',
    maxPrice: 'Max price', inStockOnly: 'In stock only',
    results: (n: number) => `${n} product${n === 1 ? '' : 's'}`,
    noResults: 'No products match your filters.', reset: 'Reset filters',
    addToCart: 'Add to cart', outOfStock: 'Out of stock', onlyLeft: (n: number) => `Only ${n} left`, new: 'New',
    cart: 'Cart', emptyCart: 'Your cart is empty.', subtotal: 'Subtotal', shipping: 'Shipping', free: 'Free', total: 'Total',
    freeShippingHint: (amount: string) => `Add ${amount} more for free shipping`,
    checkout: 'Checkout', remove: 'Remove', close: 'Close', qty: 'Quantity',
    name: 'Full name', email: 'Email', address: 'Street and number', zip: 'Postal code', city: 'City',
    placeOrder: 'Place order', back: 'Back to cart', required: 'This field is required', invalidEmail: 'Enter a valid email address', invalidZip: 'Enter a 4–5 digit postal code',
    thanks: 'Thank you for your order!', orderNo: 'Order number', continue: 'Continue shopping', demo: 'Demo shop – no real orders are placed.',
  },
  de: {
    tagline: 'Skandinavische Wohnaccessoires, geliefert in ganz Europa',
    search: 'Produkte suchen…',
    all: 'Alle',
    lighting: 'Leuchten', furniture: 'Möbel', textiles: 'Textilien', kitchen: 'Küche',
    sort: 'Sortieren', sortFeatured: 'Empfohlen', sortPriceAsc: 'Preis aufsteigend', sortPriceDesc: 'Preis absteigend', sortRating: 'Beste Bewertung',
    maxPrice: 'Max. Preis', inStockOnly: 'Nur lieferbar',
    results: (n: number) => `${n} Produkt${n === 1 ? '' : 'e'}`,
    noResults: 'Keine Produkte entsprechen deinen Filtern.', reset: 'Filter zurücksetzen',
    addToCart: 'In den Warenkorb', outOfStock: 'Ausverkauft', onlyLeft: (n: number) => `Nur noch ${n} verfügbar`, new: 'Neu',
    cart: 'Warenkorb', emptyCart: 'Dein Warenkorb ist leer.', subtotal: 'Zwischensumme', shipping: 'Versand', free: 'Gratis', total: 'Gesamt',
    freeShippingHint: (amount: string) => `Noch ${amount} bis zum Gratisversand`,
    checkout: 'Zur Kasse', remove: 'Entfernen', close: 'Schließen', qty: 'Menge',
    name: 'Vollständiger Name', email: 'E-Mail', address: 'Straße und Hausnummer', zip: 'PLZ', city: 'Ort',
    placeOrder: 'Bestellung absenden', back: 'Zurück zum Warenkorb', required: 'Pflichtfeld', invalidEmail: 'Gültige E-Mail-Adresse eingeben', invalidZip: '4–5-stellige PLZ eingeben',
    thanks: 'Danke für deine Bestellung!', orderNo: 'Bestellnummer', continue: 'Weiter einkaufen', demo: 'Demo-Shop – es werden keine echten Bestellungen ausgelöst.',
  },
};

export type Dict = (typeof dict)['en'];
export const t = (lang: Lang): Dict => dict[lang] as Dict;

export const formatPrice = (cents: number, lang: Lang) =>
  new Intl.NumberFormat(lang === 'de' ? 'de-AT' : 'en-IE', { style: 'currency', currency: 'EUR' }).format(cents / 100);
