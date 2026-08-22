export type Training = {
  id: string;
  title: string;
  category: string;
  age: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  duration: number;
  objective: string;
  materials: string[];
  where: string;
  groupSize: string;
  setup: string;
  teacherRole: string;
  studentRole: string;
  dosage: string;
  steps: string[];
  successCriteria: string;
  easier: string;
  harder: string;
  attention: string;
  image: number;
};

type Blueprint = {
  titles: [string, string, string, string, string];
  category: string;
  age: string;
  objective: string;
  materials: string[];
  where: string;
  groupSize: string;
  setup: string;
  teacherRole: string;
  studentRole: string;
  dosage: string;
  steps: [string, string, string, string];
  successCriteria: string;
  easier: string;
  harder: string;
  attention: string;
};

const blueprints: Blueprint[] = [
  {
    titles: ["Trilha do primeiro contato", "Missão pés na água", "Passeio pela borda", "Porta de entrada da piscina", "Rota da confiança"],
    category: "Adaptação", age: "3–6 anos", objective: "Entrar na piscina com controle, reconhecer a borda e aceitar o contato inicial com a água.",
    materials: ["Cones baixos", "Brinquedos flutuantes"], where: "Escada e zona rasa, com água entre a cintura e o peito da criança.", groupSize: "1 a 4 alunos por professor.",
    setup: "Marque um ponto de espera seco, um ponto de entrada e três paradas junto à borda; deixe a escada completamente livre.",
    teacherRole: "Entrar primeiro, demonstrar a sequência, permanecer ao alcance do aluno e autorizar cada entrada individualmente.", studentRole: "Esperar o nome ser chamado, entrar pela escada, manter uma mão na borda e percorrer as três paradas.", dosage: "2 voltas curtas, com pausa de 30 segundos entre elas.",
    steps: ["Mostre em solo seco onde esperar, entrar, segurar e sair.", "Chame um aluno por vez e conduza a descida pela escada, sem puxá-lo para a água.", "Peça que caminhe lateralmente com uma mão na borda e toque os três marcadores.", "Finalize retornando à escada e repetindo em voz alta a regra: entrar somente quando o professor autorizar."],
    successCriteria: "Completa entrada, percurso e saída sem correr, empurrar ou soltar a borda antes do comando.", easier: "Faça apenas uma parada e permita as duas mãos na borda.", harder: "Peça deslocamento lateral com uma mão livre carregando um brinquedo leve.", attention: "Nunca deixe alunos aguardando dentro da água sem supervisão direta; mantenha entrada e saída organizadas."
  },
  {
    titles: ["Caminho das mãos na borda", "Caranguejo da piscina", "Correio da borda", "Estações do contorno", "Desafio segura e avança"],
    category: "Adaptação", age: "3–7 anos", objective: "Deslocar-se com autonomia básica usando a borda como referência segura.",
    materials: ["Figuras plastificadas", "Cones"], where: "Trecho reto da zona rasa, sem escadas, ralos ou quinas no percurso.", groupSize: "Até 5 alunos em fila, com um executando por vez.",
    setup: "Fixe quatro figuras na borda a cerca de um braço de distância e demarque início e retorno.", teacherRole: "Posicionar-se dentro da água de frente para o aluno, controlar o intervalo e corrigir a pegada com instruções curtas.", studentRole: "Manter pelo menos uma mão firme, mover pés lateralmente e tocar cada figura na ordem.", dosage: "3 passagens de 3 a 5 metros.",
    steps: ["Demonstre dedos fechando sobre a borda e pés apoiados no piso.", "Libere o aluno quando o anterior alcançar a segunda figura.", "Peça deslocamento lateral lento, sem cruzar as pernas, nomeando cada figura.", "No fim, faça o aluno girar de frente para a borda, voltar e sair pela rota definida."],
    successCriteria: "Mantém contato contínuo com a borda e controla o corpo durante todo o percurso.", easier: "Reduza para dois metros e permita apoio do professor no antebraço.", harder: "Inclua uma parada de três segundos com apenas uma mão na borda.", attention: "Não use área com borda escorregadia, objetos cortantes ou circulação de outras turmas."
  },
  {
    titles: ["Chuva no rosto", "Nuvem que não assusta", "Banho do golfinho", "Trilha dos respingos", "Controle da água no rosto"],
    category: "Adaptação", age: "3–6 anos", objective: "Aceitar respingos progressivos no rosto mantendo respiração tranquila.",
    materials: ["Regador pequeno", "Copos plásticos"], where: "Degrau largo ou zona rasa junto à borda.", groupSize: "1 a 4 alunos sentados ou em pé com espaço entre eles.",
    setup: "Organize três intensidades: mãos molhadas, copo perfurado e regador baixo; mantenha toalhas fora da área molhada.", teacherRole: "Explicar que o aluno pode sinalizar pausa, demonstrar em si mesmo e aumentar a água somente após aceitação.", studentRole: "Inspirar antes do contato, manter olhos fechados se desejar e soltar o ar enquanto a água passa pelo rosto.", dosage: "3 repetições por intensidade, com pausa curta.",
    steps: ["Combine o sinal de parar e teste o gesto antes de começar.", "Passe as mãos molhadas na testa e bochechas, evitando despejar água de surpresa.", "Use o copo perfurado acima da testa enquanto o aluno solta o ar pela boca.", "Somente com conforto, use o regador por dois segundos e peça que o aluno enxugue os olhos com as mãos."],
    successCriteria: "Recebe a água sem inspirar durante o contato e comunica desconforto de forma segura.", easier: "Comece apenas nos braços, ombros e nuca.", harder: "Peça que mergulhe boca e nariz após a chuva, soltando duas bolhas.", attention: "Nunca jogue água de surpresa nem trate medo como desobediência."
  },
  {
    titles: ["Caixa das cores flutuantes", "Entrega dos brinquedos", "Mercado da piscina", "Mapa dos objetos", "Coleta com direção"],
    category: "Adaptação", age: "3–7 anos", objective: "Explorar deslocamento raso, direção e alcance voluntário.",
    materials: ["Objetos flutuantes coloridos", "Três cestos"], where: "Zona rasa nivelada, afastada da escada e da raia de nado.", groupSize: "2 a 6 alunos, divididos em duas rotas.",
    setup: "Espalhe objetos visíveis em um corredor curto e coloque cestos por cor na borda.", teacherRole: "Definir a rota, impedir choques, oferecer apoio somente quando necessário e reforçar a volta segura.", studentRole: "Buscar um objeto por vez, deslocar-se sem correr e colocá-lo no cesto correspondente.", dosage: "4 a 6 coletas por aluno.",
    steps: ["Apresente as cores e mostre o corredor permitido.", "Libere um aluno de cada rota e indique um único objeto.", "Peça que caminhe, alcance o objeto à frente do corpo e retorne olhando para o caminho.", "Finalize contando os itens e reorganizando-os fora da água com a turma."],
    successCriteria: "Desloca-se com orientação, respeita a rota e manipula o objeto sem empurrar colegas.", easier: "Aproxime os objetos da borda.", harder: "Inclua mudança de direção ao redor de um cone flutuante.", attention: "Recolha todos os brinquedos ao final; objetos próximos à piscina atraem crianças fora do horário de aula."
  },
  {
    titles: ["Porta do oceano", "Arco de boas-vindas", "Passagem do capitão", "Portal dos animais", "Entrada com escolha"],
    category: "Adaptação", age: "4–7 anos", objective: "Passar por um obstáculo amplo mantendo orientação e controle emocional.",
    materials: ["Dois espaguetes", "Cones"], where: "Zona rasa com piso regular e espaço livre à frente.", groupSize: "Até 5 alunos, um por passagem.",
    setup: "Forme um arco largo com espaguetes, inicialmente acima da cabeça, e marque onde o próximo aluno espera.", teacherRole: "Segurar o arco, oferecer duas alturas seguras e acompanhar lateralmente sem empurrar.", studentRole: "Escolher a altura, caminhar pelo arco, tocar o cone e retornar pela lateral.", dosage: "3 a 5 passagens, mudando apenas uma variável por vez.",
    steps: ["Mostre o percurso completo sem aluno dentro do arco.", "Apresente duas opções: arco alto ou próximo da superfície.", "Peça que o aluno atravesse olhando para o professor e solte o ar se molhar boca ou nariz.", "No cone, faça meia-volta e retorne sem passar contra o fluxo."],
    successCriteria: "Atravessa por escolha própria, mantém orientação e retorna pela rota correta.", easier: "Mantenha o arco totalmente fora da água.", harder: "Baixe parte do arco até exigir imersão voluntária do rosto.", attention: "O obstáculo deve ser flexível, aberto e nunca cobrir ou prender a criança."
  },
  {
    titles: ["Semáforo das bolhas", "Bolha verde, pausa vermelha", "Sinais do sopro", "Ritmo das três cores", "Controle respiratório por comando"],
    category: "Respiração", age: "3–7 anos", objective: "Expirar dentro da água de forma contínua e responder a sinais visuais.",
    materials: ["Cartões verde, amarelo e vermelho"], where: "Borda da zona rasa, com apoio firme dos pés.", groupSize: "2 a 6 alunos alinhados com um braço de distância.",
    setup: "Coloque os cartões ao alcance do professor e defina verde para soprar, amarelo para reduzir e vermelho para levantar o rosto.", teacherRole: "Demonstrar inspiração fora da água, observar cada aluno e nunca prolongar a submersão como competição.", studentRole: "Inspirar com o rosto fora, colocar boca ou rosto na água e soltar o ar até o cartão vermelho.", dosage: "6 ciclos de 2 a 4 segundos.",
    steps: ["Treine os três sinais fora da água.", "Mostre o cartão verde e peça bolhas apenas com a boca.", "Repita com boca e nariz, usando amarelo antes do vermelho.", "Finalize com cada aluno escolhendo uma duração confortável, sem prender a respiração."],
    successCriteria: "Solta o ar continuamente e levanta o rosto antes de inspirar.", easier: "Molhe somente os lábios.", harder: "Alterne bolhas curtas e longas conforme as cores.", attention: "Interrompa se houver tosse, engasgo, ansiedade ou inspiração com o rosto submerso."
  },
  {
    titles: ["Trilha das bolhas longas", "Fita de ar", "Caminho do sopro", "Bolhas até o cone", "Expiração em deslocamento"],
    category: "Respiração", age: "5–9 anos", objective: "Manter expiração contínua durante deslocamento curto.",
    materials: ["Prancha", "Dois cones"], where: "Corredor raso de 3 a 6 metros.", groupSize: "Até 6 alunos, um por corredor.",
    setup: "Marque início e fim; deixe o professor entre o aluno e o cone final.", teacherRole: "Dar o comando de inspirar, acompanhar ao lado e encerrar a tentativa antes de faltar ar.", studentRole: "Segurar a prancha, colocar o rosto na água, caminhar ou bater pernas e soltar bolhas até o ponto combinado.", dosage: "4 passagens com recuperação completa.",
    steps: ["Demonstre fora da água a diferença entre sopro contínuo e rajadas.", "Posicione mãos na prancha e braços confortavelmente estendidos.", "No comando, peça inspiração, rosto na água e bolhas durante todo o trajeto.", "Ao chegar, levante o rosto, pare os pés e só então retorne pela lateral."],
    successCriteria: "Não interrompe a expiração antes do ponto e não tenta inspirar dentro da água.", easier: "Caminhe dois metros com o professor segurando a prancha.", harder: "Faça o percurso com pernada e uma inspiração lateral no meio.", attention: "Nunca use desafio de distância máxima ou retenção de ar."
  },
  {
    titles: ["Apaga-vela aquática", "Bolo de bolhas", "Velinhas na borda", "Sopro de aniversário", "Precisão do sopro"],
    category: "Respiração", age: "3–6 anos", objective: "Direcionar o sopro e diferenciar expiração fora e dentro da água.",
    materials: ["Bolas leves", "Marcas na borda"], where: "Degrau ou borda rasa, com a bola longe do ralo.", groupSize: "1 a 5 alunos.",
    setup: "Coloque uma bola leve por aluno e uma linha-alvo a 50 centímetros.", teacherRole: "Modelar o sopro sem cuspir, controlar a bola e aproximar a tarefa gradualmente da superfície.", studentRole: "Soprar a bola até o alvo e depois repetir com lábios próximos ou dentro da água.", dosage: "3 tentativas fora e 3 na superfície.",
    steps: ["Faça uma tentativa em solo seco para mostrar sopro longo.", "Ponha a bola na água e peça que o aluno sopre sem encostar nela.", "Aproxime a boca da superfície e associe o fim do sopro a duas bolhas.", "Recolha a bola antes de trocar o aluno e compare qual sopro foi mais controlado."],
    successCriteria: "Move a bola com ar contínuo e termina sem aspirar água.", easier: "Use alvo próximo e bola maior.", harder: "Crie um caminho curvo entre duas marcas.", attention: "Higienize materiais compartilhados e impeça que alunos levem a bola à boca."
  },
  {
    titles: ["Telefone de bolhas", "Mensagem submersa", "Eco da piscina", "Código do sopro", "Ritmo em dupla"],
    category: "Respiração", age: "5–9 anos", objective: "Perceber ritmo expiratório por imitação sem contato entre alunos.",
    materials: ["Cartões com sequências de pontos"], where: "Zona rasa, alunos lado a lado voltados para a borda.", groupSize: "Duplas com distância mínima de um braço.",
    setup: "Prepare cartões com sequências curta-curta-longa e longa-curta.", teacherRole: "Mostrar o cartão, manter as duplas separadas e observar se todos inspiram fora da água.", studentRole: "Executar a sequência de bolhas e o colega repetir após ambos levantarem o rosto.", dosage: "4 mensagens por dupla.",
    steps: ["Explique que ninguém permanece submerso esperando o colega.", "Mostre uma sequência e deixe a dupla ensaiar soprando no ar.", "O primeiro aluno executa as bolhas, levanta o rosto e dá espaço.", "O segundo repete; depois trocam o cartão e descrevem qual parte foi longa."],
    successCriteria: "Reproduz o ritmo sem prender o ar e respeita o tempo do colega.", easier: "Use apenas uma bolha longa.", harder: "Inclua três durações diferentes com sinal visual.", attention: "Não permita disputa de quem fica mais tempo submerso."
  },
  {
    titles: ["Argola do sopro", "Janela de bolhas", "Mira respiratória", "Portal do ar", "Precisão submersa"],
    category: "Respiração", age: "6–10 anos", objective: "Coordenar imersão curta, olhar submerso e expiração contínua.",
    materials: ["Argola grande"], where: "Zona rasa, com argola parcialmente submersa e professor ao lado.", groupSize: "Até 5 alunos, um por vez.",
    setup: "Segure a argola verticalmente e marque entrada e saída sem obstáculos.", teacherRole: "Ajustar a profundidade, manter contato visual e retirar a argola se o aluno interromper a expiração.", studentRole: "Inspirar fora, passar o rosto pela argola soltando bolhas e levantar do outro lado.", dosage: "4 a 6 passagens curtas.",
    steps: ["Passe primeiro com a argola acima da água.", "Baixe até a altura da boca e peça bolhas durante a passagem.", "Quando houver conforto, inclua nariz e olhos por um segundo.", "Finalize com o aluno dizendo se deseja repetir igual ou voltar uma etapa."],
    successCriteria: "Entra e sai orientado, com expiração visível durante toda a imersão.", easier: "Molhe apenas o queixo.", harder: "Afaste entrada e saída em um metro, mantendo a argola ampla.", attention: "Não empurre a cabeça nem reduza a abertura ao redor do aluno."
  },
  {
    titles: ["Estrela do céu", "Constelação dorsal", "Nuvem flutuante", "Silêncio das estrelas", "Alinhamento dorsal"],
    category: "Flutuação", age: "4–8 anos", objective: "Relaxar em decúbito dorsal com cabeça apoiada e quadril próximo da superfície.",
    materials: ["Espaguete opcional"], where: "Zona rasa silenciosa, longe de saltos e circulação.", groupSize: "1 aluno por professor; os demais aguardam fora da água ou na borda organizada.",
    setup: "Reserve um quadrado de 2 metros e elimine objetos flutuando ao redor.", teacherRole: "Apoiar nuca e região lombar, falar devagar e retirar apenas um apoio por vez.", studentRole: "Olhar para cima, abrir braços e pernas, respirar normalmente e avisar quando quiser voltar a ficar em pé.", dosage: "4 flutuações de 5 a 12 segundos.",
    steps: ["Mostre a posição de estrela fora da água.", "Apoie nuca e lombar e peça que as orelhas toquem a água.", "Solicite barriga próxima da superfície sem forçar o pescoço.", "Retire primeiro o apoio lombar; recoloque antes de ajudar o aluno a ficar em pé."],
    successCriteria: "Mantém respiração tranquila e corpo aberto sem movimentos bruscos.", easier: "Use espaguete sob ombros e mantenha dois apoios.", harder: "Retire o apoio por três segundos e peça retorno controlado.", attention: "Não solte a criança sem avisar nem retire os dois apoios simultaneamente."
  },
  {
    titles: ["Flecha flutuante", "Prancha invisível", "Corpo comprido", "Linha azul", "Alinhamento ventral"],
    category: "Flutuação", age: "5–9 anos", objective: "Sustentar posição ventral alongada com rosto na água e saída segura.",
    materials: ["Prancha pequena"], where: "Zona rasa, paralela à borda.", groupSize: "Até 4 alunos, um executando por vez.",
    setup: "Marque uma linha de 2 a 4 metros e posicione o professor no final.", teacherRole: "Apoiar mãos ou prancha, controlar a duração e orientar o retorno dos pés ao chão.", studentRole: "Estender braços, colocar o rosto, soltar bolhas e manter pernas alongadas.", dosage: "4 repetições de 3 a 6 segundos.",
    steps: ["Monte a flecha em pé: mãos juntas, braços perto das orelhas.", "Entregue a prancha e peça inclinação progressiva do tronco.", "Com o rosto na água, sustente a posição enquanto o ar sai.", "Dê o comando de terminar; o aluno flexiona joelhos e coloca os pés no fundo antes de soltar a prancha."],
    successCriteria: "Mantém corpo alongado, expira e retorna aos pés com controle.", easier: "Apoie antebraços na borda.", harder: "Retire a prancha e faça deslize curto após impulso leve.", attention: "Garanta profundidade em que o aluno consiga recuperar o apoio dos pés."
  },
  {
    titles: ["Tatu-bola aquático", "Abraça e flutua", "Bolinha do mar", "Encolhe e abre", "Controle de volume corporal"],
    category: "Flutuação", age: "5–9 anos", objective: "Perceber mudança de flutuação ao agrupar e estender o corpo.",
    materials: ["Espaguete opcional"], where: "Zona rasa com professor à frente.", groupSize: "1 a 4 alunos.",
    setup: "Demarque espaço individual sem contato entre alunos.", teacherRole: "Demonstrar agrupamento, sustentar ombros quando necessário e contar em voz alta.", studentRole: "Inspirar, abraçar joelhos, soltar bolhas breves e depois abrir o corpo para ficar em pé.", dosage: "4 ciclos de até 4 segundos.",
    steps: ["Treine em pé o gesto de abraçar os joelhos sem mergulhar.", "Peça inspiração e flexão controlada, mantendo o professor ao alcance.", "Conte até três enquanto o aluno solta ar lentamente.", "Diga 'abre'; o aluno solta joelhos, estende pés ao fundo e levanta a cabeça."],
    successCriteria: "Agrupa e retorna à posição em pé sem desorientação.", easier: "Faça apenas flexão parcial com mãos no espaguete.", harder: "Passe do tatu-bola para estrela dorsal com ajuda.", attention: "Interrompa se houver tontura; não prolongue a submersão."
  },
  {
    titles: ["Barriga, lado e costas", "Relógio do corpo", "Giro da estrela", "Troca de céu e fundo", "Rotação controlada"],
    category: "Flutuação", age: "6–10 anos", objective: "Mudar entre posições ventral, lateral e dorsal sem perder orientação.",
    materials: ["Espaguete"], where: "Zona rasa livre, em área de 2 por 3 metros.", groupSize: "1 aluno por vez.",
    setup: "Posicione o espaguete sob as axilas na primeira tentativa e marque o lado do giro.", teacherRole: "Guiar pelo quadril e ombro, nomear cada posição e impedir rotação brusca da cabeça.", studentRole: "Alongar, girar o corpo inteiro e reorganizar a respiração ao chegar de costas.", dosage: "3 giros para cada lado.",
    steps: ["Comece em flutuação ventral assistida com bolhas.", "Peça que o aluno olhe para o lado do giro e leve ombro e quadril juntos.", "Ao chegar de costas, mantenha orelhas na água e faça uma inspiração tranquila.", "Retorne pela mesma lateral e coloque os pés no fundo antes de reiniciar."],
    successCriteria: "Gira em bloco e termina orientado, sem cruzar o espaço de outro aluno.", easier: "Use dois espaguetes e giro de apenas 90 graus.", harder: "Retire o espaguete e una o giro a três pernadas.", attention: "Faça individualmente e mantenha apoio próximo durante a troca de posição."
  },
  {
    titles: ["Balanço do espaguete", "Rede tranquila", "Barquinho de descanso", "Vai e volta suave", "Estabilidade com flutuador"],
    category: "Flutuação", age: "3–7 anos", objective: "Relaxar com apoio flutuante e controlar pequenas oscilações.",
    materials: ["Dois espaguetes"], where: "Zona rasa, sem ondas produzidas por outras atividades.", groupSize: "1 a 3 alunos.",
    setup: "Coloque um espaguete sob ombros e outro sob joelhos, com o professor na lateral.", teacherRole: "Estabilizar os materiais, movimentar poucos centímetros e observar cabeça e quadril.", studentRole: "Deitar, olhar para cima, manter braços abertos e indicar se deseja continuar.", dosage: "3 séries de 15 a 25 segundos.",
    steps: ["Apresente os dois apoios antes de deitar o aluno.", "Apoie nuca, posicione espaguetes e só então reduza a sustentação manual.", "Faça balanço curto para frente e para trás, sem afastar-se da borda.", "Pare completamente, recoloque a mão na nuca e ajude o aluno a sentar."],
    successCriteria: "Permanece relaxado e retorna à posição vertical sem susto.", easier: "Sem balanço e com apoio contínuo na nuca.", harder: "Retire o espaguete dos joelhos por cinco segundos.", attention: "Espaguetes auxiliam a atividade, mas não são equipamentos de segurança."
  },
  {
    titles: ["Motorzinho na borda", "Pés que fazem espuma", "Batida do golfinho", "Ritmo das pernas", "Pernada com alinhamento"],
    category: "Propulsão", age: "4–8 anos", objective: "Executar pernada alternada curta a partir do quadril.",
    materials: ["Borda livre", "Marcador visual"], where: "Borda da zona rasa, fora da área de entrada.", groupSize: "Até 6 alunos com um braço de espaço.",
    setup: "Distribua os alunos sentados ou em posição ventral segurando a borda, sem sobrepor pernas.", teacherRole: "Demonstrar fora da água, tocar levemente a coxa para indicar origem do movimento e corrigir um ponto por vez.", studentRole: "Manter pernas alongadas, tornozelos soltos e produzir espuma pequena e contínua.", dosage: "5 séries de 15 segundos com 20 segundos de pausa.",
    steps: ["Demonstre pernas quase estendidas e pés relaxados.", "Comece sentado na borda para o aluno observar os próprios pés.", "Passe para posição ventral segurando firme e dê o comando de iniciar.", "Pare antes de perder o ritmo, peça pés no fundo e dê uma única correção."],
    successCriteria: "Mantém ritmo sem pedalar excessivamente nem bater os joelhos na borda.", easier: "Faça sentado com menor amplitude.", harder: "Acrescente rosto na água e bolhas por três segundos.", attention: "Verifique se a borda não machuca as mãos e se não há aluno atrás das pernas."
  },
  {
    titles: ["Trilha da prancha", "Entrega com motor", "Passeio até o cone", "Corredor das pernadas", "Direção com propulsão"],
    category: "Propulsão", age: "5–9 anos", objective: "Usar pernada contínua para deslocar a prancha em linha definida.",
    materials: ["Pranchas", "Cones"], where: "Corredor de 4 a 10 metros, conforme o nível.", groupSize: "Um aluno por corredor; até 3 corredores.",
    setup: "Marque ida, parada e retorno; mantenha distância entre corredores.", teacherRole: "Ajustar mãos e braços, caminhar ao lado e encerrar quando o alinhamento se perder.", studentRole: "Segurar a parte superior da prancha, alongar o corpo e bater pernas até o cone.", dosage: "4 a 6 passagens com pausa no retorno.",
    steps: ["Ajuste mãos afastadas e cotovelos confortavelmente estendidos.", "Peça impulso leve da parede e início imediato da pernada.", "Durante o percurso, use um único comando: pés soltos, pernas curtas ou olhar à frente.", "No cone, o aluno para, põe os pés no fundo e retorna pela lateral."],
    successCriteria: "Percorre a rota sem zigue-zague e mantém pernada contínua.", easier: "Reduza a distância e caminhe segurando a frente da prancha.", harder: "Inclua rosto na água e respiração programada.", attention: "Não prolongue a distância a ponto de comprometer técnica ou causar exaustão."
  },
  {
    titles: ["Pernada olhando o céu", "Trilho de costas", "Motor dorsal", "Linha reta dorsal", "Controle de quadril no costas"],
    category: "Propulsão", age: "7–11 anos", objective: "Deslocar-se de costas com quadril elevado e pernada alternada.",
    materials: ["Prancha opcional", "Marcadores laterais"], where: "Raia curta com chegada sinalizada.", groupSize: "Um aluno por raia.",
    setup: "Marque 5 a 12 metros e posicione sinal visual ou professor antes da parede.", teacherRole: "Apoiar a cabeça no início, caminhar lateralmente e avisar a aproximação da parede.", studentRole: "Olhar para cima, manter orelhas na água e mover pernas a partir do quadril.", dosage: "4 passagens com recuperação de 30 a 45 segundos.",
    steps: ["Pratique a pernada sentado para soltar tornozelos.", "Deite o aluno com apoio na nuca e confirme olhar fixo no teto.", "Dê o comando de pernada curta e retire gradualmente o apoio.", "Avise a chegada com dois metros de antecedência; o aluno reduz e toca a parede com a mão."],
    successCriteria: "Mantém direção e joelhos predominantemente abaixo da superfície.", easier: "Use prancha sobre as coxas e apoio na nuca.", harder: "Leve braços em flecha acima da cabeça.", attention: "Sinalize a parede para evitar impacto da cabeça."
  },
  {
    titles: ["Cachorrinho até a ilha", "Remada curta", "Patas do nadador", "Travessia do filhote", "Propulsão frontal autônoma"],
    category: "Propulsão", age: "5–9 anos", objective: "Combinar remadas curtas e pernada para deslocamento frontal breve.",
    materials: ["Espaguete opcional", "Alvo flutuante"], where: "Zona rasa, trajeto de 2 a 5 metros em direção ao professor.", groupSize: "Um aluno por tentativa.",
    setup: "Coloque o alvo atrás do professor e mantenha rota livre.", teacherRole: "Demonstrar mãos abaixo da superfície, oferecer apoio sob o peito e permanecer como destino do deslocamento.", studentRole: "Fazer remadas pequenas, pernas contínuas e alcançar o professor sem levantar exageradamente a cabeça.", dosage: "5 deslocamentos curtos.",
    steps: ["Mostre as mãos puxando água para trás abaixo do peito.", "Apoie o espaguete sob o tórax e inicie pernada leve.", "Peça remadas alternadas até chegar às mãos do professor.", "Reduza o apoio aos poucos e finalize com retorno imediato à borda."],
    successCriteria: "Desloca-se de forma contínua e alcança apoio combinado.", easier: "Mantenha espaguete e distância de dois metros.", harder: "Retire o espaguete por dois a quatro metros.", attention: "Não apresente a atividade como habilidade de sobrevivência suficiente; supervisão continua indispensável."
  },
  {
    titles: ["Foguete da parede", "Lançamento da flecha", "Deslize até a estrela", "Pista do impulso", "Impulso hidrodinâmico"],
    category: "Propulsão", age: "6–10 anos", objective: "Impulsionar-se da parede e manter corpo alinhado durante o deslize.",
    materials: ["Marcadores de distância"], where: "Raia rasa com 5 metros livres à frente.", groupSize: "Um aluno por vez na parede.",
    setup: "Marque posições a 1, 2 e 3 metros e deixe a zona de chegada vazia.", teacherRole: "Ajustar pés, conferir área livre e dar o comando de saída.", studentRole: "Apoiar os dois pés, unir mãos, colocar cabeça entre braços e impulsionar sem bater pernas no início.", dosage: "6 impulsos com retorno pela lateral.",
    steps: ["Monte a posição de flecha fora da água.", "Na parede, alinhe pés paralelos e joelhos flexionados.", "Peça inspiração, rosto na água e impulso somente após seu sinal.", "Conte o deslize imóvel; ao perder velocidade, o aluno põe os pés no fundo e sai da rota."],
    successCriteria: "Sai alinhado, mantém trajetória e não inicia antes do comando.", easier: "Use impulso fraco e mãos sobre uma prancha.", harder: "Acrescente quatro pernadas depois do deslize.", attention: "Só libere o próximo quando a zona à frente estiver completamente livre."
  },
  {
    titles: ["Janela submersa", "Olhos no aquário", "Espia o fundo", "Quadro debaixo d'água", "Orientação visual submersa"],
    category: "Imersão", age: "4–8 anos", objective: "Abrir os olhos ou orientar o rosto na água durante imersão voluntária curta.",
    materials: ["Figuras plastificadas"], where: "Degrau raso, com figura logo abaixo da superfície.", groupSize: "1 a 4 alunos.",
    setup: "Fixe uma figura grande na parede da piscina e mantenha outra igual fora para escolha.", teacherRole: "Apresentar a figura, permitir óculos se já usados e controlar profundidade e tempo.", studentRole: "Inspirar fora, mergulhar rosto, observar a figura, soltar bolhas e levantar para responder.", dosage: "4 observações de 1 a 3 segundos.",
    steps: ["Mostre duas figuras fora da água.", "Coloque uma abaixo da superfície e peça que o aluno escolha se molhará olhos ou apenas boca e nariz.", "Conte um, dois e dê o comando de levantar.", "O aluno aponta a figura vista; repita sem aumentar tempo se a expiração parar."],
    successCriteria: "Mergulha por decisão própria e retorna orientado.", easier: "Deixe parte da figura fora da água.", harder: "Use duas figuras em posições diferentes.", attention: "Nunca segure a cabeça submersa nem surpreenda o aluno."
  },
  {
    titles: ["Arco submerso", "Túnel das bolhas", "Passagem secreta", "Portal do mergulho", "Imersão em trajetória"],
    category: "Imersão", age: "5–9 anos", objective: "Passar sob obstáculo flexível com expiração e orientação.",
    materials: ["Argola grande", "Espaguete"], where: "Zona rasa com entrada e saída visíveis.", groupSize: "Um aluno por passagem.",
    setup: "Posicione a argola com metade acima da água e professor na saída.", teacherRole: "Segurar o obstáculo, acompanhar o tronco sem empurrar e escolher profundidade compatível.", studentRole: "Inspirar, abaixar por vontade própria, atravessar soltando bolhas e ficar em pé após sair.", dosage: "4 passagens, alternando alturas seguras.",
    steps: ["Atravesse primeiro com a argola fora da água.", "Baixe até exigir apenas boca e nariz submersos.", "Peça que o aluno olhe para suas mãos do outro lado e solte o ar.", "Depois da saída, confirme pés no fundo antes de liberar o próximo."],
    successCriteria: "Passa sem tocar ou prender-se e mantém bolhas até sair.", easier: "Argola acima dos olhos.", harder: "Afaste a saída em um metro após a argola.", attention: "Use obstáculo amplo e flexível; nunca forme túnel fechado."
  },
  {
    titles: ["Tesouro raso", "Caixa perdida", "Coleção do fundo", "Busca por formato", "Mergulho de precisão"],
    category: "Mergulho", age: "5–9 anos", objective: "Recolher objeto visível no fundo raso e retornar com controle.",
    materials: ["Objetos submersíveis grandes", "Cesto"], where: "Profundidade em que o aluno consiga apoiar os pés e o fundo seja totalmente visível.", groupSize: "Um aluno por área de coleta.",
    setup: "Coloque três objetos a distâncias diferentes e o cesto na borda.", teacherRole: "Contar os objetos, escolher um alvo por tentativa e observar toda a submersão.", studentRole: "Flexionar joelhos, levar mãos primeiro, pegar um objeto e voltar à superfície soltando o ar.", dosage: "3 a 5 objetos por aluno, com pausa.",
    steps: ["Demonstre flexão dos joelhos sem salto de cabeça.", "Indique um objeto visível e confirme que a área está livre.", "O aluno inspira, submerge com mãos à frente e recolhe apenas o alvo.", "Ao emergir, coloca os pés no fundo, leva o objeto ao cesto e aguarda novo comando."],
    successCriteria: "Recolhe um item sem pressa, disputa ou perda de orientação.", easier: "Coloque o objeto em degrau elevado.", harder: "Aumente distância horizontal antes de qualquer aumento de profundidade.", attention: "Não transforme em prova de tempo nem aumente a profundidade sem domínio comprovado."
  },
  {
    titles: ["Sequência das argolas", "Código no fundo", "Argolas em ordem", "Memória submersa", "Busca planejada"],
    category: "Mergulho", age: "6–10 anos", objective: "Planejar uma sequência curta de buscas submersas com recuperação adequada.",
    materials: ["Argolas de três cores"], where: "Zona rasa ou média compatível com a habilidade individual.", groupSize: "Um aluno executa; até 3 observam da borda.",
    setup: "Distribua argolas espaçadas e mostre uma sequência de duas cores.", teacherRole: "Definir sequência, controlar a recuperação e impedir duas crianças na mesma zona.", studentRole: "Buscar uma argola por imersão, respirar fora da água e somente então buscar a próxima.", dosage: "3 sequências de duas argolas.",
    steps: ["Mostre a ordem das cores e peça repetição verbal.", "Indique a primeira argola e observe a submersão inteira.", "Após emergir, o aluno fica em pé e faz duas respirações normais.", "Só então busca a segunda e encerra levando ambas ao cesto."],
    successCriteria: "Respeita a recuperação entre imersões e segue a ordem indicada.", easier: "Use uma argola por rodada.", harder: "Use três cores com maior distância horizontal.", attention: "Proíba hiperventilação e competições de apneia."
  },
  {
    titles: ["Cambalhota no espaguete", "Roda da bolha", "Giro dentro da argola", "Rotação do golfinho", "Cambalhota controlada"],
    category: "Coordenação", age: "8–12 anos", objective: "Executar rotação frontal com queixo recolhido e expiração pelo nariz.",
    materials: ["Espaguete", "Argola grande"], where: "Zona com profundidade confortável e área livre de 3 metros.", groupSize: "Um aluno por vez.",
    setup: "Posicione o espaguete horizontal e mantenha a argola para a progressão, não para prender o corpo.", teacherRole: "Demonstrar, apoiar quadril e nunca puxar cabeça ou pescoço.", studentRole: "Recolher queixo, abraçar o movimento, soltar ar pelo nariz e terminar com pés no fundo.", dosage: "3 a 5 rotações com pausa completa.",
    steps: ["Ensaie o arredondamento do corpo fora da água.", "Na água, o aluno segura o espaguete e aproxima queixo do peito.", "Apoie o quadril para completar a rotação enquanto ele solta o ar pelo nariz.", "Após cada giro, peça que fique em pé, fixe o olhar e informe se sentiu tontura."],
    successCriteria: "Completa giro sem puxar o pescoço e recupera orientação imediatamente.", easier: "Faça meia rotação com apoio integral.", harder: "Passe pela argola ampla com apoio mínimo.", attention: "Interrompa ao primeiro sinal de tontura, dor ou desorientação."
  },
  {
    titles: ["Ilhas flutuantes", "Arquipélago do equilíbrio", "Entrega entre ilhas", "Mapa dos tapetes", "Transferência de apoio"],
    category: "Equilíbrio", age: "4–8 anos", objective: "Transferir apoio entre materiais flutuantes mantendo controle postural.",
    materials: ["Tapetes flutuantes", "Espaguetes"], where: "Zona rasa, próxima da borda e sem circulação externa.", groupSize: "Um aluno por ilha; máximo de 3 no circuito.",
    setup: "Estabilize duas ou três ilhas a pequena distância e defina entrada e saída.", teacherRole: "Segurar o material, controlar uma criança por ilha e oferecer a mão sem puxar.", studentRole: "Subir com autorização, parar, equilibrar-se e transferir-se ao próximo apoio.", dosage: "3 voltas pelo circuito.",
    steps: ["Mostre a ordem das ilhas fora da água.", "Estabilize a primeira e ajude o aluno a apoiar joelhos ou mãos.", "Peça pausa de três segundos antes de cada transferência.", "Na última ilha, o aluno desce para a água, segura a borda e sai pela rota marcada."],
    successCriteria: "Espera o material estabilizar e não salta sobre outro aluno.", easier: "Use uma ilha junto à borda.", harder: "Transporte uma bola leve entre duas ilhas.", attention: "Nunca deixe tapetes soltos nem mais de uma criança no mesmo apoio."
  },
  {
    titles: ["Bola viajante", "Entrega sem derrubar", "Correio aquático", "Ponte da bola", "Estabilidade em deslocamento"],
    category: "Equilíbrio", age: "5–9 anos", objective: "Manter postura enquanto transporta objeto leve em deslocamento raso.",
    materials: ["Bolas leves", "Cones"], where: "Zona rasa em corredor de 4 metros.", groupSize: "Até 6 alunos em duas filas.",
    setup: "Marque ida e volta e deixe um recipiente em cada extremidade.", teacherRole: "Demonstrar posição, controlar cruzamentos e adaptar a forma de transporte.", studentRole: "Caminhar com a bola sobre a prancha ou nas mãos, contornar o cone e entregar ao próximo.", dosage: "4 percursos por aluno.",
    steps: ["Defina onde o próximo aluno aguarda.", "Entregue a bola apenas após o corredor ficar livre.", "Peça passos curtos e olhar para frente durante ida e contorno.", "No retorno, o aluno para completamente antes de entregar a bola."],
    successCriteria: "Mantém direção e controla o objeto sem correr.", easier: "Segure a bola com duas mãos.", harder: "Leve a bola sobre uma prancha flutuante.", attention: "Evite competição de velocidade em piso molhado."
  },
  {
    titles: ["Circuito do golfinho", "Quatro missões azuis", "Rota das habilidades", "Estações do oceano", "Circuito técnico infantil"],
    category: "Coordenação", age: "6–10 anos", objective: "Combinar entrada, deslize, imersão e propulsão em sequência organizada.",
    materials: ["Prancha", "Argola", "Cone", "Alvo flutuante"], where: "Zona rasa e raia curta com quatro estações separadas.", groupSize: "4 a 8 alunos, um por estação.",
    setup: "Monte estações em sentido único: entrada, deslize, argola e pernada; deixe saída após a quarta.", teacherRole: "Demonstrar cada estação, posicionar auxiliares quando disponíveis e controlar o avanço.", studentRole: "Executar uma estação, aguardar o espaço seguinte e seguir a ordem sem ultrapassar.", dosage: "3 voltas com 1 minuto de pausa entre voltas.",
    steps: ["Apresente todas as estações antes de entrar na água.", "Estação 1: entrada sentada e retorno à borda; estação 2: flecha até a marca.", "Estação 3: passagem na argola soltando bolhas; estação 4: pernada com prancha até o cone.", "Ao terminar, o aluno sai, retorna caminhando fora da área molhada e volta à fila."],
    successCriteria: "Completa a ordem e espera a liberação de cada espaço.", easier: "Use duas estações e apoio direto.", harder: "Inclua mudança de direção e escolha entre duas progressões.", attention: "A próxima criança só avança quando a estação seguinte estiver livre."
  },
  {
    titles: ["Estafeta cooperativa", "Entrega da equipe", "Revezamento sem pressa", "Missão todos completam", "Cooperação em percurso"],
    category: "Dinâmica em grupo", age: "7–11 anos", objective: "Cooperar, respeitar turno e manter técnica durante revezamento.",
    materials: ["Pranchas", "Bolas", "Cones"], where: "Duas raias rasas paralelas.", groupSize: "Equipes de 3 a 5 alunos.",
    setup: "Marque ponto de troca e mantenha equipes afastadas; explique que a meta é execução correta, não velocidade.", teacherRole: "Controlar a saída, observar técnica e interromper comportamentos competitivos inseguros.", studentRole: "Completar o percurso, parar, entregar o objeto e aguardar no local definido.", dosage: "3 rodadas com mudança de tarefa.",
    steps: ["Divida equipes equilibradas e demonstre a troca parada.", "Rodada 1: caminhada com bola; rodada 2: pernada com prancha; rodada 3: deslocamento dorsal assistido.", "O próximo só sai após receber o objeto com os dois parados.", "Some um ponto coletivo quando todos mantiverem a regra técnica."],
    successCriteria: "Equipe conclui sem saída antecipada, colisão ou empurrão.", easier: "Use uma única tarefa de caminhada.", harder: "Combine duas habilidades no mesmo percurso.", attention: "Não premie apenas velocidade; valorize organização e controle."
  },
  {
    titles: ["Siga o mestre aquático", "Espelho do professor", "Comandos do capitão", "Sequência de imitação", "Leitura corporal na água"],
    category: "Coordenação", age: "4–9 anos", objective: "Imitar movimentos aquáticos e responder a comandos simples.",
    materials: ["Cartões de movimentos"], where: "Zona rasa em semicírculo, todos visíveis ao professor.", groupSize: "3 a 8 alunos.",
    setup: "Distribua marcas individuais no piso ou borda e selecione quatro movimentos seguros.", teacherRole: "Demonstrar de frente, usar um comando por vez e verificar todos antes de trocar.", studentRole: "Permanecer em sua marca e reproduzir caminhada, sopro, equilíbrio e pernada apoiada.", dosage: "2 séries de 4 movimentos, 20 segundos cada.",
    steps: ["Apresente as marcas e o sinal de parar.", "Demonstre o primeiro movimento lentamente e só então peça imitação.", "Alterne movimentos de braços, caminhada lateral, bolhas e pernada na borda.", "No final, um aluno escolhe um cartão e o professor continua responsável pela demonstração."],
    successCriteria: "Responde ao sinal e mantém-se em seu espaço.", easier: "Use dois movimentos sem imersão.", harder: "Monte sequência de três movimentos para memorizar.", attention: "Não permita que um aluno conduza tarefa que envolva salto ou imersão."
  },
  {
    titles: ["Memória aquática", "Sequência das cores", "Repete a rota", "Mapa de três ações", "Coordenação com memória"],
    category: "Coordenação", age: "6–10 anos", objective: "Memorizar e executar sequência curta de habilidades.",
    materials: ["Cartões coloridos", "Prancha", "Argola"], where: "Zona rasa com três pontos demarcados.", groupSize: "Até 6 alunos, um executando.",
    setup: "Associe azul a bolhas, verde a pernada e branco a flutuação assistida.", teacherRole: "Apresentar no máximo três ações, observar a ordem e corrigir sem aumentar a complexidade cedo demais.", studentRole: "Repetir verbalmente a sequência e executá-la nos pontos indicados.", dosage: "4 sequências por aluno.",
    steps: ["Ensine cada cor separadamente.", "Mostre duas cartas, peça repetição verbal e libere o percurso.", "O aluno executa uma ação por estação e retorna à marca inicial.", "Após acerto consistente, acrescente uma terceira carta ou troque a ordem."],
    successCriteria: "Completa a ordem sem invadir outra estação.", easier: "Uma carta por vez.", harder: "Três cartas com mudança de direção.", attention: "A memória nunca substitui a supervisão; o professor acompanha toda a execução."
  },
  {
    titles: ["Braço de crawl com prancha", "Remada unilateral", "Troca de braço no cone", "Cotovelo viajante", "Crawl unilateral técnico"],
    category: "Nado crawl", age: "7–12 anos", objective: "Organizar entrada, apoio, puxada e recuperação de um braço por vez.",
    materials: ["Prancha", "Pull buoy opcional"], where: "Raia de 8 a 15 metros.", groupSize: "Um aluno por raia.",
    setup: "Defina ida com braço direito e volta com esquerdo; marque parada antes da parede.", teacherRole: "Demonstrar fora da água, observar de lado e corrigir apenas um elemento por passagem.", studentRole: "Manter uma mão na prancha, executar ciclo completo com o outro braço e alternar no ponto marcado.", dosage: "6 passagens curtas, 3 por braço.",
    steps: ["Demonstre entrada da mão alinhada ao ombro e recuperação relaxada.", "O aluno inicia com pernada leve e um braço estendido na prancha.", "Execute um ciclo completo, recoloque a mão e repita no ritmo combinado.", "Na volta, troque o braço e aplique a única correção dada pelo professor."],
    successCriteria: "Completa o ciclo sem cruzar a mão à frente da cabeça.", easier: "Faça parado na borda e depois 5 metros.", harder: "Retire a prancha e use braço estendido à frente.", attention: "Evite muitas correções simultâneas; pare se a técnica se degradar por fadiga."
  },
  {
    titles: ["Seis pernadas e troca", "Crawl 6 por 1", "Pausa na flecha", "Braçada com ritmo", "Coordenação seis pernadas"],
    category: "Nado crawl", age: "8–12 anos", objective: "Coordenar estabilidade lateral, pernada e troca de braço.",
    materials: ["Nadadeira opcional para aluno já adaptado"], where: "Raia de 10 a 20 metros.", groupSize: "Um aluno por raia.",
    setup: "Marque distância curta e determine lado inicial.", teacherRole: "Demonstrar posição lateral, contar pernadas e observar alinhamento de cabeça.", studentRole: "Ficar lateralizado com um braço à frente, executar seis pernadas e trocar de lado com uma braçada.", dosage: "4 passagens com recuperação de 40 segundos.",
    steps: ["Treine a posição lateral segurando a borda.", "Inicie em flecha, gire levemente o tronco e mantenha uma orelha próxima do braço.", "Conte seis pernadas; faça uma braçada e troque o lado sem levantar a cabeça.", "Repita até a marca e encerre antes da parede."],
    successCriteria: "Troca de lado com o corpo alinhado e pernada contínua.", easier: "Use prancha pequena e quatro pernadas.", harder: "Integre respiração lateral a cada troca.", attention: "Use nadadeira somente com ajuste correto e supervisão; não é equipamento de segurança."
  },
  {
    titles: ["Janela da respiração lateral", "Uma orelha na água", "Respira e volta", "Crawl com janela", "Sincronia respiratória"],
    category: "Nado crawl", age: "8–12 anos", objective: "Inspirar lateralmente sem levantar a cabeça e expirar dentro da água.",
    materials: ["Prancha"], where: "Raia curta, professor caminhando na lateral.", groupSize: "Um aluno por raia.",
    setup: "Defina lado de respiração e ponto de parada a 8 ou 12 metros.", teacherRole: "Demonstrar rotação, observar posição da orelha e interromper apneia.", studentRole: "Expirar com rosto submerso, girar junto com o tronco, inspirar pela boca e voltar o rosto.", dosage: "6 passagens com 3 a 5 respirações cada.",
    steps: ["Treine na borda: rosto na água, bolhas, giro e volta.", "Faça pernada com prancha e braço do lado da respiração junto ao corpo.", "Gire mantendo uma orelha na água e um olho próximo da superfície.", "Integre uma braçada somente depois de três execuções controladas."],
    successCriteria: "Inspira lateralmente sem erguer a testa e mantém expiração aquática.", easier: "Exercício parado na borda.", harder: "Respiração bilateral a cada três braçadas.", attention: "Não permita retenção prolongada; pare em caso de tosse ou falta de ar."
  },
  {
    titles: ["Crawl com contagem", "Braçadas eficientes", "Desafio do mesmo tempo", "Comprimento do nado", "Ritmo e economia"],
    category: "Nado crawl", age: "9–12 anos", objective: "Relacionar frequência de braçadas, alinhamento e esforço percebido.",
    materials: ["Marcadores", "Ficha de registro"], where: "Raia de 15 a 25 metros.", groupSize: "Um aluno por raia; colega pode registrar fora da água.",
    setup: "Marque distância fixa e prepare três linhas de registro.", teacherRole: "Contar braçadas, comparar técnica e impedir redução artificial com retenção de ar.", studentRole: "Nadar em esforço confortável, informar percepção e testar uma correção por vez.", dosage: "3 passagens com 60 segundos de recuperação.",
    steps: ["Registre a contagem natural na primeira passagem.", "Na segunda, peça entrada mais distante e corpo alinhado, sem nadar mais devagar de propósito.", "Compare contagem e esforço, não apenas o menor número.", "Na terceira, repita a combinação mais eficiente e encerre com nado leve."],
    successCriteria: "Mantém técnica e respiração estáveis com esforço controlado.", easier: "Use 10 metros e apenas percepção fácil/médio/difícil.", harder: "Compare contagem em dois ritmos submáximos.", attention: "Não associe sucesso à apneia nem à exaustão."
  },
  {
    titles: ["Crawl entre portais", "Linha dos cotovelos", "Corredor de braçadas", "Mãos no trilho", "Precisão da entrada do crawl"],
    category: "Nado crawl", age: "8–12 anos", objective: "Manter entrada das mãos alinhada e direção do nado.",
    materials: ["Espaguetes laterais", "Marcadores"], where: "Raia curta com corredor visual amplo.", groupSize: "Um aluno por corredor.",
    setup: "Posicione referências fora do alcance dos braços, sem formar obstáculo fechado.", teacherRole: "Garantir corredor livre, observar da frente e dar comando de alinhamento.", studentRole: "Nadar crawl entrando com mãos dentro da largura dos ombros e manter trajetória central.", dosage: "5 passagens de 8 a 12 metros.",
    steps: ["Mostre em solo a largura correta das mãos.", "O aluno desliza pelo centro antes de iniciar braçadas.", "Peça que cada mão entre em seu próprio trilho sem cruzar a linha central.", "Ao fim, pare antes da parede e receba uma correção objetiva."],
    successCriteria: "Mantém direção e reduz cruzamento das mãos.", easier: "Braçada unilateral com prancha.", harder: "Integre respiração bilateral sem perder o trilho.", attention: "Referências não podem tocar, prender ou estreitar a passagem do nadador."
  },
  {
    titles: ["Braço alternado de costas", "Remada olhando o teto", "Setas do nado costas", "Círculo dos ombros", "Braçada dorsal técnica"],
    category: "Nado costas", age: "8–12 anos", objective: "Executar entrada e puxada alternadas no nado costas.",
    materials: ["Prancha opcional"], where: "Raia de 10 a 20 metros com chegada sinalizada.", groupSize: "Um aluno por raia.",
    setup: "Marque distância e coloque referência visível antes da parede.", teacherRole: "Demonstrar braço estendido, observar rotação e avisar chegada.", studentRole: "Manter olhar para cima, alternar braços e continuar pernada curta.", dosage: "6 passagens, alternando foco técnico.",
    steps: ["Ensine o círculo do braço em pé, com polegar saindo e dedo mínimo entrando.", "Inicie com pernada dorsal e braços ao lado do corpo.", "Acrescente um braço por vez, esperando o outro retornar à coxa.", "Passe à alternância contínua e encerre ao sinal de chegada."],
    successCriteria: "Braços alternam sem pausa longa e corpo mantém direção.", easier: "Um braço parado, outro trabalhando.", harder: "Alternância contínua com rotação controlada do tronco.", attention: "Mantenha comunicação de chegada para evitar impacto."
  },
  {
    titles: ["Copo na testa", "Olhar fixo no céu", "Cabeça tranquila", "Equilíbrio dorsal com objeto", "Estabilidade cervical no costas"],
    category: "Nado costas", age: "8–12 anos", objective: "Reduzir balanço excessivo da cabeça durante o nado costas.",
    materials: ["Copo plástico vazio ou objeto leve"], where: "Raia curta sem vento forte.", groupSize: "Um aluno por raia.",
    setup: "Use objeto leve e limpo, apoiado apenas na testa em percurso curto.", teacherRole: "Posicionar o objeto, caminhar ao lado e retirá-lo antes da parede.", studentRole: "Manter olhar para cima, cabeça estável e pernada suave.", dosage: "4 passagens de 6 a 10 metros.",
    steps: ["Teste parado em flutuação dorsal assistida.", "Coloque o objeto e peça somente pernada, braços ao lado.", "O aluno desloca-se sem tentar segurar o objeto com as mãos.", "Retire o objeto dois metros antes da parede e compare com uma passagem normal."],
    successCriteria: "Mantém cabeça estável sem tensionar pescoço.", easier: "Faça parado por cinco segundos.", harder: "Acrescente braçada unilateral.", attention: "Use objeto leve, sem quinas e que não cubra olhos ou vias aéreas."
  },
  {
    titles: ["Costas de lado a lado", "Ombro que aponta", "Rolamento dorsal", "Troca lateral no costas", "Rotação longitudinal"],
    category: "Nado costas", age: "9–12 anos", objective: "Coordenar rotação do tronco com braçada de costas.",
    materials: ["Nadadeira opcional"], where: "Raia de 12 a 20 metros.", groupSize: "Um aluno por raia.",
    setup: "Defina seis pernadas por lado antes da troca.", teacherRole: "Demonstrar rotação pelo tronco, observar alinhamento e limitar amplitude.", studentRole: "Manter cabeça estável, girar ombro e quadril juntos e trocar após a contagem.", dosage: "4 passagens.",
    steps: ["Treine posição lateral dorsal com apoio.", "Inicie de costas e faça seis pernadas com um ombro levemente fora da água.", "Troque de lado com uma braçada lenta, sem girar a cabeça.", "Após domínio, reduza para três pernadas por lado."],
    successCriteria: "Quadril e ombro giram juntos enquanto a cabeça permanece orientada.", easier: "Use prancha sobre as coxas.", harder: "Integre braçada contínua.", attention: "Evite rotação excessiva que leve o rosto para baixo."
  },
  {
    titles: ["Chegada segura de costas", "Contagem até a parede", "Mão que encontra a borda", "Final de raia dorsal", "Aproximação dorsal controlada"],
    category: "Nado costas", age: "8–12 anos", objective: "Aproximar-se da parede e tocar com segurança sem bater a cabeça.",
    materials: ["Marca visual lateral"], where: "Últimos 5 metros da raia.", groupSize: "Um aluno por vez na zona da parede.",
    setup: "Crie marca a 3 metros e mantenha professor junto à parede.", teacherRole: "Dar sinal sonoro ou visual, contar braçadas e proteger a zona de chegada.", studentRole: "Reduzir ritmo ao sinal, manter cabeça estável e tocar a parede com braço estendido.", dosage: "6 aproximações.",
    steps: ["Pratique toque parado com um braço estendido.", "Comece a 5 metros e avise quando cruzar a marca.", "Conte braçadas restantes e peça redução progressiva.", "O aluno toca, para e gira para posição vertical antes de sair da zona."],
    successCriteria: "Toca a parede com a mão antes de a cabeça se aproximar.", easier: "Comece a 3 metros com professor guiando.", harder: "Aluno identifica a marca e faz sua própria contagem.", attention: "Nunca deixe dois alunos se aproximarem da mesma parede simultaneamente."
  },
  {
    titles: ["Entrada sentada e retorno", "Senta, entra e segura", "Porta segura da piscina", "Giro para a borda", "Sequência de entrada controlada"],
    category: "Segurança", age: "3–7 anos", objective: "Entrar sentado, orientar-se e retornar imediatamente à borda.",
    materials: ["Borda antiderrapante"], where: "Zona rasa sem escada no ponto de entrada.", groupSize: "Um aluno por entrada.",
    setup: "Seque o ponto de espera e deixe a borda interna livre.", teacherRole: "Autorizar individualmente, posicionar-se à frente e apoiar tronco quando necessário.", studentRole: "Sentar, apoiar mãos, colocar pés, deslizar, girar e segurar a borda com duas mãos.", dosage: "4 entradas com saída pela escada.",
    steps: ["Mostre toda a sequência fora da água.", "Peça que o aluno sente com mãos ao lado e pés voltados para a água.", "No comando, ele desliza devagar enquanto o professor acompanha o tronco.", "Assim que entra, gira, segura a borda com duas mãos e espera autorização para deslocar-se."],
    successCriteria: "Entra somente no comando e encontra a borda sem ajuda excessiva.", easier: "Professor mantém apoio no tronco durante toda a entrada.", harder: "Após segurar, desloca-se dois metros até a escada.", attention: "Nunca permita entrada simultânea nem corrida na borda."
  },
  {
    titles: ["Salto no alvo", "Pulo do marinheiro", "Entrada em pé controlada", "Salta, gira e volta", "Orientação após salto"],
    category: "Saltos", age: "6–11 anos", objective: "Saltar em pé, emergir orientado e retornar à borda indicada.",
    materials: ["Alvo flutuante"], where: "Área cuja profundidade e regras permitam salto em pé, com zona livre.", groupSize: "Um aluno por salto.",
    setup: "Verifique profundidade, deixe o alvo à frente e marque fila longe da borda.", teacherRole: "Inspecionar a área, autorizar o salto e permanecer no ponto de emergência.", studentRole: "Aproximar-se andando, parar com pés paralelos, saltar para frente e voltar à borda.", dosage: "3 a 5 saltos.",
    steps: ["Explique que não há corrida e confirme a profundidade permitida.", "Posicione pés paralelos e braços à frente.", "Dê o comando somente com a área livre; o aluno salta em pé.", "Após emergir, procura o marcador, desloca-se até a borda e segura com duas mãos."],
    successCriteria: "Salta sem correr e executa retorno orientado.", easier: "Entrada sentada.", harder: "Varie a direção do retorno, nunca a segurança da entrada.", attention: "Não faça mergulho de cabeça em área rasa ou sem autorização técnica específica."
  },
  {
    titles: ["Giro e segura", "Volta para a parede", "Encontra a borda", "Meia-volta segura", "Orientação para saída"],
    category: "Segurança", age: "4–9 anos", objective: "Girar após afastamento curto e localizar a borda.",
    materials: ["Marcador visual na borda"], where: "Zona rasa a 1 ou 2 metros da borda.", groupSize: "Um aluno por tentativa.",
    setup: "Fixe marcador grande na borda e deixe professor entre aluno e área funda.", teacherRole: "Afastar o aluno somente dentro da competência, dar o sinal de giro e acompanhar ao alcance.", studentRole: "Girar, localizar o marcador, deslocar-se e segurar a borda.", dosage: "5 repetições alternando lado do giro.",
    steps: ["Mostre o marcador e pratique o giro com pés no chão.", "Afaste-se um metro mantendo apoio nas mãos do aluno.", "Dê o sinal; o aluno gira em direção ao marcador e inicia deslocamento.", "Ao chegar, segura com duas mãos e chama o professor antes de sair."],
    successCriteria: "Localiza a referência e retorna sem pânico ou direção aleatória.", easier: "Mantenha um pé no fundo e distância mínima.", harder: "Parta de flutuação dorsal assistida.", attention: "O professor deve bloquear fisicamente o acesso à área mais profunda."
  },
  {
    titles: ["Alcance sem entrar", "Espaguete de ajuda", "Resgate do brinquedo", "Deita e alcança", "Ajuda segura da borda"],
    category: "Segurança", age: "6–12 anos", objective: "Praticar alcance seguro a um objeto sem entrar na água.",
    materials: ["Espaguete", "Brinquedo flutuante"], where: "Borda seca ou pouco molhada, com professor dentro da água.", groupSize: "Um aluno executa; demais atrás da linha de espera.",
    setup: "Marque linha a um metro da borda e use somente brinquedo como alvo.", teacherRole: "Ensinar deitar com base estável, controlar distância e reforçar chamar um adulto.", studentRole: "Deitar, afastar pernas, estender o espaguete e puxar o objeto sem levantar o tronco.", dosage: "3 alcances de diferentes ângulos.",
    steps: ["Repita a regra: não entrar na água para ajudar; chamar um adulto.", "O aluno deita antes de se aproximar da borda e mantém pernas afastadas.", "Estende o espaguete até o brinquedo enquanto o professor estabiliza a situação.", "Puxa devagar, permanece deitado e só levanta após afastar-se da borda."],
    successCriteria: "Mantém centro de gravidade baixo e não pisa na água.", easier: "Alvo próximo e professor segurando o espaguete junto.", harder: "Mude o ângulo do alvo mantendo a mesma distância segura.", attention: "Use apenas objeto; nunca coloque outra criança como vítima de simulação."
  },
  {
    titles: ["Queda, giro e referência", "Caiu e encontrou a borda", "Orientação inesperada controlada", "Volta ao ponto seguro", "Recuperação de equilíbrio"],
    category: "Segurança", age: "7–12 anos", objective: "Recuperar orientação após entrada controlada e dirigir-se ao ponto seguro.",
    materials: ["Marcadores de borda"], where: "Área autorizada para entrada em pé e compatível com o aluno.", groupSize: "Um aluno por tentativa.",
    setup: "Defina um único ponto de retorno e mantenha professor dentro da água.", teacherRole: "Autorizar a entrada, observar toda a trajetória e encerrar diante de desorientação.", studentRole: "Entrar em pé, emergir, parar, localizar o marcador e retornar.", dosage: "3 tentativas com recuperação completa.",
    steps: ["Mostre o ponto seguro antes da entrada.", "Faça entrada em pé controlada, nunca empurrão ou surpresa.", "Ao emergir, o aluno respira, gira devagar e aponta o marcador.", "Desloca-se até a borda, segura com duas mãos e aguarda a saída."],
    successCriteria: "Localiza o ponto e retorna sem movimentos desordenados.", easier: "Entrada sentada.", harder: "Mude a orientação inicial mantendo o ponto visível.", attention: "Nunca simule queda inesperada empurrando o aluno."
  },
  {
    titles: ["Virada simples na parede", "Toca, gira e impulsiona", "Meia-volta do crawl", "Parede em quatro ações", "Transição técnica na borda"],
    category: "Técnica", age: "9–12 anos", objective: "Executar aproximação, toque, giro e impulso simples.",
    materials: ["Marca a 2 metros"], where: "Uma zona de parede por aluno.", groupSize: "Um aluno por vez.",
    setup: "Marque início a dois metros e mantenha raia ao lado vazia.", teacherRole: "Ensinar por partes, controlar a aproximação e liberar velocidade só após consistência.", studentRole: "Aproximar devagar, tocar, recolher joelhos, girar e impulsionar em flecha.", dosage: "6 repetições parciais e 4 completas.",
    steps: ["Pratique parado: tocar, flexionar joelhos e apoiar pés.", "Aproxime a partir de dois metros em velocidade baixa.", "Após o toque, gire lateralmente e coloque os dois pés na parede.", "Impulsione em flecha, deslize e só então retome a pernada."],
    successCriteria: "Mantém ordem das ações e sai alinhado.", easier: "Pratique somente toque e giro.", harder: "Integre três braçadas antes e depois da parede.", attention: "Mantenha a zona da parede exclusiva para um aluno."
  },
  {
    titles: ["Mini medley infantil", "Quatro estilos possíveis", "Sequência das habilidades", "Volta completa da turma", "Transições aquáticas"],
    category: "Sequência completa", age: "9–12 anos", objective: "Alternar habilidades já dominadas e organizar transições.",
    materials: ["Prancha", "Cones"], where: "Raia dividida em quatro trechos curtos.", groupSize: "Um aluno por raia.",
    setup: "Defina quatro trechos de 5 a 10 metros, somente com habilidades já ensinadas.", teacherRole: "Revisar cada trecho, observar fadiga e retirar qualquer estilo não dominado.", studentRole: "Completar cada trecho, fazer transição na marca e manter ritmo confortável.", dosage: "2 a 4 voltas, com 1 minuto de pausa.",
    steps: ["Trecho 1: deslize e pernada de crawl.", "Trecho 2: deslocamento dorsal com pernada de costas.", "Trecho 3: crawl completo com respiração confortável.", "Trecho 4: nado leve ou caminhada de volta à calma até a borda."],
    successCriteria: "Transita sem parar no meio da raia e preserva técnica segura.", easier: "Use dois trechos.", harder: "Aumente uma única distância, sem introduzir estilo novo.", attention: "Reduza imediatamente ao primeiro sinal de fadiga ou perda de coordenação."
  },
  {
    titles: ["Oceano das cores", "Expedição submarina", "Missão fundo do mar", "Aula dos exploradores", "Circuito temático do oceano"],
    category: "Aula temática", age: "4–9 anos", objective: "Integrar adaptação, respiração e deslocamento em história curta.",
    materials: ["Figuras marinhas", "Argolas", "Prancha"], where: "Zona rasa com três estações visíveis.", groupSize: "3 a 8 alunos.",
    setup: "Monte praia de entrada, caverna de argola e ilha da prancha em sentido único.", teacherRole: "Narrar sem esconder as regras, demonstrar cada estação e controlar fluxo.", studentRole: "Seguir a história executando entrada, bolhas, passagem e pernada.", dosage: "3 voltas de 6 a 8 minutos.",
    steps: ["Na praia, faça entrada sentada e caminhada até a primeira figura.", "Na caverna, passe pela argola ampla soltando bolhas.", "Na ilha, faça pernada com prancha até o cone.", "Retorne pela borda, saia pela escada e conte qual habilidade foi mais fácil."],
    successCriteria: "Mantém a ordem e executa habilidades sem perder as regras de segurança.", easier: "Duas estações sem imersão.", harder: "Inclua escolha entre percurso de flutuação ou propulsão.", attention: "A história nunca deve incentivar corrida, empurrão ou mergulho não autorizado."
  },
  {
    titles: ["Revezamento de pranchas", "Troca no porto", "Entrega do motor", "Ida e volta em equipe", "Ritmo coletivo de pernada"],
    category: "Dinâmica em grupo", age: "7–12 anos", objective: "Manter pernada técnica e realizar troca organizada em equipe.",
    materials: ["Pranchas", "Cones"], where: "Raias separadas, percurso de 8 a 15 metros.", groupSize: "Duplas ou trios.",
    setup: "Marque ponto de saída e troca; cada grupo usa uma prancha.", teacherRole: "Formar grupos equilibrados, controlar saídas e avaliar regularidade, não velocidade.", studentRole: "Fazer o percurso, parar, entregar a prancha e aguardar fora da rota.", dosage: "4 rodadas por equipe.",
    steps: ["Demonstre a entrega com os dois alunos parados.", "O primeiro faz pernada até o cone, contorna e retorna pelo mesmo corredor.", "Para com os pés no fundo e entrega diretamente ao colega.", "O professor encerra a rodada se houver saída antecipada ou cruzamento de raias."],
    successCriteria: "Todos concluem com troca parada e rota preservada.", easier: "Percurso raso de 5 metros.", harder: "Alterne ida ventral e volta dorsal.", attention: "Evite competição que leve a colisões ou perda de técnica."
  },
  {
    titles: ["Volta à calma guiada", "Nuvem de descanso", "Respira e alonga", "Passeio silencioso", "Recuperação aquática"],
    category: "Volta à calma", age: "5–12 anos", objective: "Reduzir intensidade, regular respiração e encerrar com rotina segura de saída.",
    materials: ["Espaguetes"], where: "Zona rasa tranquila, próxima da saída.", groupSize: "Até 8 alunos com espaço individual.",
    setup: "Distribua materiais antes de iniciar e deixe a escada livre.", teacherRole: "Conduzir ritmo lento, contar alunos e organizar saída um por vez.", studentRole: "Deslocar-se devagar, respirar normalmente, flutuar com apoio e responder à autoavaliação.", dosage: "5 a 8 minutos finais da aula.",
    steps: ["Faça uma volta de caminhada ou nado muito leve.", "Organize flutuação dorsal assistida de 15 a 25 segundos.", "Peça três respirações tranquilas e movimentos suaves de braços.", "Chame um aluno por vez para sair, confira a turma e recolha todos os materiais."],
    successCriteria: "Reduz ritmo, mantém organização e sai somente quando chamado.", easier: "Apenas caminhada lenta e respiração.", harder: "Inclua autoavaliação técnica curta, sem novo esforço.", attention: "A supervisão continua até o último aluno deixar a área da piscina."
  },
];

