// ─────────────────────────────────────────────────────────────
//  Contenido para la INTERNACIÓN CONJUNTA (mientras mamá y bebé
//  están en el sanatorio). Pensado para captarse en segundos:
//  frases cortas, pocas cosas.
//
//  FUENTE PRINCIPAL: documento oficial de la Maternidad del
//  Sanatorio Modelo S.A. ("Internación conjunta", 5 pantallas).
//  El texto se toma de ahí; ver `fuentes` al pie.
// ─────────────────────────────────────────────────────────────

export type Punto = {
  icon: string;
  titulo: string;
  texto: string;
};

// Componentes interactivos asociados a la tarjeta (se abren al tocarla).
export type Interactivo = "nursing" | "crib" | "outfit" | "diaper";

export type Tarjeta = {
  id: string;
  emoji: string;
  titulo: string; // corto, para el póster
  clave: string; // la "palabra clave" de una línea que se lee en 2 segundos
  resumen: string; // breve descripción visible en la tarjeta (sin tocar)
  color: "mint" | "lavender" | "skysoft" | "peach" | "bubble" | "sunshine";
  destacada?: boolean; // se resalta (signos de alarma)
  interactivos?: Interactivo[];
  puntos: Punto[]; // puntos breves, tomados del documento oficial
};

export const tarjetas: Tarjeta[] = [
  {
    id: "alimentacion",
    emoji: "🤱",
    titulo: "Alimentación",
    clave: "Pecho a libre demanda",
    resumen: "Pecho cuando lo pida, sin restricciones. Boca bien abierta y sin chupete al principio.",
    color: "mint",
    interactivos: ["nursing"],
    puntos: [
      {
        icon: "⏰",
        titulo: "A libre demanda",
        texto: "Las veces y el tiempo que quiera. Con un límite de 3 a 4 h, para lograr unas 8 a 12 tomas en 24 h.",
      },
      {
        icon: "👄",
        titulo: "Buen agarre",
        texto: "Boca bien abierta, abarcando la mayor parte de la areola y el pezón. Cuando lo suelte, ofrecé el otro pecho.",
      },
      {
        icon: "🌟",
        titulo: "El calostro alcanza",
        texto: "Los primeros días sale calostro: es distinto de la leche, cubre sus necesidades y le da muchas defensas.",
      },
      {
        icon: "🚫",
        titulo: "Sin chupete ni mamadera",
        texto: "No se recomiendan (salvo indicación médica o deseo materno). El chupete, recién con la lactancia ya establecida, para no interferir.",
      },
    ],
  },
  {
    id: "vinculo",
    emoji: "💕",
    titulo: "Vínculo y apego",
    clave: "Piel con piel",
    resumen: "El afecto de los momentos de cuidado le da seguridad al bebé.",
    color: "sunshine",
    puntos: [
      {
        icon: "🤱",
        titulo: "Piel con piel",
        texto: "Contacto piel con piel, sostenerlo y abrazarlo.",
      },
      {
        icon: "🗣️",
        titulo: "Hablale y miralo",
        texto: "Hablarle suavemente y buscar la conexión visual.",
      },
      {
        icon: "💞",
        titulo: "Se construye cuidando",
        texto: "El apego es el afecto profundo que se forma en los momentos de cuidado y le da seguridad.",
      },
    ],
  },
  {
    id: "eliminacion",
    emoji: "💧",
    titulo: "Eliminación",
    clave: "Pis y caca en las primeras 24 h",
    resumen: "Debe hacer al menos una de pis y una de meconio en el primer día.",
    color: "skysoft",
    puntos: [
      {
        icon: "💦",
        titulo: "Orina",
        texto: "Al menos una vez en las primeras 24 h. Puede ser de color naranja o rosada (por los uratos): es normal.",
      },
      {
        icon: "💩",
        titulo: "Meconio",
        texto: "La primera caca es pegajosa y de color negro verdoso. Al menos una en las primeras 24 h.",
      },
    ],
  },
  {
    id: "acompanar-mama",
    emoji: "🫂",
    titulo: "Acompañar a mamá",
    clave: "Rutinas y calma",
    resumen: "Un tiempo sensible: mamá y bebé necesitan cuidado y compañía.",
    color: "bubble",
    puntos: [
      {
        icon: "👨‍👩‍👧",
        titulo: "Red de apoyo",
        texto: "Los primeros tiempos son sensibles para mamá y bebé. Acompañan el papá, la pareja, la familia y el equipo de salud.",
      },
      {
        icon: "⏳",
        titulo: "Rutinas y horarios",
        texto: "Ayuda respetar los horarios y dedicar tiempo a los cuidados: la lactancia, el baño, la preparación para dormir y el cambiado.",
      },
      {
        icon: "🕊️",
        titulo: "Despacio",
        texto: "Hacé los cuidados despacio y con tranquilidad, manteniendo la mirada y la comunicación con gestos.",
      },
    ],
  },
  {
    id: "vestimenta",
    emoji: "🧦",
    titulo: "Vestimenta y temperatura",
    clave: "Algodón, una muda más",
    resumen: "Ropa de algodón, una capa más que la del adulto y ambiente agradable.",
    color: "peach",
    interactivos: ["outfit"],
    puntos: [
      {
        icon: "👕",
        titulo: "De algodón",
        texto: "Ropa de algodón, cómoda y amplia, de colores claros, para que pueda moverse.",
      },
      {
        icon: "🌡️",
        titulo: "Una muda más",
        texto: "Una muda más que la del adulto. Temperatura ambiental agradable, cálida o fresca según la estación.",
      },
      {
        icon: "🌬️",
        titulo: "Ambiente aireado",
        texto: "Mantené el ambiente agradable y aireado.",
      },
    ],
  },
  {
    id: "bano-cordon",
    emoji: "🛁",
    titulo: "Baño, uñas y cordón",
    clave: "Cordón: gasa y alcohol 70%",
    resumen: "Baño diario, uñas con lima y curación del cordón en cada cambio de pañal.",
    color: "mint",
    interactivos: ["diaper"],
    puntos: [
      {
        icon: "🛁",
        titulo: "Baño",
        texto: "Con agua a temperatura ambiente y jabón para bebé. Puede ser todos los días o más de una vez; ustedes eligen la hora y la frecuencia. Es un momento de encuentro que incluso lo calma.",
      },
      {
        icon: "💅",
        titulo: "Uñas",
        texto: "Se liman. No se cortan.",
      },
      {
        icon: "🩹",
        titulo: "Cordón / ombligo",
        texto: "Durante la internación, curá la base en cada cambio de pañal con gasa y alcohol al 70%. Después lavalo en el baño y mantenelo seco.",
      },
    ],
  },
  {
    id: "llanto",
    emoji: "😢",
    titulo: "El llanto",
    clave: "Llorar es pedir algo",
    resumen: "El llanto pide consuelo. Repasá las causas más comunes.",
    color: "lavender",
    puntos: [
      {
        icon: "🫂",
        titulo: "Consolá siempre",
        texto: "El llanto expresa angustia o malestar. Siempre necesita ser consolado, sostenido y abrazado; al pecho reconoce tu voz, tus latidos y el calor de tu piel.",
      },
      {
        icon: "🔎",
        titulo: "Revisá qué necesita",
        texto: "¿Pañal mojado o sucio? ¿Hambre o necesita eructar? ¿Está incómodo, con frío o calor? ¿Demasiado ruido o luces brillantes?",
      },
      {
        icon: "☎️",
        titulo: "Si no cede",
        texto: "Si el llanto continúa por un período prolongado, consultá con el personal de salud.",
      },
    ],
  },
  {
    id: "sueno",
    emoji: "🌙",
    titulo: "Sueño seguro",
    clave: "Boca arriba y cuna libre",
    resumen: "Boca arriba, cuna despejada y en su cuna al lado de la cama.",
    color: "skysoft",
    interactivos: ["crib"],
    puntos: [
      {
        icon: "🛏️",
        titulo: "Boca arriba",
        texto: "Siempre boca arriba. Cubrilo con la ropa de cama solo hasta las axilas, con la cara descubierta y los brazos por fuera de la sábana.",
      },
      {
        icon: "🧸",
        titulo: "Cuna despejada",
        texto: "Sin almohada, juguetes, peluches ni chichoneras. Sin gorrito ni babero. Colchón firme y plano con sábana ajustada. Sin frazadas ni colchas gruesas.",
      },
      {
        icon: "🛌",
        titulo: "Su cuna, al lado",
        texto: "Duerme en su cuna al lado de la cama de los padres. El colecho aumenta el riesgo de accidentes.",
      },
      {
        icon: "🤫",
        titulo: "Menos estímulos",
        texto: "Bajá la luz, los ruidos y la tele. Duermen la mayor parte del día, entre 18 y 20 h.",
      },
    ],
  },
  {
    id: "control",
    emoji: "🩺",
    titulo: "Control del bebé sano",
    clave: "Primer control: 3 días",
    resumen: "El primer control es dentro de los 3 días del alta.",
    color: "sunshine",
    puntos: [
      {
        icon: "📅",
        titulo: "Primer control",
        texto: "Debe hacerse dentro de los primeros 3 días del alta, o cuando lo indique tu pediatra.",
      },
    ],
  },
  {
    id: "alarma",
    emoji: "🚨",
    titulo: "Signos de alarma",
    clave: "Cuándo consultar YA",
    resumen: "Señales para consultar sin demora con el equipo de salud.",
    color: "bubble",
    destacada: true,
    puntos: [
      {
        icon: "🍽️",
        titulo: "No quiere comer",
        texto: "No se interesa por el pecho o no se alimenta en varias tomas seguidas.",
      },
      {
        icon: "🤮",
        titulo: "Vómitos",
        texto: "Vomita dos o más tomas en un período de 24 h.",
      },
      {
        icon: "🌡️",
        titulo: "Fiebre o frío",
        texto: "38 °C o más; o menos de 36 °C que no mejora al abrigarlo.",
      },
      {
        icon: "💧",
        titulo: "Orina poco",
        texto: "Orina poco y notan los pañales secos en 24 h.",
      },
      {
        icon: "🥴",
        titulo: "Muy blandito",
        texto: "Está “blando” a upa, como si no pudiera mover sus brazos o piernas.",
      },
      {
        icon: "👁️",
        titulo: "Ojos u ombligo",
        texto: "Enrojecimiento o secreción en los ojos o alrededor del ombligo.",
      },
      {
        icon: "😢",
        titulo: "Llanto que no cede",
        texto: "Llanto agudo y continuo, que no para.",
      },
      {
        icon: "🫁",
        titulo: "Le cuesta respirar",
        texto: "Respira muy rápido, se le hunden las costillas o hace un quejido al respirar.",
      },
      {
        icon: "💙",
        titulo: "Labios azulados",
        texto: "Labios de color azulado (cianosis).",
      },
    ],
  },
];

export type Fuente = { nombre: string; detalle: string; url: string };

// (Se mantiene documentado en el código; no se muestra en la web por
//  pedido del usuario.)
export const fuentes: Fuente[] = [
  {
    nombre: "Maternidad del Sanatorio Modelo S.A.",
    detalle: "Documento institucional “Internación conjunta” (fuente principal del contenido)",
    url: "",
  },
  {
    nombre: "HealthyChildren.org (Academia Americana de Pediatría)",
    detalle: "Sueño seguro; cómo vestir y bañar al recién nacido (respaldo)",
    url: "https://www.healthychildren.org/Spanish/ages-stages/baby/bathing-skin-care/Paginas/bathing-your-newborn.aspx",
  },
  {
    nombre: "Organización Mundial de la Salud (OMS)",
    detalle: "Lactancia materna a libre demanda (respaldo)",
    url: "https://www.who.int/es/health-topics/breastfeeding",
  },
];

export const DISCLAIMER =
  "Información orientativa para acompañarte durante la internación. No reemplaza el consejo de tu equipo de salud. Ante cualquier duda, preguntá al personal de enfermería o a tu pediatra.";
