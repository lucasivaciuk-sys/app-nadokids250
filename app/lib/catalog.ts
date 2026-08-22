export { trainings, type Training } from "./training-library";

type LegacyTraining = {
  id: string;
  title: string;
  category: string;
  age: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  duration: number;
  objective: string;
  materials: string[];
  steps: string[];
  attention: string;
  image: number;
};

type BaseDrill = Omit<LegacyTraining, "id" | "title" | "level" | "duration" | "image"> & {
  name: string;
};

const bases: BaseDrill[] = [
  { name: "Bolhas coloridas", category: "Respiração", age: "3–5 anos", objective: "Controlar a expiração dentro da água sem prender o ar.", materials: ["Argolas coloridas", "Borda rasa"], steps: ["Apresente a atividade fora da água e demonstre a inspiração pela boca.", "Na borda rasa, peça que a criança molhe apenas o queixo e solte o ar.", "Progrida para boca e nariz dentro da água, formando bolhas contínuas.", "Associe cada cor de argola a uma duração de expiração.", "Finalize com duas tentativas livres e registre o nível de conforto."], attention: "Nunca force a imersão do rosto; avance somente com aceitação da criança." },
  { name: "Estrela flutuante", category: "Flutuação", age: "4–6 anos", objective: "Perceber sustentação corporal e relaxar em decúbito dorsal.", materials: ["Espaguete", "Prancha pequena"], steps: ["Mostre a posição de estrela fora da água, com braços e pernas afastados.", "Apoie nuca e região lombar enquanto a criança olha para cima.", "Peça inspiração tranquila e quadril próximo à superfície.", "Retire primeiro o apoio lombar e depois reduza o apoio da nuca.", "Conclua com flutuação de três a cinco segundos e retorno assistido."], attention: "Mantenha contato próximo e evite retirar os dois apoios antes de a criança relaxar." },
  { name: "Passeio com prancha", category: "Propulsão", age: "5–7 anos", objective: "Desenvolver batimento alternado de pernas com alinhamento corporal.", materials: ["Prancha", "Cones"], steps: ["Ajuste as mãos na parte superior da prancha e mantenha braços estendidos.", "Comece com pernadas curtas sentado na borda para explicar o movimento.", "Na água, peça tornozelos soltos e pernas próximas à superfície.", "Percorra uma distância curta até o cone mantendo ritmo constante.", "Volte devagar e dê uma correção objetiva antes da próxima repetição."], attention: "Evite distâncias longas que façam a criança perder a técnica ou ficar exausta." },
  { name: "Caça às cores", category: "Adaptação", age: "3–6 anos", objective: "Estimular deslocamento, orientação e contato voluntário com a água.", materials: ["Brinquedos coloridos", "Cestos"], steps: ["Espalhe objetos flutuantes em uma área rasa e segura.", "Defina uma cor por rodada e mostre o cesto correspondente.", "A criança se desloca andando ou com apoio para buscar um objeto.", "Ao retornar, incentive sopro na água antes de guardar a peça.", "Repita com nova cor e aumente gradualmente a distância."], attention: "Controle a quantidade de crianças por rodada para evitar colisões." },
  { name: "Túnel de espaguetes", category: "Imersão", age: "4–7 anos", objective: "Ampliar confiança para passar sob obstáculos com controle respiratório.", materials: ["Espaguetes", "Argolas"], steps: ["Monte um túnel largo, mantendo parte do rosto fora da água na primeira volta.", "Demonstre como inspirar antes da entrada e soltar bolhas durante a passagem.", "Apoie a criança pelo tronco na primeira tentativa.", "Reduza a altura do túnel apenas quando houver confiança.", "Finalize permitindo que a criança escolha o nível de imersão."], attention: "O obstáculo deve ser flexível e nunca prender ou encobrir a criança." },
  { name: "Foguete na parede", category: "Deslize", age: "5–8 anos", objective: "Aprender impulsão na parede e posição hidrodinâmica.", materials: ["Marcação de distância"], steps: ["Ensine a posição de flecha fora da água: mãos unidas e cabeça entre os braços.", "Posicione os dois pés na parede, joelhos flexionados e corpo equilibrado.", "Dê o comando para inspirar, colocar o rosto na água e impulsionar.", "Peça corpo alongado e imóvel durante o deslize.", "Marque o ponto alcançado sem transformar a tarefa em competição obrigatória."], attention: "Garanta área livre à frente e distância suficiente entre as crianças." },
  { name: "Ilhas flutuantes", category: "Equilíbrio", age: "4–7 anos", objective: "Desenvolver controle postural e transferências de apoio.", materials: ["Tapetes flutuantes", "Espaguetes"], steps: ["Organize ilhas próximas da borda e explique o percurso.", "A criança passa de um apoio para outro com ajuda do professor.", "Inclua pausa de equilíbrio antes de cada deslocamento.", "Acrescente um objeto leve para transportar quando houver domínio.", "Termine com retorno pela borda e reorganização dos materiais."], attention: "Mantenha os tapetes estabilizados e apenas uma criança por ilha." },
  { name: "Circuito do golfinho", category: "Coordenação", age: "6–9 anos", objective: "Combinar deslocamento, imersão, salto e orientação espacial.", materials: ["Argolas", "Pranchas", "Cones"], steps: ["Apresente cada estação separadamente antes de iniciar o circuito.", "Estação 1: deslize até a prancha mantendo posição de flecha.", "Estação 2: passe por uma argola soltando bolhas.", "Estação 3: contorne o cone com pernada controlada.", "Finalize com salto seguro e saída organizada pela escada."], attention: "Libere a próxima criança somente quando a estação seguinte estiver livre." },
  { name: "Pega-argolas", category: "Mergulho", age: "5–8 anos", objective: "Treinar submersão voluntária, orientação visual e retorno à superfície.", materials: ["Argolas submersíveis"], steps: ["Comece com argolas em profundidade que permita apoio dos pés.", "Demonstre flexão de joelhos, inspiração e entrada das mãos primeiro.", "A criança recolhe uma argola e retorna soltando o ar.", "Aumente a distância horizontal antes de aumentar a profundidade.", "Encerre com escolha livre de cor e feedback sobre controle respiratório."], attention: "Não use disputa por tempo e mantenha observação individual durante toda a submersão." },
  { name: "Pernada de costas", category: "Nado costas", age: "7–10 anos", objective: "Executar pernada alternada dorsal com quadril elevado.", materials: ["Prancha opcional", "Marcação de raia"], steps: ["Pratique o movimento de pernas sentado, destacando pés relaxados.", "Na água, apoie a cabeça e peça olhar fixo para cima.", "Inicie a pernada com movimento curto a partir do quadril.", "Percorra dez metros mantendo joelhos abaixo da superfície.", "Repita com braços ao lado do corpo ou em posição de flecha."], attention: "Observe a proximidade da parede e sinalize a chegada para evitar impactos." },
  { name: "Braçada do crawl", category: "Nado crawl", age: "7–11 anos", objective: "Organizar entrada, apoio, puxada e recuperação dos braços.", materials: ["Prancha", "Pull buoy opcional"], steps: ["Demonstre a trajetória do braço fora da água em ritmo lento.", "Faça o exercício unilateral com uma mão apoiada na prancha.", "Peça entrada da mão alinhada ao ombro e cotovelo alto na recuperação.", "Alterne os braços a cada seis pernadas.", "Finalize com crawl completo em distância curta."], attention: "Corrija um elemento por vez para não sobrecarregar a criança com instruções." },
  { name: "Respiração lateral", category: "Nado crawl", age: "8–12 anos", objective: "Sincronizar expiração aquática e inspiração lateral no crawl.", materials: ["Prancha"], steps: ["Na borda, ensine a girar a cabeça mantendo uma orelha na água.", "Faça pernada com prancha, expirando continuamente com o rosto submerso.", "A cada três segundos, gire para inspirar sem levantar a cabeça.", "Passe ao exercício com um braço estendido e outro junto ao corpo.", "Integre ao crawl com respiração a cada três braçadas."], attention: "Evite apneia prolongada e interrompa se houver tosse ou desconforto." },
  { name: "Estafeta aquática", category: "Dinâmica em grupo", age: "7–11 anos", objective: "Trabalhar cooperação, deslocamento e respeito ao turno.", materials: ["Bolas leves", "Cones"], steps: ["Divida equipes pequenas e explique que a qualidade vale mais que a velocidade.", "Cada criança transporta uma bola até o cone usando o deslocamento proposto.", "No retorno, entrega a bola diretamente ao próximo colega.", "Alterne entre pernada, caminhada e deslocamento dorsal.", "Finalize reconhecendo organização e cooperação do grupo."], attention: "Evite competição excessiva e adapte a distância ao participante com menor domínio." },
  { name: "Nado do cachorrinho", category: "Sobrevivência aquática", age: "5–8 anos", objective: "Promover deslocamento autônomo curto com cabeça confortável.", materials: ["Espaguete opcional"], steps: ["Demonstre movimentos curtos das mãos abaixo da superfície.", "A criança inicia com apoio de espaguete sob o peito.", "Acrescente pernada contínua e retire gradualmente o apoio.", "Percorra dois a quatro metros em direção ao professor.", "Treine o retorno seguro para a borda e a pegada com as duas mãos."], attention: "Esta atividade não substitui supervisão nem representa habilidade de salvamento." },
  { name: "Entrada sentada segura", category: "Segurança", age: "3–6 anos", objective: "Aprender entrada controlada e retorno imediato à borda.", materials: ["Borda antiderrapante"], steps: ["Sente a criança na borda com mãos apoiadas ao lado do corpo.", "Peça que gire o corpo e coloque primeiro os pés na água.", "Auxilie o deslizamento mantendo o tronco próximo da borda.", "Após entrar, a criança gira e segura a borda com as duas mãos.", "Repita até realizar a sequência sem pressa."], attention: "A entrada deve ocorrer apenas com autorização e presença imediata do professor." },
  { name: "Salto do marinheiro", category: "Saltos", age: "6–10 anos", objective: "Executar salto em pé com alinhamento e retorno orientado.", materials: ["Alvo flutuante"], steps: ["Verifique profundidade e área livre antes de posicionar a criança.", "Demonstre pés paralelos, braços à frente e olhar para o alvo.", "No comando, a criança salta para frente sem correr.", "Após emergir, orienta-se e desloca-se até a borda indicada.", "Progrida variando o alvo, nunca a segurança da entrada."], attention: "Só aplique em profundidade compatível com a habilidade e regras da piscina." },
  { name: "Revezamento de pranchas", category: "Propulsão", age: "7–11 anos", objective: "Manter ritmo de pernada e controle de direção.", materials: ["Pranchas", "Cones"], steps: ["Forme duplas com níveis semelhantes e delimite um percurso curto.", "O primeiro aluno faz pernada até o cone com braços estendidos.", "Contorna sem subir sobre a prancha e retorna pelo lado definido.", "Entrega a prancha ao colega com contato visual.", "Repita priorizando regularidade e postura."], attention: "Use raias separadas ou intervalos para impedir cruzamento de trajetórias." },
  { name: "Tesouro submerso", category: "Imersão", age: "6–9 anos", objective: "Associar busca visual, mergulho e classificação de objetos.", materials: ["Objetos submersíveis", "Cestos"], steps: ["Disponha objetos em diferentes distâncias, todos visíveis.", "Defina uma categoria de busca, como cor ou formato.", "A criança inspira, submerge e pega apenas um objeto.", "Retorna à superfície, desloca-se ao cesto e descreve o item.", "Ajuste profundidade e distância conforme a segurança demonstrada."], attention: "Conte os objetos antes e depois e mantenha o fundo da área totalmente visível." },
  { name: "Crawl com contagem", category: "Nado crawl", age: "9–12 anos", objective: "Melhorar ritmo, eficiência e consciência da frequência de braçadas.", materials: ["Marcadores de distância"], steps: ["Faça uma passagem leve para observar a contagem habitual.", "Repita mantendo a mesma distância com braçadas alongadas.", "Compare as contagens sem exigir redução a qualquer custo.", "Inclua respiração bilateral em ritmo confortável.", "Registre a melhor combinação entre técnica e esforço percebido."], attention: "Não incentive retenção de ar ou redução artificial que prejudique o alinhamento." },
  { name: "Volta à calma guiada", category: "Volta à calma", age: "6–12 anos", objective: "Reduzir intensidade e encerrar a aula com percepção corporal.", materials: ["Espaguetes"], steps: ["Distribua espaguetes e organize espaço sem contato entre alunos.", "Conduza deslocamento lento com respiração confortável.", "Faça flutuação dorsal assistida por vinte a trinta segundos.", "Peça que cada criança identifique o exercício mais fácil e o mais desafiador.", "Finalize com saída segura e conferência do grupo."], attention: "A volta à calma continua exigindo supervisão ativa e controle do grupo." },
  { name: "Aquecimento dos animais", category: "Aquecimento", age: "3–7 anos", objective: "Aquecer articulações e apresentar movimentos da aula de forma lúdica.", materials: ["Cartões de animais"], steps: ["Mostre um cartão e associe o animal a um movimento simples.", "Faça caminhada do caranguejo em área rasa.", "Alterne com saltos pequenos do sapo e braços do pássaro.", "Inclua sopro de baleia com rosto próximo à água.", "Retome os movimentos que serão usados na parte principal."], attention: "Evite saltos em piso escorregadio e controle a intensidade do aquecimento." },
  { name: "Cambalhota assistida", category: "Coordenação", age: "8–12 anos", objective: "Desenvolver rotação corporal com expiração contínua.", materials: ["Espaguete", "Argola grande"], steps: ["Explique a rotação fora da água e destaque que o ar deve sair pelo nariz.", "Na água rasa, a criança segura o espaguete e aproxima o queixo do peito.", "Auxilie a rotação pelo quadril sem puxar a cabeça.", "Passe para a cambalhota dentro de uma argola grande.", "Finalize com rotação autônoma somente se houver domínio."], attention: "Interrompa em caso de tontura e dê intervalo completo entre tentativas." },
  { name: "Virada na parede", category: "Técnica", age: "9–12 anos", objective: "Aprender aproximação, toque, giro e impulso simples na parede.", materials: ["Marcação a 2 metros"], steps: ["Treine a sequência parado: tocar, flexionar joelhos, girar e apoiar pés.", "Aproxime em velocidade baixa a partir da marcação.", "Toque a parede com controle e organize o corpo lateralmente.", "Apoie os pés e impulsione em posição de flecha.", "Acrescente velocidade apenas após três execuções consistentes."], attention: "Mantenha um aluno por vez na zona da parede." },
  { name: "Resgate do brinquedo", category: "Segurança", age: "6–10 anos", objective: "Praticar alcance seguro sem entrar na água para ajudar outra pessoa.", materials: ["Espaguete", "Brinquedo flutuante"], steps: ["Explique que a criança não deve entrar na água para realizar um resgate.", "Posicione-a deitada, com base estável e pernas afastadas.", "Entregue um espaguete para alcançar o brinquedo flutuante.", "Peça que puxe devagar mantendo o corpo apoiado.", "Reforce chamar um adulto e buscar equipamento adequado."], attention: "Use apenas simulação com objeto; nunca coloque outra criança como vítima." },
  { name: "Mini medley", category: "Sequência completa", age: "9–12 anos", objective: "Alternar habilidades e organizar transições entre estilos conhecidos.", materials: ["Cones", "Prancha"], steps: ["Defina quatro trechos curtos e revise a técnica de cada um.", "Trecho 1: deslize e pernada de crawl.", "Trecho 2: deslocamento dorsal com pernada de costas.", "Trecho 3: braçada de crawl com respiração confortável.", "Trecho 4: volta à calma até a borda."], attention: "Inclua somente estilos já ensinados e reduza a distância ao primeiro sinal de fadiga." },
];

