export type WordDetail = {
  es: string;
  en: string;
  syllables: string[];
  phonetic: string;
};

export type Sentence = {
  es: string;
  en: string;
  syllables?: string;
  words?: WordDetail[];
};

export type Lesson = {
  slug: string;
  n: number;
  es: string;
  en: string;
  emoji: string;
  open: boolean;
  sentences: Sentence[];
};

export const lessons: Lesson[] = [
  {
    slug: "colors",
    n: 1,
    es: "Los colores",
    en: "Colors",
    emoji: "🎨",
    open: true,
    sentences: [
      {
        es: "La manzana es roja.",
        en: "The apple is red.",
        syllables: "La man-za-na es ro-ja.",
        words: [
          { es: "La", en: "The (fem.)", syllables: ["La"], phonetic: "lah" },
          { es: "manzana", en: "apple", syllables: ["man", "za", "na"], phonetic: "mahn-SAH-nah" },
          { es: "es", en: "is", syllables: ["es"], phonetic: "ess" },
          { es: "roja", en: "red", syllables: ["ro", "ja"], phonetic: "ROH-hah" },
        ],
      },
      {
        es: "El cielo es azul.",
        en: "The sky is blue.",
        syllables: "El cie-lo es a-zul.",
        words: [
          { es: "El", en: "The (masc.)", syllables: ["El"], phonetic: "ell" },
          { es: "cielo", en: "sky", syllables: ["cie", "lo"], phonetic: "see-EH-loh" },
          { es: "es", en: "is", syllables: ["es"], phonetic: "ess" },
          { es: "azul", en: "blue", syllables: ["a", "zul"], phonetic: "ah-SOOL" },
        ],
      },
      {
        es: "El sol es amarillo.",
        en: "The sun is yellow.",
        syllables: "El sol es a-ma-ri-llo.",
        words: [
          { es: "El", en: "The", syllables: ["El"], phonetic: "ell" },
          { es: "sol", en: "sun", syllables: ["sol"], phonetic: "sohl" },
          { es: "es", en: "is", syllables: ["es"], phonetic: "ess" },
          { es: "amarillo", en: "yellow", syllables: ["a", "ma", "ri", "llo"], phonetic: "ah-mah-REE-yoh" },
        ],
      },
      {
        es: "La hoja es verde.",
        en: "The leaf is green.",
        syllables: "La ho-ja es ver-de.",
        words: [
          { es: "La", en: "The", syllables: ["La"], phonetic: "lah" },
          { es: "hoja", en: "leaf", syllables: ["ho", "ja"], phonetic: "OH-hah" },
          { es: "es", en: "is", syllables: ["es"], phonetic: "ess" },
          { es: "verde", en: "green", syllables: ["ver", "de"], phonetic: "VAIR-deh" },
        ],
      },
      {
        es: "Me gustan los colores.",
        en: "I like colors.",
        syllables: "Me gus-tan los co-lo-res.",
        words: [
          { es: "Me", en: "To me", syllables: ["Me"], phonetic: "meh" },
          { es: "gustan", en: "please (I like)", syllables: ["gus", "tan"], phonetic: "GOOS-tahn" },
          { es: "los", en: "the (plural)", syllables: ["los"], phonetic: "lohs" },
          { es: "colores", en: "colors", syllables: ["co", "lo", "res"], phonetic: "koh-LOH-rehs" },
        ],
      },
    ],
  },
  {
    slug: "animals",
    n: 2,
    es: "Los animales",
    en: "Animals",
    emoji: "🐔",
    open: true,
    sentences: [
      {
        es: "La gallina come trigo.",
        en: "The hen eats wheat.",
        syllables: "La ga-lli-na co-me tri-go.",
        words: [
          { es: "La", en: "The", syllables: ["La"], phonetic: "lah" },
          { es: "gallina", en: "hen", syllables: ["ga", "lli", "na"], phonetic: "gah-YEE-nah" },
          { es: "come", en: "eats", syllables: ["co", "me"], phonetic: "KOH-meh" },
          { es: "trigo", en: "wheat", syllables: ["tri", "go"], phonetic: "TREE-goh" },
        ],
      },
      {
        es: "El perro corre rápido.",
        en: "The dog runs fast.",
        syllables: "El pe-rro co-rre rá-pi-do.",
        words: [
          { es: "El", en: "The", syllables: ["El"], phonetic: "ell" },
          { es: "perro", en: "dog", syllables: ["pe", "rro"], phonetic: "PEH-rroh" },
          { es: "corre", en: "runs", syllables: ["co", "rre"], phonetic: "KOH-rreh" },
          { es: "rápido", en: "fast", syllables: ["rá", "pi", "do"], phonetic: "RAH-pee-doh" },
        ],
      },
      {
        es: "El gato duerme mucho.",
        en: "The cat sleeps a lot.",
        syllables: "El ga-to duer-me mu-cho.",
        words: [
          { es: "El", en: "The", syllables: ["El"], phonetic: "ell" },
          { es: "gato", en: "cat", syllables: ["ga", "to"], phonetic: "GAH-toh" },
          { es: "duerme", en: "sleeps", syllables: ["duer", "me"], phonetic: "DWAIR-meh" },
          { es: "mucho", en: "a lot", syllables: ["mu", "cho"], phonetic: "MOO-choh" },
        ],
      },
      {
        es: "El pájaro canta en el árbol.",
        en: "The bird sings in the tree.",
        syllables: "El pá-ja-ro can-ta en el ár-bol.",
        words: [
          { es: "El", en: "The", syllables: ["El"], phonetic: "ell" },
          { es: "pájaro", en: "bird", syllables: ["pá", "ja", "ro"], phonetic: "PAH-hah-roh" },
          { es: "canta", en: "sings", syllables: ["can", "ta"], phonetic: "KAHN-tah" },
          { es: "en", en: "in", syllables: ["en"], phonetic: "ehn" },
          { es: "el", en: "the", syllables: ["el"], phonetic: "ell" },
          { es: "árbol", en: "tree", syllables: ["ár", "bol"], phonetic: "AHR-bohl" },
        ],
      },
      {
        es: "Me gustan los animales.",
        en: "I like animals.",
        syllables: "Me gus-tan los a-ni-ma-les.",
        words: [
          { es: "Me", en: "To me", syllables: ["Me"], phonetic: "meh" },
          { es: "gustan", en: "please (I like)", syllables: ["gus", "tan"], phonetic: "GOOS-tahn" },
          { es: "los", en: "the", syllables: ["los"], phonetic: "lohs" },
          { es: "animales", en: "animals", syllables: ["a", "ni", "ma", "les"], phonetic: "ah-nee-MAH-lehs" },
        ],
      },
    ],
  },
  {
    slug: "family",
    n: 3,
    es: "La familia",
    en: "Family",
    emoji: "👨‍👩‍👧",
    open: true,
    sentences: [
      {
        es: "Mi mamá cocina con amor.",
        en: "My mom cooks with love.",
        syllables: "Mi ma-má co-ci-na con a-mor.",
        words: [
          { es: "Mi", en: "My", syllables: ["Mi"], phonetic: "mee" },
          { es: "mamá", en: "mom", syllables: ["ma", "má"], phonetic: "mah-MAH" },
          { es: "cocina", en: "cooks", syllables: ["co", "ci", "na"], phonetic: "koh-SEE-nah" },
          { es: "con", en: "with", syllables: ["con"], phonetic: "kohn" },
          { es: "amor", en: "love", syllables: ["a", "mor"], phonetic: "ah-MOHR" },
        ],
      },
      {
        es: "Mi papá lee un libro.",
        en: "My dad reads a book.",
        syllables: "Mi pa-pá le-e un li-bro.",
        words: [
          { es: "Mi", en: "My", syllables: ["Mi"], phonetic: "mee" },
          { es: "papá", en: "dad", syllables: ["pa", "pá"], phonetic: "pah-PAH" },
          { es: "lee", en: "reads", syllables: ["le", "e"], phonetic: "LEH-eh" },
          { es: "un", en: "a", syllables: ["un"], phonetic: "oon" },
          { es: "libro", en: "book", syllables: ["li", "bro"], phonetic: "LEE-broh" },
        ],
      },
      {
        es: "Mi hermano juega conmigo.",
        en: "My brother plays with me.",
        syllables: "Mi her-ma-no jue-ga con-mi-go.",
        words: [
          { es: "Mi", en: "My", syllables: ["Mi"], phonetic: "mee" },
          { es: "hermano", en: "brother", syllables: ["her", "ma", "no"], phonetic: "air-MAH-noh" },
          { es: "juega", en: "plays", syllables: ["jue", "ga"], phonetic: "HWEH-gah" },
          { es: "conmigo", en: "with me", syllables: ["con", "mi", "go"], phonetic: "kohn-MEE-goh" },
        ],
      },
    ],
  },
  {
    slug: "numbers",
    n: 4,
    es: "Los números",
    en: "Numbers 1–10",
    emoji: "🔢",
    open: true,
    sentences: [
      {
        es: "Uno, dos, tres patitos nadan.",
        en: "One, two, three ducklings swim.",
        syllables: "U-no, dos, tres pa-ti-tos na-dan.",
        words: [
          { es: "Uno", en: "One", syllables: ["U", "no"], phonetic: "OO-noh" },
          { es: "dos", en: "two", syllables: ["dos"], phonetic: "dohs" },
          { es: "tres", en: "three", syllables: ["tres"], phonetic: "trehs" },
          { es: "patitos", en: "ducklings", syllables: ["pa", "ti", "tos"], phonetic: "pah-TEE-tohs" },
          { es: "nadan", en: "swim", syllables: ["na", "dan"], phonetic: "NAH-dahn" },
        ],
      },
      {
        es: "Cuatro y cinco estrellas brillan.",
        en: "Four and five stars shine.",
        syllables: "Cua-tro y cin-co es-tre-llas bri-llan.",
        words: [
          { es: "Cuatro", en: "Four", syllables: ["Cua", "tro"], phonetic: "KWAH-troh" },
          { es: "y", en: "and", syllables: ["y"], phonetic: "ee" },
          { es: "cinco", en: "five", syllables: ["cin", "co"], phonetic: "SEEN-koh" },
          { es: "estrellas", en: "stars", syllables: ["es", "tre", "llas"], phonetic: "ess-TREH-yahs" },
          { es: "brillan", en: "shine", syllables: ["bri", "llan"], phonetic: "BREE-yahn" },
        ],
      },
    ],
  },
  {
    slug: "food",
    n: 5,
    es: "La comida",
    en: "Food",
    emoji: "🍞",
    open: true,
    sentences: [
      {
        es: "El pan caliente huele rico.",
        en: "The warm bread smells delicious.",
        syllables: "El pan ca-lien-te hue-le ri-co.",
        words: [
          { es: "El", en: "The", syllables: ["El"], phonetic: "ell" },
          { es: "pan", en: "bread", syllables: ["pan"], phonetic: "pahn" },
          { es: "caliente", en: "warm / hot", syllables: ["ca", "lien", "te"], phonetic: "kah-lee-EHN-teh" },
          { es: "huele", en: "smells", syllables: ["hue", "le"], phonetic: "WEH-leh" },
          { es: "rico", en: "rich / delicious", syllables: ["ri", "co"], phonetic: "REE-koh" },
        ],
      },
      {
        es: "La leche está en el vaso.",
        en: "The milk is in the glass.",
        syllables: "La le-che es-tá en el va-so.",
        words: [
          { es: "La", en: "The", syllables: ["La"], phonetic: "lah" },
          { es: "leche", en: "milk", syllables: ["le", "che"], phonetic: "LEH-cheh" },
          { es: "está", en: "is", syllables: ["es", "tá"], phonetic: "ess-TAH" },
          { es: "en", en: "in", syllables: ["en"], phonetic: "ehn" },
          { es: "el", en: "the", syllables: ["el"], phonetic: "ell" },
          { es: "vaso", en: "glass", syllables: ["va", "so"], phonetic: "VAH-soh" },
        ],
      },
    ],
  },
  {
    slug: "home",
    n: 6,
    es: "Mi casa",
    en: "My Home",
    emoji: "🏠",
    open: true,
    sentences: [
      {
        es: "La puerta es grande y roja.",
        en: "The door is big and red.",
        syllables: "La puer-ta es gran-de y ro-ja.",
        words: [
          { es: "La", en: "The", syllables: ["La"], phonetic: "lah" },
          { es: "puerta", en: "door", syllables: ["puer", "ta"], phonetic: "PWAIR-tah" },
          { es: "es", en: "is", syllables: ["es"], phonetic: "ess" },
          { es: "grande", en: "big", syllables: ["gran", "de"], phonetic: "GRAHN-deh" },
          { es: "y", en: "and", syllables: ["y"], phonetic: "ee" },
          { es: "roja", en: "red", syllables: ["ro", "ja"], phonetic: "ROH-hah" },
        ],
      },
      {
        es: "La ventana da al jardín.",
        en: "The window looks out to the garden.",
        syllables: "La ven-ta-na da al jar-dín.",
        words: [
          { es: "La", en: "The", syllables: ["La"], phonetic: "lah" },
          { es: "ventana", en: "window", syllables: ["ven", "ta", "na"], phonetic: "vehn-TAH-nah" },
          { es: "da", en: "gives / faces", syllables: ["da"], phonetic: "dah" },
          { es: "al", en: "to the", syllables: ["al"], phonetic: "ahl" },
          { es: "jardín", en: "garden", syllables: ["jar", "dín"], phonetic: "hahr-DEEN" },
        ],
      },
    ],
  },
];
