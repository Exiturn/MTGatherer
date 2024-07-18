export type CardT = {
  object: string;
  id: string;
  oracle_id: string;
  multiverse_ids: number[];
  mtgo_id: number;
  tcgplayer_id: number;
  cardmarket_id: number;
  name: string;
  lang: string;
  released_at: Date;
  uri: string;
  scryfall_uri: string;
  layout: string;
  highres_image: boolean;
  image_status: string;
  image_uris: ImageUris;
  mana_cost: string;
  cmc: number;
  type_line: string;
  oracle_text: string;
  loyalty: string;
  colors: any[];
  color_identity: any[];
  keywords: any[];
  all_parts: AllPart[];
  legalities: Legalities;
  games: string[];
  reserved: boolean;
  foil: boolean;
  nonfoil: boolean;
  finishes: string[];
  oversized: boolean;
  promo: boolean;
  reprint: boolean;
  variation: boolean;
  set_id: string;
  set: string;
  set_name: string;
  set_type: string;
  set_uri: string;
  set_search_uri: string;
  scryfall_set_uri: string;
  rulings_uri: string;
  prints_search_uri: string;
  collector_number: string;
  digital: boolean;
  rarity: string;
  card_back_id: string;
  artist: string;
  artist_ids: string[];
  illustration_id: string;
  border_color: string;
  frame: string;
  security_stamp: string;
  full_art: boolean;
  textless: boolean;
  booster: boolean;
  story_spotlight: boolean;
  edhrec_rank: number;
  prices: Prices;
  related_uris: RelatedUris;
  purchase_uris: PurchaseUris;
  card_faces?: CardFace[];
};

export type CardFace = {
  object: string;
  name: string;
  mana_cost: string | undefined;
  type_line: string;
  oracle_text: string;
  colors: string[];
  power: string;
  toughness: string;
  artist: string;
  artist_id: string;
  illustration_id: string;
  image_uris: ImageUris;
};

export type AllPart = {
  object: string;
  id: string;
  component: string;
  name: string;
  type_line: string;
  uri: string;
};

export type ImageUris = {
  small: string;
  normal: string | undefined;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
};

export type Legalities = {
  standard: string;
  future: string;
  historic: string;
  timeless: string;
  gladiator: string;
  pioneer: string;
  explorer: string;
  modern: string;
  legacy: string;
  pauper: string;
  vintage: string;
  penny: string;
  commander: string;
  oathbreaker: string;
  standardbrawl: string;
  brawl: string;
  alchemy: string;
  paupercommander: string;
  duel: string;
  oldschool: string;
  premodern: string;
  predh: string;
};

export type Prices = {
  usd: null;
  usd_foil: string;
  usd_etched: null;
  eur: null;
  eur_foil: string;
  tix: string;
};

export type PurchaseUris = {
  tcgplayer: string;
  cardmarket: string;
  cardhoarder: string;
};

export type RelatedUris = {
  gatherer: string;
  tcgplayer_infinite_articles: string;
  tcgplayer_infinite_decks: string;
  edhrec: string;
};

export type ErrorObjectT = {
  object: string;
  code: string;
  status: number;
  details: string;
};

export type  SessionUserT = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean | null;
  image: string; // Add the image property here
}