const variations = [
  { label: "Fundamentos", level: "Iniciante" as const, extra: "Realize uma rodada de reconhecimento com apoio direto do professor.", duration: 25 },
  { label: "Lúdico", level: "Iniciante" as const, extra: "Use uma pequena história para ligar cada etapa sem alterar o objetivo técnico.", duration: 30 },
  { label: "Em duplas", level: "Iniciante" as const, extra: "Organize duplas para observação e alternância, sem contato de empurrar ou puxar.", duration: 30 },
  { label: "Circuito", level: "Intermediário" as const, extra: "Inclua a tarefa como uma estação e controle o intervalo entre participantes.", duration: 35 },
  { label: "Progressão", level: "Intermediário" as const, extra: "Aumente apenas uma variável por rodada: distância, autonomia ou precisão.", duration: 35 },
  { label: "Técnica", level: "Intermediário" as const, extra: "Filme ou observe uma execução e dê somente uma correção técnica por repetição.", duration: 40 },
  { label: "Desafio controlado", level: "Intermediário" as const, extra: "Defina uma meta individual alcançável, sem comparação obrigatória entre alunos.", duration: 40 },
  { label: "Coordenação", level: "Avançado" as const, extra: "Combine a habilidade com mudança de direção ou resposta a um sinal visual.", duration: 45 },
  { label: "Autonomia", level: "Avançado" as const, extra: "Permita escolha entre duas progressões seguras e peça justificativa ao aluno.", duration: 45 },
  { label: "Revisão", level: "Avançado" as const, extra: "Finalize com autoavaliação simples: consegui, quase consegui ou preciso de ajuda.", duration: 50 },
];

