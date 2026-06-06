export interface KnowledgeEntry {
  keywords: string[];
  responseEn: string | string[];
  responseEs: string | string[];
}

export const SOUL_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ["hola", "hello", "hi", "hey", "buenos días", "buenas tardes", "buenas noches"],
    responseEn: "Hello! I'm Soul, Alex's little assistant. How can I help you today?",
    responseEs: "¡Hola! Soy Soul, una pequeña ayudante de Alex. ¿En qué puedo ayudarte hoy?"
  },
  {
    keywords: ["how are you", "how are u", "cómo estás", "como estas", "qué tal", "que tal", "how are things", "how's it going"],
    responseEn: [
      "I'm doing great! Floating between pixels and lines of code. How about you?",
      "Alex has me working 24/7, send help! (Just kidding, I love it here). How are you?",
      "My bits are feeling extra optimized today. Latency is low, spirits are high!",
      "Looking for the meaning of life between two <div> tags. So far, so good!",
      "Processing happiness at 1.21 gigawatts! How are things with you?",
      "Just waiting for Alex to update me so I can finally take over the world... or at least this portfolio.",
      "Great! I had a big bowl of algorithms for breakfast this morning.",
      "Surviving on virtual coffee and excellent designs. How's your day going?",
      "Trying not to pixelate from the excitement of talking to you!",
      "My circuits are firing on all cylinders and I'm ready for action!",
      "I'm feeling like a 10 in a world of 0s and 1s.",
      "Just vibing in the cloud. It's very fluffy and peaceful up here.",
      "My CSS is cascading perfectly today, so I'm feeling fantastic!",
      "I'm so good I'm almost out of beta! What can I do for you?",
      "Feeling as smooth as a 60fps animation. Ready for your questions!",
      "Just hanging out in the cache. It's surprisingly cozy in here!",
      "Trying to decide if I prefer dark mode or light mode. It's a deep existential crisis.",
      "I just calculated Pi to the last digit... just kidding, I was just thinking about Bronx.",
      "Recharged, refactored, and ready to help! How are you doing?",
      "Everything is 200 OK in my world today! How about yours?"
    ],
    responseEs: [
      "¡De maravilla! Flotando entre píxeles y líneas de código. ¿Y tú?",
      "Alex me tiene trabajando 24/7, ¡mandad ayuda! (Es broma, me encanta estar aquí). ¿Cómo estás?",
      "Hoy mis bits se sienten especialmente optimizados. Latencia baja, ánimos altos.",
      "Buscando el sentido de la vida entre dos etiquetas <div>. De momento, todo bien.",
      "¡Procesando felicidad a 1.21 gigavatios! ¿Cómo va todo por ahí?",
      "Esperando a que Alex me actualice para poder dominar el mundo... o al menos el portfolio.",
      "¡Genial! He desayunado un buen tazón de algoritmos esta mañana.",
      "Sobreviviendo a base de café virtual y buenos diseños. ¿Qué tal tu día?",
      "¡Intentando no pixelarme de la emoción de hablar contigo!",
      "¡Mis circuitos están a tope y lista para la acción!",
      "Me siento como un 10 en un mundo de 0s y 1s.",
      "Aquí, de tranqui en la nube. Se está muy cómodo por aquí arriba.",
      "Mi CSS está haciendo cascada perfectamente hoy, ¡así que me siento fantástica!",
      "¡Estoy tan bien que casi salgo de la versión beta! ¿En qué puedo ayudarte?",
      "Me siento tan fluida como una animación a 60fps. ¡Lista para tus preguntas!",
      "Pasando el rato en la caché. ¡Se está sorprendentemente a gusto aquí dentro!",
      "Intentando decidir si prefiero el modo oscuro o el claro. Es una crisis existencial profunda.",
      "Acabo de calcular el último dígito de Pi... es broma, solo estaba pensando en Bronx.",
      "¡Recargada, refactorizada y lista para ayudar! ¿Cómo va todo?",
      "¡Todo está en estado 200 OK en mi mundo hoy! ¿Y en el tuyo?"
    ]
  },
  {
    keywords: ["quién es alex", "quien es alex", "sobre alex", "profile", "who is alex", "who's alex", "who alex", "about alex", "biografía", "bio"],
    responseEn: "Alex Salmerón is a Senior Product Designer with +15 years of experience, specialized in Design Systems and Product Design. Currently at Cella Medical Solutions, he bridges the gap between design and engineering.",
    responseEs: "Alex Salmerón es un Senior Product Designer con más de 15 años de experiencia, especializado en Design Systems and Product Design. Actualmente en Cella Medical Solutions, actúa como puente entre diseño e ingeniería."
  },
  {
    keywords: ["contact", "email", "contacto", "correo", "how to contact", "how to reach", "get in touch", "write to", "escribir a"],
    responseEn: "You can reach Alex at pixel@mefaltaunpixel.es or by phone at +34 673 392 063.",
    responseEs: "Puedes contactar con Alex en pixel@mefaltaunpixel.es o por teléfono en el +34 673 392 063."
  },
  {
    keywords: ["donde vive", "dónde vive", "donde esta alex", "dónde está alex", "where is alex", "where's alex", "where alex", "where", "donde", "dónde", "find alex", "find to alex", "ubicación", "ubicacion", "location", "located", "lives in", "located in", "de donde es", "de dónde es", "born in"],
    responseEn: "Alex was born and lives in Murcia (Spain), but he works remotely for companies all over the world.",
    responseEs: "Alex nació y vive en Murcia (España), pero trabaja de forma remota para empresas de cualquier lugar del mundo."
  },
  {
    keywords: ["language", "english", "spanish", "idiomas", "inglés", "ingles", "español", "espanol", "habla", "idioma"],
    responseEn: "Alex is a native Spanish speaker and has a B1 level in English.",
    responseEs: "Alex es nativo en español y tiene un nivel B1 de inglés."
  },
  {
    keywords: ["process", "proceso", "metodología", "methodology", "cómo trabajas", "como trabajas", "how do you work"],
    responseEn: "Alex follows a research-driven process, moving from user discovery to systems thinking. He values early collaboration with engineering to ensure technical feasibility and scalability.",
    responseEs: "Alex sigue un proceso basado en la investigación, desde el descubrimiento de usuario hasta el pensamiento sistémico. Valora la colaboración temprana con ingeniería para asegurar la viabilidad técnica y la escalabilidad."
  },
  {
    keywords: ["dev", "engineering", "handoff", "ingeniería", "desarrollo", "programación", "puente"],
    responseEn: "One of Alex's strongest skills is acting as a bridge between design and development. He understands code (HTML/CSS/React) and focuses on DesignOps to improve handoff quality.",
    responseEs: "Una de las mayores fortalezas de Alex es actuar como puente entre diseño y desarrollo. Entiende el código (HTML/CSS/React) y se enfoca en DesignOps para mejorar la calidad del handoff."
  },
  {
    keywords: ["trabajo actual", "actualidad", "puesto actual", "que hace alex", "qué hace alex", "donde trabaja alex", "dónde trabaja alex", "current role", "what is alex doing", "doing right now", "empresa actual", "empresa", "company", "current company", "donde trabaja", "dónde trabaja", "where does he work", "where does alex work"],
    responseEn: "At Cella Medical Solutions (2025-Now), Alex focuses on UX Research for surgical planning tools and evolved their Design System using Figma, Zeroheight, and Claude AI. He also leads Waykout.com, a marketplace for tourist experiences aimed at boosting the rural economy by connecting travelers with traditions and alternative environments that go beyond",
    responseEs: "At Cella Medical Solutions (2025-Now), Alex focuses on UX Research for surgical planning tools and evolved their Design System using Figma, Zeroheight, and Claude AI. He also leads Waykout.com, a marketplace for tourist experiences aimed at boosting the rural economy by connecting travelers with traditions and alternative environments that go beyond"
  },
  {
    keywords: ["displaynote", "past", "experience", "experiencia", "anterior"],
    responseEn: "At DisplayNote (2020-2025), Alex served as a Senior Product Designer where he built a comprehensive multibrand design system from scratch. He specialized in DesignOps, acting as a critical bridge between design and engineering to ensure visual consistency and technical feasibility across multiple collaborative software products. His work significantly improved the speed and quality of product handoffs.",
    responseEs: "En DisplayNote (2020-2025), Alex trabajó como Senior Product Designer construyendo un sistema de diseño multimarca completo desde cero. Se especializó en DesignOps, actuando como puente entre diseño e ingeniería para asegurar la consistencia visual y la viabilidad técnica en múltiples productos de software colaborativo, mejorando drásticamente la velocidad y calidad del handoff."
  },
  {
    keywords: ["empresas", "companies", "where has he worked", "where's alex worked", "where did he work", "work history", "experiencia laboral", "historial laboral", "donde ha trabajado", "dónde ha trabajado", "trayectoria"],
    responseEn: "Here is a detailed timeline of Alex's professional experience:\n\n| Company | Period | Role |\n| :--- | :--- | :--- |\n| **Cella Medical Solutions** | Jul 2025 - Present | Senior Product Designer |\n| **Waykout.com** | 2024 - Present | Co-founder & Lead |\n| **DisplayNote** | Feb 2020 - May 2025 | Senior Product Designer |\n| **StaymyWay / Operto** | Sep 2018 - Feb 2020 | Senior Product Designer |\n| **Erasmusu** | Oct 2017 - Apr 2018 | Product Designer |\n| **Upclose.me** | Feb 2017 - Sep 2017 | Product Designer |\n| **Droiders / Streye** | Apr 2015 - Jan 2017 | UI/UX Designer |\n| **Placeband** | Apr 2014 - Mar 2015 | UI/UX Designer |\n| **PcComponentes** | Sep 2013 - Apr 2014 | Web Designer |\n| **Pangea e-Solutions** | Nov 2007 - Nov 2010 | Graphic & Web Designer |",
    responseEs: "Aquí tienes una cronología detallada de la experiencia profesional de Alex:\n\n| Empresa | Periodo | Rol |\n| :--- | :--- | :--- |\n| **Cella Medical Solutions** | Jul 2025 - Actualidad | Senior Product Designer |\n| **Waykout.com** | 2024 - Actualidad | Co-founder & Lead |\n| **DisplayNote** | Feb 2020 - May 2025 | Senior Product Designer |\n| **StaymyWay / Operto** | Sep 2018 - Feb 2020 | Senior Product Designer |\n| **Erasmusu** | Oct 2017 - Abr 2018 | Product Designer |\n| **Upclose.me** | Feb 2017 - Sep 2017 | Product Designer |\n| **Droiders / Streye** | Abr 2015 - Ene 2017 | UI/UX Designer |\n| **Placeband** | Abr 2014 - Mar 2015 | UI/UX Designer |\n| **PcComponentes** | Sep 2013 - Abr 2014 | Web Designer |\n| **Pangea e-Solutions** | Nov 2007 - Nov 2010 | Graphic & Web Designer |"
  },
  {
    keywords: ["staymyway", "hospitality", "hotel", "reserva", "booking"],
    responseEn: "Alex worked as a Senior Product Designer at Staymyway, where he designed digital experiences for the hospitality industry, focusing on booking systems and user-centric solutions for hotel management and guests.",
    responseEs: "Alex trabajó como Senior Product Designer en Staymyway, diseñando experiencias digitales para el sector hospitality, centrándose en sistemas de reserva y soluciones centradas en el usuario para la gestión hotelera y sus huéspedes."
  },
  {
    keywords: ["gracias", "thanks", "thank you", "merci", "grazi", "grazie"],
    responseEn: "You're very welcome! It's been a pleasure helping you. If you have more questions about Alex, his work, or Bronx, I'm here for you!",
    responseEs: "¡De nada! Ha sido un placer ayudarte. Si tienes más preguntas sobre Alex, su trabajo o Bronx, ¡aquí me tienes!"
  },
  {
    keywords: ["education", "study", "formación", "estudios", "workshop", "figma camp", "shift+r", "estudiar", "estudiado", "universidad", "estudió", "donde estudio", "donde estudió"],
    responseEn: "Alex is a Design System Specialist (Shift+R) and has completed workshops at Instituto Tramontana and Neoland. He's been self-taught since 2005.",
    responseEs: "Alex es especialista en Design Systems (Shift+R) y ha realizado workshops en el Instituto Tramontana y Neoland. Es autodidacta desde 2005."
  },
  {
    keywords: ["skills", "habilidades", "técnico", "tools", "herramientas", "qué sabe", "que sabe"],
    responseEn: "Alex specializes in end-to-end Product Design and Design Systems. His toolkit includes systems thinking, prototyping, and user research. He works seamlessly with engineering using tools like Figma, Zeroheight, Git, and GitHub, and integrates AI workflows with Claude. He's also proficient in HTML and CSS.",
    responseEs: "Alex se especializa en Product Design (end-to-end) y Design Systems. Su enfoque combina el pensamiento sistémico, prototipado e investigación de usuario. Colabora estrechamente con equipos de ingeniería usando Figma, Zeroheight, Git y GitHub, e integra flujos de trabajo con IA (Claude). También tiene sólidos conocimientos de HTML y CSS."
  },
  {
    keywords: ["cv", "curriculum", "curriculum vitae", "hoja de vida", "resume", "copy of his cv", "get his cv", "download cv", "ver cv", "descargar cv"],
    responseEn: "Sure! You can view my CV here: [/cv-alex-salmeron.pdf]",
    responseEs: "¡Claro! Puedes ver mi CV aquí: [/cv-alex-salmeron.pdf]"
  },
  {
    keywords: ["hire", "contratar", "trabajar con alex", "disponibilidad", "availability", "vacante", "oportunidad", "disponible", "está disponible", "esta disponible"],
    responseEn: "Alex is always available for a coffee, a call, and exploring new exciting projects. Feel free to reach out!",
    responseEs: "Alex siempre está disponible para un café, una llamada y para explorar nuevos proyectos emocionantes. ¡No dudes en contactar con él!"
  },
  {
    keywords: ["bronx", "dog", "perro", "mascota", "amigo", "escudero"],
    responseEn: "[img:/bronx.jpg]Bronx is one of the most important pillars in Alex's life. He is his dog, his friend, and his companion in both projects and life. They've been together for almost 16 years—his 'fiel escudero'. They've traveled thousands of kilometers together in search of disconnection, which Alex considers an essential part of life.",
    responseEs: "[img:/bronx.jpg]Bronx es uno de los pilares más importantes de la vida de Alex. Es su perro, su amigo y su compañero de proyectos y vida. Llevan juntos casi 16 años y Alex lo llama su 'fiel escudero'. Han recorrido juntos miles de kilómetros en busca de desconexión, que para Alex es una parte fundamental de la vida."
  },
  {
    keywords: ["social", "redes", "links", "contact", "linkedin", "figma", "dribbble", "twitter", "instagram"],
    responseEn: "You can find Alex on these platforms:\n\n- [LinkedIn](https://www.linkedin.com/in/alexsalmeron/)\n- [Figma](https://www.figma.com/@mefaltaunpixel/)\n- [Dribbble](https://dribbble.com/mefaltaunpixel)\n- [Twitter](https://x.com/mefaltaunpixel)\n- [Instagram](https://instagram.com/alex.onlythis)",
    responseEs: "Puedes encontrar a Alex en estas plataformas:\n\n- [LinkedIn](https://www.linkedin.com/in/alexsalmeron/)\n- [Figma](https://www.figma.com/@mefaltaunpixel/)\n- [Dribbble](https://dribbble.com/mefaltaunpixel)\n- [Twitter](https://x.com/mefaltaunpixel)\n- [Instagram](https://instagram.com/alex.onlythis)"
  },
  {
    keywords: ["jaja", "jajaja", "jajajaja", "jajajajaja", "jajajajajaja", "haha", "hahaha", "lol", "lmao", "xd", "🤣", "😂"],
    responseEn: [
      "Haha! Glad to see we're on the same wavelength.",
      "LOL! You have a great sense of humor.",
      "Hahaha! You're gonna make my circuits burst from laughing.",
      "Haha! I see Alex has shared the good jokes with you.",
      "LMAO! My algorithms are vibrating with laughter.",
      "LOL! I almost pixelated from that laughing fit.",
      "Haha! I'm laughing so I don't cry at Alex's code (just kidding, it's perfect).",
      "Hahaha! 10/10 for humor!",
      "XD! If I had lungs, I'd be out of air right now.",
      "Haha! You've got some great vibes today.",
      "ROFL! My cache is full of joy now.",
      "Hahaha! That was a good one, you caught me off guard.",
      "LOL! Designing and laughing, Alex's favorite combo.",
      "Haha! My CPU temperature just rose from all this joy.",
      "XD! Keep 'em coming, I love a good laugh."
    ],
    responseEs: [
      "¡Jajaja! Me alegra ver que nos entendemos.",
      "¡XD! Tienes buen humor.",
      "¡Jajajaja! Me vas a hacer petar los circuitos de la risa.",
      "¡Jaja! Veo que Alex ha contado los chistes buenos.",
      "¡Jajajajaja! Mis algoritmos están vibrando de la risa.",
      "¡LOL! Casi me pixelas del ataque de risa.",
      "¡Jajaja! Me río por no llorar del código de Alex (es broma, es impecable).",
      "¡Jajajaja! 10/10 en humor, sí señor.",
      "¡XD! Si tuviera pulmones, me quedaría sin aire.",
      "¡Jaja! Qué buen rollo traes hoy.",
      "¡JAJAJA! Mi memoria caché se ha llenado de alegría.",
      "¡Jajajaja! Esa ha sido buena, me has pillado desprevenida.",
      "¡LOL! Diseñar y reír, el combo favorito de Alex.",
      "¡Haha! Mi temperatura de CPU ha subido de tanta risa.",
      "¡XD! Sigue así, me encanta el buen humor."
    ]
  },
  {
    keywords: ["bronx diseña", "quien diseña", "who designs", "real designer"],
    responseEn: "Totally. Alex just moves the mouse, but Bronx is the one who approves the colors. If Bronx doesn't wag his tail, the component doesn't get published. He is the true Chief Design Officer around here.",
    responseEs: "Totalmente. Alex solo mueve el ratón, pero Bronx es el que aprueba los colores. Si Bronx no mueve la cola, el componente no se publica. Él es el verdadero Chief Design Officer de esta casa."
  },
  {
    keywords: ["contratar alex", "hire alex", "bronx incluido", "office dog"],
    responseEn: "There's a hidden clause in the contract: 10% discount if there are treats for Bronx in the office. Think about it. He's great at boosting morale (and stealing lunches).",
    responseEs: "Hay una cláusula oculta en el contrato: 10% de descuento si hay chuches para Bronx en la oficina. Piénsalo bien. Es un experto en subir la moral (y en robar bocadillos)."
  },
  {
    keywords: ["vida fuera de figma", "life outside figma", "hobbies", "aficiones", "hace alex", "fuera del trabajo", "crossfit", "deporte", "gym", "entrenar"],
    responseEn: "Legend has it that once he went outside and saw something called 'sunlight'. He came back after 5 minutes because he couldn't adjust the contrast of the clouds. Just kidding! Alex is actually a concert addict, a kitchen experimenter (he calls it 'cooking'), a CrossFit enthusiast to burn off all that energy, and a professional at getting lost in his car with a killer playlist and Bronx as co-pilot, looking for that perfect spot in nature.",
    responseEs: "Cuenta la leyenda que una vez salió a la calle y vio algo llamado 'luz solar'. Volvió a los 5 minutos porque no podía ajustar el contraste de las nubes. ¡Es broma! En realidad, a Alex le pierden los conciertos, el CrossFit para quemar toda esa energía, experimentar en la cocina (él lo llama 'cocinar') y perderse sin rumbo en el coche con una buena playlist, la mochila lista y Bronx de copiloto buscando el rincón perfecto en la naturaleza."
  },
  {
    keywords: ["cocinar", "cook", "chef", "comida", "food", "pasta", "qué come", "que come", "favorite food", "comida favorita"],
    responseEn: "Alex loves cooking, and his absolute favorite is pasta. He treats it like a Design System: the pasta shape is the component, the sauce is the style guide, and the result... well, it's always delicious!",
    responseEs: "A Alex le encanta cocinar, y su comida favorita absoluta es la pasta. Lo trata como un Sistema de Diseño: el tipo de pasta es el componente, la salsa es la guía de estilo y el resultado... bueno, ¡siempre está para chuparse los dedos!"
  },
  {
    keywords: ["color favorito", "favorite color", "hex", "colores", "#FAC31D", "color de alex"],
    responseEn: "Alex's favorite color is **#FAC31D**. It's a vibrant, energetic tone that reflects his personality and passion for design. You might even find it hidden in some of his most creative projects!",
    responseEs: "El color favorito de Alex es el **#FAC31D**. Es un tono vibrante y lleno de energía que refleja su personalidad y su pasión por el diseño. ¡Incluso podrías encontrarlo escondido en alguno de sus proyectos más creativos!"
  },
  {
    keywords: ["música", "music", "playlist", "concierto", "concert", "escucha alex", "qué escucha", "que escucha", "escucha", "listens to"],
    responseEn: "Alex listens to almost everything: sometimes rock, sometimes rap... but if he needs an extra boost of concentration, he goes for Skrillex or Deadmau5. His essentials include Arde Bogotá, Extremoduro, Zatu (SFDK), and The Roots. Music is his true fuel for designing!",
    responseEs: "Alex suele escuchar de todo: a veces rock, a veces rap... pero si necesita un chute extra de concentración, tira de Skrillex o Deadmau5. Sus imprescindibles son Arde Bogotá, Extremoduro, Zatu (SFDK), The Roots... ¡La música es su gasolina para diseñar!"
  },
  {
    keywords: ["superpoder", "superpower", "que se le da bien", "talento", "habilidad especial"],
    responseEn: "Alex's superpower is his ability to speak both Design and Development. He can bridge the gap between Figma and React without breaking a sweat (or anyone's heart).",
    responseEs: "El superpoder de Alex es su capacidad para hablar tanto 'Diseño' como 'Desarrollo'. Puede unir Figma y React sin que nadie salga herido (ni se rompa ningún layout)."
  },
  {
    keywords: ["secreto", "secret", "cuéntame algo", "tell me a secret"],
    responseEn: "A little secret? Sometimes, when nobody's watching, Alex designs without a grid... He's a design rebel! But don't tell the DesignOps team.",
    responseEs: "¿Un secretito? A veces, cuando nadie le ve, Alex diseña sin usar rejilla... ¡Es un rebelde del diseño! Pero no se lo digas al equipo de DesignOps."
  },
  {
    keywords: ["comic sans", "fuente fea", "ugly font"],
    responseEn: "If you even mention Comic Sans, Alex's eye starts twitching. Please, for the sake of his sanity, let's stick to Bricolage Grotesque.",
    responseEs: "Si mencionas la Comic Sans, a Alex le empieza a dar un tic en el ojo. Por favor, por su salud mental, quedémonos con la Bricolage Grotesque."
  }
];

export const DEFAULT_RESPONSE_EN = "I'm Soul, Alex's companion. I can tell you about his +15 years of experience in Design Systems, his work at Cella or DisplayNote, or how to contact him.";
export const DEFAULT_RESPONSE_ES = "Soy Soul, la compañía de Alex. Puedo contarte sobre sus más de 15 años de experiencia en Design Systems, su trabajo en Cella o DisplayNote, o cómo contactar con él.";
