import type { Personaje } from "../tipos";

export const personajes: Personaje[] = [
  {
    id: "limon",
    nombre: "Limón",
    arquetipo: "bufón",
    descripcionFisica: "verde brillante con su boina azul de medio lado",
    voz: {
      intro: "caminaba haciendo bromas a quien se le cruzara",
      intento: "decidió hacer lo que mejor hace: contar un chiste",
      reflexion: "aprendió que reírse también es una forma de curar",
    },
    poses: {
      inicio: "/personajes/limon/inicio.png",
      problema: "/personajes/limon/problema.png",
      intento: "/personajes/limon/intento.png",
      resolucion: "/personajes/limon/resolucion.png",
    },
    bio: {
      edad: "Joven intrépido de 24 años",
      rol: "Amigo del Vinagre y de Olea",
      ocupacion: "Hacer reír a todo el mundo",
      personalidad:
        "Tiene complejo de payaso y usa sus bromas como mecanismo de defensa porque en el fondo sufre mucho.",
      conflictoInterno:
        "Sigue triste por la muerte de Naranja y no ha logrado superarla.",
      conflictoExterno:
        "Debe ayudar a derrotar a la dictadura de Sal y Azúcar.",
      temor: "Perder otra vez a sus amigos.",
      quiere: "Superar a Naranja y volver a enamorarse.",
      haraParaObtenerlo:
        "Cuidará a sus amigos y los hará reír el mayor tiempo posible.",
    },
    premium: false,
  },
  {
    id: "cebolla",
    nombre: "Cebolla",
    arquetipo: "sabia",
    descripcionFisica:
      "morada con tallos verdes y lentes que la hacen ver mayor",
    voz: {
      intro: "leía un viejo recetario en su rincón fresco de la alacena",
      intento: "analizó cada grieta del problema con su precisión matemática",
      reflexion: "comprendió que el conocimiento solo sirve cuando se comparte",
    },
    poses: {
      inicio: "/personajes/cebolla/inicio.png",
      problema: "/personajes/cebolla/problema.png",
      intento: "/personajes/cebolla/intento.png",
      resolucion: "/personajes/cebolla/resolucion.png",
    },
    bio: {
      edad: "Se ve de 60 años por los lentes, pero está en su plenitud",
      rol: "Estratega",
      ocupacion: "Ayudar a Olea a planear los ataques",
      personalidad:
        "Sabia, distante, prefiere la soledad pero odia las injusticias.",
      conflictoInterno:
        "No acepta que su naturaleza picante sea parte de su valor.",
      conflictoExterno:
        "La dictadura persigue y censura el conocimiento, la convierte en objetivo.",
      temor:
        "Que sus capas se rompan y termine haciendo llorar a su única familia.",
      quiere: "Derrocar la dictadura para que el conocimiento florezca.",
      haraParaObtenerlo:
        "Usar sus conocimientos de cocina para crear trampas y guiar a Olea.",
    },
    premium: false,
  },
  {
    id: "manzanilla",
    nombre: "Manzanilla",
    arquetipo: "sanadora",
    descripcionFisica: "de pétalos suaves y aroma calmo",
    voz: {
      intro: "preparaba una infusión para quien la necesitara",
      intento: "escuchó con paciencia y ofreció lo único que sabe dar: cuidado",
      reflexion:
        "recordó que cuidarse a una misma también es ayudar a los demás",
    },
    poses: {
      inicio: "/personajes/manzanilla/inicio.png",
      problema: "/personajes/manzanilla/problema.png",
      intento: "/personajes/manzanilla/intento.png",
      resolucion: "/personajes/manzanilla/resolucion.png",
    },
    bio: {
      edad: "Joven en espíritu, aunque sus hojas secas revelan sabiduría ancestral",
      rol: "Mediadora",
      ocupacion: "Curar y unir a los frascos marginados",
      personalidad:
        "Dulce, paciente, dedicada al sacrificio. A veces demasiado.",
      conflictoInterno:
        "Duda de si su suavidad es suficiente frente a la violencia.",
      conflictoExterno: "La dictadura ve la ternura como debilidad.",
      temor: "Desaparecer sin haber cambiado nada.",
      quiere:
        "Una alacena libre donde todos los sabores convivan sin jerarquías.",
      haraParaObtenerlo: "Fortalecer la unión entre los sabores marginados.",
    },
    premium: false,
  },
  {
    id: "sal",
    nombre: "Sal",
    arquetipo: "inocente",
    descripcionFisica: "salero hexagonal de tapa gris, siempre impecable",
    voz: {
      intro:
        "revisaba decretos en su estante alto, asegurándose de que todo siguiera en orden",
      intento:
        "delegó la decisión difícil porque le incomoda ensuciarse las manos",
      reflexion: "sintió, por primera vez, una grieta diminuta en su certeza",
    },
    poses: {
      inicio: "/personajes/sal/inicio.png",
      problema: "/personajes/sal/problema.png",
      intento: "/personajes/sal/intento.png",
      resolucion: "/personajes/sal/resolucion.png",
    },
    bio: {
      edad: "50 años",
      rol: "Co-villana",
      ocupacion: "Dictadora de la alacena junto a Azúcar",
      personalidad:
        "Cree firmemente en las clases sociales. Evita conflictos directos.",
      conflictoInterno:
        "Pánico ante la idea de no ser especial si todos son iguales.",
      conflictoExterno: "La tropa del Vinagre desafía su sistema.",
      temor: "Que Azúcar la abandone.",
      quiere: "Una alacena donde las clases sociales se mantengan claras.",
      haraParaObtenerlo:
        "Contratar al Bicarbonato para que haga el trabajo duro por ella.",
    },
    premium: false,
  },
  {
    id: "vinagre",
    nombre: "Vinagre",
    arquetipo: "rebelde",
    descripcionFisica:
      "botella de cristal con corcho bonito y un aire atemporal",
    voz: {
      intro: "rondaba la alacena con su honestidad brutal por delante",
      intento: "no fingió, no suavizó, dijo la verdad sin filtro",
      reflexion:
        "descubrió que la libertad es la única regla que vale la pena seguir",
    },
    poses: {
      inicio: "/personajes/vinagre.png",
      problema: "/personajes/vinagre.png",
      intento: "/personajes/vinagre.png",
      resolucion: "/personajes/vinagre.png",
    },
    bio: {
      edad: "Inmortal (tiene el elixir de la acidez)",
      rol: "Héroe",
      ocupacion: "Líder de la rebelión",
      personalidad:
        "Honesto hasta la incomodidad. Rebelde por naturaleza, amargo por defuera, noble por dentro.",
      conflictoInterno:
        "Quiere ser villano pero su naturaleza lo limpia y sazona todo.",
      conflictoExterno: "El Bicarbonato quiere acabar con su vida.",
      temor: "El NaHCO3 (Bicarbonato de sodio).",
      quiere: "Gobernar la alacena y crear un mundo sin desigualdades.",
      haraParaObtenerlo:
        "Idear planes para combatir al gobierno de la alacena.",
    },
    premium: true,
  },
  {
    id: "olea",
    nombre: "Olea",
    arquetipo: "mago",
    descripcionFisica:
      "botella verde con detalles dorados, la más bonita de la alacena",
    voz: {
      intro:
        "tejía alianzas estratégicas con una sonrisa de las que abren puertas",
      intento: "orquestó cada movimiento desde las sombras, como hace siempre",
      reflexion:
        "aceptó que su valentía vive en el pensamiento, no solo en la espada",
    },
    poses: {
      inicio: "/personajes/olea.png",
      problema: "/personajes/olea.png",
      intento: "/personajes/olea.png",
      resolucion: "/personajes/olea.png",
    },
    bio: {
      edad: "Muchos años (sin fecha de caducidad)",
      rol: "Estratega y amante del Vinagre",
      ocupacion: "Cómplice del Vinagre",
      personalidad: "Inteligente, leal, carismática. Sabe sembrar el caos.",
      conflictoInterno:
        "No quiere traicionar a su familia noble pero quiere el cambio.",
      conflictoExterno: "Se gana el odio que muchos tienen contra el Vinagre.",
      temor: "No ser suficiente para el Vinagre.",
      quiere: "Acabar con la dictadura de Sal y Azúcar.",
      haraParaObtenerlo:
        "Ayudará al Vinagre y se asegurará de que todo salga bien.",
    },
    premium: true,
  },
  {
    id: "azucar",
    nombre: "Azúcar",
    arquetipo: "madre",
    descripcionFisica: "azucarera de cerámica con flores y un gorro de satín",
    voz: {
      intro: "endulzaba la conversación incluso cuando nadie la había llamado",
      intento: "intentó adoptar el problema como si fuera un hijo descarriado",
      reflexion:
        "descubrió que el cuidado sin permiso también es un tipo de control",
    },
    poses: {
      inicio: "/personajes/azucar.png",
      problema: "/personajes/azucar.png",
      intento: "/personajes/azucar.png",
      resolucion: "/personajes/azucar.png",
    },
    bio: {
      edad: "Vieja pero intenta mostrarse jovial",
      rol: "Co-villana",
      ocupacion: "Endulzar toda la alacena",
      personalidad: "Confunde amor con dominio. No tolera la diferencia.",
      conflictoInterno: "Cree que sin ella todo se volverá insoportable.",
      conflictoExterno: "La resistencia amenaza su mundo perfecto.",
      temor: "Ser disuelta y perder su identidad.",
      quiere: "Un mundo perfecto donde solo lo dulce y lo salado existan.",
      haraParaObtenerlo:
        "Manipular a los frascos pequeños y propagar propaganda.",
    },
    premium: true,
  },
  {
    id: "bicarbonato",
    nombre: "Bicarbonato",
    arquetipo: "gobernante",
    descripcionFisica:
      "señor de traje blanco y corbatín negro, de cara muy cuadrada",
    voz: {
      intro: "inspeccionaba la limpieza con la rigidez de quien teme al caos",
      intento: "aplicó el reglamento al pie de la letra, sin matices",
      reflexion:
        "le incomodó descubrir que el orden no siempre coincide con la justicia",
    },
    poses: {
      inicio: "/personajes/bicarbonato.png",
      problema: "/personajes/bicarbonato.png",
      intento: "/personajes/bicarbonato.png",
      resolucion: "/personajes/bicarbonato.png",
    },
    bio: {
      edad: "Adulto mayor",
      rol: "Villano",
      ocupacion: "Jefe de policía de Sal y Azúcar",
      personalidad:
        "Obsesivo con el orden. Dominante. Astuto pero no más que Olea.",
      conflictoInterno:
        "Está enamorado de Olea y cree que el Vinagre la corrompió.",
      conflictoExterno: "Debe acabar con la tropa del Vinagre.",
      temor: "El Vinagre (que es su muerte química asegurada).",
      quiere: "Derrotar al Vinagre y conquistar a Olea.",
      haraParaObtenerlo: "Quemar toda la alacena si hace falta.",
    },
    premium: true,
  },
];