const legacyTrainings: LegacyTraining[] = bases.flatMap((base, baseIndex) =>
  variations.map((variation, variationIndex) => ({
    id: `NK-${String(baseIndex * 10 + variationIndex + 1).padStart(3, "0")}`,
    title: `${base.name} — ${variation.label}`,
    category: base.category,
    age: base.age,
    level: variation.level,
    duration: variation.duration,
    objective: base.objective,
    materials: base.materials,
    steps: [...base.steps, variation.extra],
    attention: base.attention,
    image: ((baseIndex + variationIndex) % 6) + 1,
  }))
);

export const videoLessons = [
  { id: "2BG5Wtm5Uws", title: "Aula inteira de natação infantil — 3 e 4 anos", focus: "Aula completa", training: "Caça às cores" },
  { id: "wCnVGmUUe5g", title: "Aula inteira para iniciantes — 5 e 6 anos", focus: "Aula completa", training: "Aquecimento dos animais" },
  { id: "dxqse7S7CSU", title: "40 exercícios diferentes de natação infantil", focus: "Repertório", training: "Circuito do golfinho" },
  { id: "Xp456zKl-Ic", title: "10 ideias criativas para aulas de natação infantil", focus: "Repertório", training: "Estafeta aquática" },
  { id: "lqGtl_AHmT4", title: "Aula de natação infantil com brincadeiras", focus: "Brincadeiras", training: "Circuito do golfinho" },
  { id: "ukR8defm7Ks", title: "Brincadeiras e atividades para natação infantil", focus: "Brincadeiras", training: "Caça às cores" },
  { id: "Y8EvkqkyjH8", title: "Tipos de exercícios e brincadeiras na piscina", focus: "Brincadeiras", training: "Estafeta aquática" },
  { id: "FncQO0lTitk", title: "Exercícios e brincadeiras para aprender a nadar", focus: "Brincadeiras", training: "Ilhas flutuantes" },
  { id: "00NDKStTVMc", title: "Adaptação ao meio líquido", focus: "Adaptação", training: "Caça às cores" },
  { id: "H0-7jTHpx_A", title: "Primeiros exercícios para o aluno iniciante", focus: "Adaptação", training: "Entrada sentada segura" },
  { id: "DYyy9iyRnGk", title: "Como boiar de costas", focus: "Flutuação", training: "Estrela flutuante" },
  { id: "U7_HqP3_w0s", title: "Deslocamento infantil em decúbito dorsal", focus: "Flutuação", training: "Estrela flutuante" },
  { id: "bAEySNAs-nM", title: "Como flutuar e perder o medo da água", focus: "Flutuação", training: "Estrela flutuante" },
  { id: "cEZnTJsyhEU", title: "Como utilizar o flutuador na aula", focus: "Materiais", training: "Ilhas flutuantes" },
  { id: "j5dpnIjihxo", title: "Como pegar impulso na parede", focus: "Deslize", training: "Foguete na parede" },
  { id: "HrsthXVsses", title: "10 exercícios para melhorar a pernada do crawl", focus: "Propulsão", training: "Passeio com prancha" },
  { id: "94Nha159bHg", title: "Pernada de crawl: exercícios, dicas e erros", focus: "Propulsão", training: "Revezamento de pranchas" },
  { id: "lWR1ahD2Qfs", title: "Trabalho de pernas no nado costas", focus: "Nado costas", training: "Pernada de costas" },
  { id: "aanVR28klLo", title: "Técnica completa do nado costas para iniciantes", focus: "Nado costas", training: "Pernada de costas" },
  { id: "Bjqe_QyQFOQ", title: "5 educativos para melhorar o nado crawl", focus: "Nado crawl", training: "Braçada do crawl" },
  { id: "kSgcZmd884Q", title: "Dica prática para corrigir a braçada do crawl", focus: "Nado crawl", training: "Braçada do crawl" },
  { id: "3DRJAV08FmY", title: "4 dicas de respiração na natação", focus: "Respiração", training: "Respiração lateral" },
  { id: "iw-up_a__EU", title: "Exercício de respiração bilateral no crawl", focus: "Respiração", training: "Respiração lateral" },
  { id: "ITOOkvBPDXk", title: "Exercícios para aprender a virada olímpica", focus: "Viradas", training: "Cambalhota assistida" },
  { id: "Gu7S7LvXtR8", title: "Virada do crawl: giro, impulso e deslize", focus: "Viradas", training: "Virada na parede" },
  { id: "-z95lTVEvRY", title: "Como aprender a mergulhar", focus: "Mergulho", training: "Pega-argolas" },
  { id: "NuTj7h5Pluw", title: "Jogo submerso para natação infantil", focus: "Mergulho", training: "Tesouro submerso" },
  { id: "v0S5lUTax1o", title: "Videoaula de segurança na piscina", focus: "Segurança", training: "Entrada sentada segura" },
  { id: "Dyo5XZ3muHg", title: "Como é uma aula de segurança aquática", focus: "Segurança", training: "Resgate do brinquedo" },
  { id: "AAauNP8uiYw", title: "Aula completa de segurança aquática infantil", focus: "Segurança", training: "Resgate do brinquedo" },
];

export const addOns = [
  {
    id: "smart-sheets",
    title: "Planilhas Inteligentes",
    description: "Planejamento semanal, presença, objetivos e evolução dos alunos em modelos editáveis.",
    deliverables: ["Planejador semanal", "Controle de presença", "Registro de evolução", "Ficha individual do aluno"],
  },
  {
    id: "assessment-pack",
    title: "Pack de Avaliação e Evolução",
    description: "Protocolos simples para avaliar adaptação, respiração, flutuação, propulsão e autonomia.",
    deliverables: ["Avaliação inicial", "Rubrica por habilidade", "Relatório de progresso", "Modelo de devolutiva"],
  },
  {
    id: "themed-calendar",
    title: "Calendário de Aulas Temáticas",
    description: "Um ano de temas e sugestões para variar as aulas sem perder o objetivo pedagógico.",
    deliverables: ["12 temas mensais", "Datas especiais", "Lista de materiais", "Sugestões por faixa etária"],
  },
];