const formats = [
  {
    level: "Iniciante" as const, duration: 20, name: "demonstração guiada",
    setup: "Use apenas uma rota e deixe os alunos aguardando em ponto claramente demarcado.",
    teacher: "Demonstre uma vez, conduza individualmente e mantenha ajuda física somente onde for necessária.",
    student: "Executa após observar e confirma que entendeu o sinal de começar e parar.",
    dosage: "Priorize poucas repetições corretas e pausas completas.",
    opening: "Professor: apresente a regra de segurança e demonstre a atividade completa em velocidade lenta.",
    closing: "Professor e aluno: encerrem repetindo o ponto técnico principal e a rota de saída.",
    easier: "Reduza a distância, a duração ou a quantidade de ações.", harder: "Repita sem aumentar dificuldade até o aluno executar com tranquilidade."
  },
  {
    level: "Iniciante" as const, duration: 25, name: "missão lúdica",
    setup: "Acrescente uma história curta e um alvo visual, sem alterar a organização de segurança.",
    teacher: "Narrar a missão, demonstrar cada ação e interromper a história sempre que precisar corrigir segurança.",
    student: "Cumpre uma missão por vez e retorna ao ponto combinado antes da próxima.",
    dosage: "Faça duas rodadas de reconhecimento e duas rodadas da missão.",
    opening: "Professor: conte a missão em menos de um minuto e mostre exatamente onde ela começa e termina.",
    closing: "Aluno: diga qual ação realizou; professor: confirme a execução antes de mudar a história.",
    easier: "Retire parte da história e use um único alvo.", harder: "Inclua uma escolha simples entre duas rotas igualmente seguras."
  },
  {
    level: "Intermediário" as const, duration: 30, name: "trabalho em duplas",
    setup: "Organize duplas por nível; um aluno executa e o outro aguarda fora da trajetória.",
    teacher: "Controlar a troca, observar o executante e dar ao observador apenas um critério simples para identificar.",
    student: "Executa sua vez e depois observa sem tocar, empurrar ou corrigir fisicamente o colega.",
    dosage: "Alterne a função após cada tentativa e faça três ciclos completos.",
    opening: "Professor: demonstre a troca de funções e mostre onde o observador deve permanecer.",
    closing: "Dupla: cada aluno relata um acerto do colega; professor valida ou corrige a observação.",
    easier: "Professor assume a observação e a dupla apenas alterna as tentativas.", harder: "Peça que o observador identifique um critério técnico previamente ensinado."
  },
  {
    level: "Intermediário" as const, duration: 35, name: "circuito por estações",
    setup: "Transforme a tarefa em três estações progressivas, sempre em sentido único e com espaços independentes.",
    teacher: "Demonstrar as três estações, controlar o fluxo e bloquear qualquer avanço antes de a estação seguinte ficar livre.",
    student: "Executa, espera o sinal e avança sem ultrapassar ou voltar contra o fluxo.",
    dosage: "Faça três voltas; interrompa a volta se a técnica se perder.",
    opening: "Professor: percorra o circuito fora da água e confirme que todos conhecem entrada, transição e saída.",
    closing: "Turma: saia pela rota definida; professor conta alunos e recolhe os materiais.",
    easier: "Use duas estações e maior intervalo.", harder: "Acrescente uma mudança de direção somente na última estação."
  },
  {
    level: "Avançado" as const, duration: 40, name: "progressão técnica",
    setup: "Defina uma linha inicial, um ponto de observação e uma progressão mensurável de autonomia ou precisão.",
    teacher: "Observar uma execução completa, escolher uma única correção e só avançar após duas repetições consistentes.",
    student: "Executa, ouve a correção, repete conscientemente e informa esforço ou desconforto.",
    dosage: "Use blocos de duas repetições com 30 a 60 segundos de recuperação.",
    opening: "Professor: explique o critério de sucesso e faça uma tentativa diagnóstica sem cobrança de resultado.",
    closing: "Aluno: faz autoavaliação simples; professor registra se mantém, progride ou retorna uma etapa.",
    easier: "Volte ao apoio ou à distância anterior.", harder: "Aumente apenas uma variável: autonomia, distância ou precisão."
  },
];

export const trainings: Training[] = blueprints.flatMap((blueprint, blueprintIndex) =>
  formats.map((format, formatIndex) => ({
    id: `NK-${String(blueprintIndex * formats.length + formatIndex + 1).padStart(3, "0")}`,
    title: blueprint.titles[formatIndex],
    category: blueprint.category,
    age: blueprint.age,
    level: format.level,
    duration: format.duration,
    objective: blueprint.objective,
    materials: blueprint.materials,
    where: blueprint.where,
    groupSize: blueprint.groupSize,
    setup: `${blueprint.setup} Formato desta ficha: ${format.name}. ${format.setup}`,
    teacherRole: `${blueprint.teacherRole} ${format.teacher}`,
    studentRole: `${blueprint.studentRole} ${format.student}`,
    dosage: `${blueprint.dosage} ${format.dosage}`,
    steps: [format.opening, ...blueprint.steps, format.closing],
    successCriteria: blueprint.successCriteria,
    easier: `${blueprint.easier} ${format.easier}`,
    harder: `${blueprint.harder} ${format.harder}`,
    attention: blueprint.attention,
    image: ((blueprintIndex * 2 + formatIndex) % 6) + 1,
  }))
);
