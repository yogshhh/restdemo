// src/data/constants.js
// Centralised static data consumed by pages and components.

export const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Help", "Contact"];

export const DISHES = [
  {
    name: "Otoro Sashimi",
    desc: "Premium bluefin toro, shiso, freshly grated wasabi, house ponzu",
    tag: "Chef's Signature",
    img: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Omakase Nigiri",
    desc: "Ten-piece seasonal selection, shari rice seasoned with akazu",
    tag: "Most Loved",
    img: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Wagyu Shabu Sushi",
    desc: "A5 Kobe beef, truffle ponzu, gold leaf, micro herbs",
    tag: "Premium",
    img: "https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Uni Ikura Don",
    desc: "Hokkaido sea urchin, salmon roe, dashi jelly, nori, sesame",
    tag: "Seasonal",
    img: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const USPS = [
  {
    icon: "🎋",
    title: "Tsukiji-Direct Sourcing",
    desc: "Every fish arrives from Tokyo's finest markets within 24 hours, ensuring absolute freshness and authenticity.",
  },
  {
    icon: "🏆",
    title: "Michelin-Recognised Craft",
    desc: "Head chef Kenji Nakamura trained under three Michelin-starred masters in Kyoto, Osaka, and Paris.",
  },
  {
    icon: "⛩️",
    title: "Japanese Minimalist Ambience",
    desc: "Our dining room was designed by Kyoto architect Hiroshi Tanaka — wabi-sabi meets contemporary luxury.",
  },
  {
    icon: "🍶",
    title: "Curated Sake & Whisky",
    desc: "Over 200 labels: rare Dassai, Hakkaisan, and vintage Yamazaki expressions curated by our kikizake-shi.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Yuki Tanaka",
    role: "Food Critic, Tokyo Gourmet Monthly",
    quote:
      "Sakura Sushi Bar doesn't merely serve Japanese cuisine — it delivers the soul of Japan itself. Each piece of nigiri is a poem.",
    stars: 5,
  },
  {
    name: "James Whitfield",
    role: "CEO, Whitfield Asia Pacific",
    quote:
      "We host every important client dinner here. The omakase experience is consistently transcendent — equal to anything in Tokyo.",
    stars: 5,
  },
  {
    name: "Aisha Al-Rashidi",
    role: "Luxury Travel Correspondent",
    quote:
      "If I could name one restaurant that defines Tokyo's modern luxury dining scene, it would be Sakura. Extraordinary in every dimension.",
    stars: 5,
  },
];

export const SERVICES = [
  {
    icon: "🍣",
    title: "Omakase Experience",
    desc: "Surrender to our chef's vision — an intimate 15-course journey through Japan's finest seasonal ingredients, renewed each evening.",
  },
  {
    icon: "🥂",
    title: "Private Kaiseki Rooms",
    desc: "Exclusive tatami rooms for up to 20 guests. Perfect for o-iwai celebrations, corporate omakase, and proposals under paper lantern light.",
  },
  {
    icon: "🚐",
    title: "Premium Catering",
    desc: "Bring Sakura's artistry to your venue. Our team delivers the same Michelin-recognised standard anywhere in the Tokyo metropolitan area.",
  },
  {
    icon: "📅",
    title: "Online Reservations",
    desc: "Reserve your omakase seat instantly. Share dietary preferences and special requests for a truly personalised experience.",
  },
];

export const PORTFOLIO_ITEMS = [
  { category: "Food",     img: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600",  title: "Otoro Artistry" },
  { category: "Interior", img: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600",   title: "Hinoki Counter" },
  { category: "Food",     img: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Nigiri Procession" },
  { category: "Events",   img: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Private Kaiseki Evening" },
  { category: "Interior", img: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Tokyo at Night" },
  { category: "Food",     img: "https://images.pexels.com/photos/884596/pexels-photo-884596.jpeg?auto=compress&cs=tinysrgb&w=600",   title: "Miso Symphony" },
  { category: "Events",   img: "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=600",   title: "Corporate Omakase" },
  { category: "Interior", img: "https://images.pexels.com/photos/2664149/pexels-photo-2664149.jpeg?auto=compress&cs=tinysrgb&w=600", title: "The Sake Cellar" },
  { category: "Food",     img: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Seasonal Composition" },
];

export const TIMELINE = [
  { year: "2005", title: "修行の始まり", desc: "Chef Kenji Nakamura begins his shugyo — the rigorous traditional apprenticeship — under sushi master Jiro Ono in Ginza, Tokyo." },
  { year: "2011", title: "最初の星",     desc: "After six years of mastery, Chef Nakamura opens a 12-seat kappo in Nishi-Azabu. It receives its first Michelin star within twelve months." },
  { year: "2016", title: "桜の誕生",     desc: "Sakura Sushi Bar opens in Minami-Aoyama, Tokyo — a 60-seat temple of Japanese fine dining fusing tradition with contemporary luxury." },
  { year: "2023", title: "三つ星の栄誉", desc: "Sakura is awarded three Michelin stars, joining a select handful of Tokyo's most celebrated omakase destinations." },
];

export const FAQ_ITEMS = [
  {
    q: "How do I make a reservation at Sakura Sushi Bar?",
    a: "You can reserve your table online via our Contact page, by calling +81 3 1234 5678, or by emailing reserve@sakurasushibar.jp. We recommend booking at least two weeks in advance, as our omakase seats are extremely limited.",
  },
  {
    q: "What is the omakase experience and how long does it last?",
    a: "Omakase (お任せ) means 'I leave it to you' — you entrust your evening entirely to Chef Nakamura's seasonal vision. The full 15-course omakase experience typically lasts 2.5 to 3 hours. Every course reflects the finest ingredients available that day.",
  },
  {
    q: "Can dietary restrictions or allergies be accommodated?",
    a: "Absolutely. Please share all dietary requirements, allergies, or intolerances when making your reservation. Our team will communicate these directly to Chef Nakamura, who will craft a personalised omakase menu to suit your needs without compromising on artistry.",
  },
  {
    q: "Is there a dress code at Sakura Sushi Bar?",
    a: "We invite guests to dress in smart casual or formal attire to honour the spirit of the dining experience. We respectfully ask that sportswear, beachwear, and flip-flops not be worn in our dining rooms.",
  },
  {
    q: "Do you offer private dining rooms for special occasions?",
    a: "Yes. We have exclusive tatami-style kaiseki rooms accommodating up to 20 guests. These are ideal for o-iwai celebrations, corporate omakase evenings, anniversaries, and intimate proposals under paper lantern light. Contact us to arrange a private booking.",
  },
  {
    q: "What is your cancellation and no-show policy?",
    a: "We kindly ask for at least 48 hours' notice for cancellations or amendments. Cancellations within 24 hours and no-shows may incur a charge equivalent to the full omakase menu price per guest, as our tasting menus are prepared exclusively for each reservation.",
  },
  {
    q: "Do you cater for events outside the restaurant?",
    a: "Yes — our Premium Catering service brings Sakura's Michelin-recognised artistry directly to your venue anywhere in the Tokyo metropolitan area. From intimate gatherings to large corporate events, our team delivers the same standard of excellence.",
  },
  {
    q: "What sake and drink pairings are available?",
    a: "Our kikizake-shi (certified sake sommelier) has curated a cellar of over 200 labels, including rare Dassai, Hakkaisan, and vintage Yamazaki whisky expressions. We offer optional sake and whisky pairing menus designed to complement each course of the omakase perfectly.",
  },
  {
    q: "Is Sakura Sushi Bar suitable for children?",
    a: "Sakura Sushi Bar is a fine dining destination designed for a contemplative, adult dining experience. We warmly welcome children aged 12 and above who are comfortable with a multi-course tasting format. We ask that families contact us in advance so we may prepare accordingly.",
  },
  {
    q: "Where is Sakura Sushi Bar located and how do I get there?",
    a: "We are located at 2-14-6 Minami-Aoyama, Minato-ku, Tokyo, 107-0062, Japan. The nearest station is Omotesando on the Ginza, Chiyoda, and Hanzomon lines (5-minute walk). Valet parking is available upon request.",
  },
];
