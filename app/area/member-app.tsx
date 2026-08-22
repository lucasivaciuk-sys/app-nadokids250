"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { addOns, trainings, videoLessons, type Training } from "@/app/lib/catalog";
import { useSession } from "@/app/lib/use-session";
import AdminPanel from "./admin-panel";

const whatsapp = "https://wa.me/5513981900261?text=Ol%C3%A1%21%20Quero%20liberar%20um%20acesso%20no%20NadoKids%20250.";
type Tab = "home" | "trainings" | "videos" | "bonuses" | "addons" | "install" | "code" | "support" | "admin";

const tabLabels: [Tab, string, string][] = [
  ["home", "Início", "⌂"], ["trainings", "250 treinos", "▦"], ["videos", "Videoaulas", "▶"],
  ["bonuses", "Bônus", "★"], ["addons", "Adicionais", "✦"], ["install", "Como baixar", "⇩"], ["code", "Código de acesso", "#"], ["support", "Suporte", "?"],
];

const bonuses = [
  { id: "editable-sheets", icon: "▦", title: "Planilhas editáveis", description: "Planejamento semanal, presença, evolução e ficha individual para organizar cada turma.", deliverables: ["4 modelos editáveis", "Compatíveis com Excel e Google Planilhas", "Download imediato em CSV"] },
  { id: "printable-cards", icon: "▤", title: "Cards imprimíveis", description: "Fichas rápidas com objetivo, materiais, local, duração e orientação para aplicar na piscina.", deliverables: ["24 cards prontos para impressão", "Conteúdo extraído dos treinos", "Arquivo completo para baixar"] },
  { id: "themed-calendar-bonus", icon: "□", title: "Calendário temático", description: "Doze temas para distribuir aulas especiais durante o ano sem repetir sempre as mesmas propostas.", deliverables: ["12 meses organizados", "Tema e objetivo sugerido", "Materiais recomendados"] },
  { id: "age-level-matrix", icon: "⌗", title: "Matriz por idade e nível", description: "Consulta visual para escolher objetivos, atividades e adaptações adequadas para cada turma.", deliverables: ["4 faixas etárias", "3 níveis de aprendizagem", "Orientações de progressão"] },
] as const;

export default function MemberApp({ initialTab = "home" }: { initialTab?: Tab }) {
  const session = useSession();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [level, setLevel] = useState("Todos");
  const [selected, setSelected] = useState<Training | null>(null);
  const [activeBonus, setActiveBonus] = useState<string | null>(null);
  const [activeAddon, setActiveAddon] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [videoQuery, setVideoQuery] = useState("");
  const [code, setCode] = useState("");
  const [codeMessage, setCodeMessage] = useState("");

  const categories = useMemo(() => ["Todos", ...Array.from(new Set(trainings.map((item) => item.category)))], []);
  const filtered = useMemo(() => trainings.filter((item) =>
    (category === "Todos" || item.category === category) &&
    (level === "Todos" || item.level === level) &&
    `${item.title} ${item.objective}`.toLowerCase().includes(query.toLowerCase())
  ), [category, level, query]);
  const filteredVideos = useMemo(() => videoLessons.filter((video) =>
    `${video.title} ${video.focus} ${video.training}`.toLowerCase().includes(videoQuery.toLowerCase())
  ), [videoQuery]);

  async function redeem() {
    setCodeMessage("");
    try {
      const response = await session.api("/api/redeem", { method: "POST", body: JSON.stringify({ code }) });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Código inválido.");
      await session.refresh();
      setCode("");
      setCodeMessage("Acesso liberado com sucesso.");
    } catch {
      setCodeMessage("Código inválido, já utilizado ou indisponível.");
    }
  }

  if (session.loading) return <main className="member-loading">Carregando sua plataforma...</main>;
  if (!session.user) return <main className="member-loading"><div><h1>Entre para continuar</h1><p>{session.error}</p><Link className="member-primary" href="/entrar">IR PARA O LOGIN</Link></div></main>;
  const profile = session.profile;
  if (!profile) return <main className="member-loading"><div><h1>Não foi possível carregar seu acesso</h1><p>{session.error}</p></div></main>;

  const initials = profile.name.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const lockedComplete = !profile.planComplete;
  const visibleTabs: [Tab, string, string][] = session.isAdmin ? [...tabLabels, ["admin", "Administração", "⚙"]] : tabLabels;
  const activeTab: Tab = tab === "admin" && !session.isAdmin ? "home" : tab;

  function selectTab(nextTab: Tab) {
    setTab(nextTab);
    setMenuOpen(false);
  }

  function openLocked() {
    setTab("code");
    setCodeMessage("Este conteúdo exige o Plano Completo ou uma chave de liberação.");
  }

  return (
    <main className="member-app">
      <aside id="member-navigation" className={`member-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-heading"><div className="member-brand"><img src="/images/nadokids-swimmer-logo.png" alt="" width="42" height="42" /><strong>NadoKids 250</strong></div><button className="sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">×</button></div>
        <nav>
          {visibleTabs.map(([id, label, icon]) => (
            <button key={id} className={activeTab === id ? "active" : ""} onClick={() => selectTab(id)}><i>{icon}</i>{label}{(id === "videos" || id === "bonuses" || id === "addons") && lockedComplete ? <small>🔒</small> : null}</button>
          ))}
        </nav>
        <a className="sidebar-support" href={whatsapp} target="_blank" rel="noreferrer"><span>◉</span><div><strong>Falar com o suporte</strong><small>Atendimento pelo WhatsApp</small></div></a>
        <button className="logout-button" onClick={() => session.logout()}>Sair da conta</button>
      </aside>
      {menuOpen ? <button className="sidebar-backdrop" onClick={() => setMenuOpen(false)} aria-label="Fechar menu" /> : null}

      <section className="member-main">
        <header className="member-header">
          <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Abrir menu" aria-controls="member-navigation" aria-expanded={menuOpen}><span /><span /><span /></button>
          <div><small>ÁREA DE MEMBROS</small><strong>{profile.planComplete ? "Plano Completo" : "Plano Inicial"}</strong></div>
          <div className="profile-chip"><span>{initials}</span><div><strong>{profile.name}</strong><small>{profile.email}</small></div></div>
        </header>

        {activeTab === "home" ? <section className="dashboard-view">
          <div className="welcome-card"><div><span>BEM-VINDO À PLATAFORMA</span><h1>Planeje sua próxima aula sem começar do zero.</h1><p>Explore os 250 treinos detalhados e organize o conteúdo por objetivo, nível e duração.</p><button onClick={() => setTab("trainings")}>EXPLORAR TREINOS</button></div><div className="welcome-orb"><strong>250</strong><span>treinos</span></div></div>
          <div className="member-stats"><article><span>▦</span><div><strong>250</strong><small>Treinos disponíveis</small></div></article><article><span>✓</span><div><strong>15+</strong><small>Categorias e habilidades</small></div></article><article><span>▶</span><div><strong>{profile.planComplete ? "30" : "Bloqueadas"}</strong><small>Videoaulas em português</small></div></article></div>
          <div className="dashboard-grid"><article><h2>Comece por aqui</h2>{trainings.slice(0, 4).map((item) => <button key={item.id} onClick={() => setSelected(item)}><span className={`pool-photo pool-photo-${item.image}`} /><div><strong>{item.title}</strong><small>{item.age} • {item.duration} min</small></div><i>›</i></button>)}</article><article className="progress-card"><h2>Seu acesso</h2><div className="plan-badge">{profile.planComplete ? "COMPLETO" : "INICIAL"}</div><p>{profile.planComplete ? "250 treinos, 30 videoaulas e os 4 bônus liberados." : "Os 250 treinos estão liberados. Use uma chave para acessar o restante."}</p>{profile.planComplete ? <button onClick={() => setTab("bonuses")}>ABRIR MEUS BÔNUS</button> : <button onClick={() => setTab("code")}>INSERIR CÓDIGO DE ACESSO</button>}</article></div>
        </section> : null}

        {activeTab === "trainings" ? <section className="catalog-view"><div className="member-title"><span>BIBLIOTECA COMPLETA</span><h1>250 treinos realmente diferentes</h1><p>Cada ficha explica onde aplicar, como montar, o que o professor faz, o que o aluno faz, dosagem, execução e progressões.</p></div><div className="catalog-filters"><input placeholder="Buscar treino ou objetivo..." value={query} onChange={(event) => setQuery(event.target.value)} /><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select><select value={level} onChange={(event) => setLevel(event.target.value)}><option>Todos</option><option>Iniciante</option><option>Intermediário</option><option>Avançado</option></select></div><div className="results-count">{filtered.length} treinos encontrados</div><div className="training-grid">{filtered.map((item) => <article key={item.id}><span className={`training-photo pool-photo pool-photo-${item.image}`} /><div className="training-copy"><small>{item.id} • {item.category}</small><h2>{item.title}</h2><div><span>{item.age}</span><span>{item.level}</span><span>{item.duration} min</span></div><p>{item.objective}</p><button onClick={() => setSelected(item)}>ABRIR FICHA COMPLETA</button></div></article>)}</div></section> : null}

        {activeTab === "videos" ? <section className="catalog-view"><div className="member-title"><span>PLANO COMPLETO • 30 VÍDEOS</span><h1>Videoaulas em português</h1><p>Vídeos organizados por habilidade e relacionados diretamente aos treinos da biblioteca.</p></div>{lockedComplete ? <LockedPanel title="Videoaulas bloqueadas" text="Libere o Plano Completo com uma chave de acesso ou fale com o suporte." onCode={() => setTab("code")} /> : <><div className="video-search"><input value={videoQuery} onChange={(event) => setVideoQuery(event.target.value)} placeholder="Buscar por treino, habilidade ou assunto..." /><span>{filteredVideos.length} vídeos encontrados</span></div><div className="video-grid">{filteredVideos.map((video) => <article key={video.id}>{activeVideo === video.id ? <iframe src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <button className="video-cover" onClick={() => setActiveVideo(video.id)} aria-label={`Assistir ${video.title}`}><img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" /><span className="video-play">▶</span><small>ASSISTIR VIDEOAULA</small></button>}<div><small>{video.focus}</small><h2>{video.title}</h2><p>Relacionado ao treino: <strong>{video.training}</strong></p><a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">Abrir no YouTube ↗</a></div></article>)}</div><p className="video-source-note">Os vídeos são conteúdos externos em português hospedados no YouTube. A disponibilidade depende dos canais responsáveis.</p></>}</section> : null}

        {activeTab === "bonuses" ? <section className="catalog-view"><div className="member-title"><span>PLANO COMPLETO • ENTREGA INTEGRADA</span><h1>Seus 4 bônus</h1><p>Todos os materiais prometidos no site de vendas estão disponíveis aqui para abrir, consultar, imprimir ou baixar.</p></div>{lockedComplete ? <LockedPanel title="Bônus do Plano Completo" text="Libere o Plano Completo com uma chave de acesso para receber os quatro materiais." onCode={() => setTab("code")} /> : <><div className="bonus-summary"><span>✓</span><div><strong>4 bônus liberados na sua conta</strong><small>O acesso permanece vinculado ao seu login.</small></div></div><div className="bonus-grid">{bonuses.map((bonus, index) => <article key={bonus.id}><div className="bonus-number">BÔNUS {index + 1}</div><span className="bonus-icon">{bonus.icon}</span><small>ACESSO LIBERADO</small><h2>{bonus.title}</h2><p>{bonus.description}</p><ul>{bonus.deliverables.map((item) => <li key={item}>✓ {item}</li>)}</ul><button onClick={() => setActiveBonus(bonus.id)}>ABRIR BÔNUS</button></article>)}</div></>}</section> : null}

        {activeTab === "addons" ? <section className="catalog-view"><div className="member-title"><span>CONTEÚDOS ADICIONAIS</span><h1>Adicionais da sua plataforma</h1><p>Cada produto pode ser liberado individualmente por uma chave de acesso.</p></div><div className="addon-grid">{addOns.map((addon, index) => { const keys = ["smartSheets", "assessmentPack", "themedCalendar"] as const; const unlocked = profile[keys[index]]; return <article key={addon.id} className={unlocked ? "unlocked" : "locked"}><div className="addon-icon">{index === 0 ? "▦" : index === 1 ? "✓" : "□"}</div><small>{unlocked ? "ACESSO LIBERADO" : "ADICIONAL BLOQUEADO"}</small><h2>{addon.title}</h2><p>{addon.description}</p><ul>{addon.deliverables.map((item) => <li key={item}>{unlocked ? "✓" : "🔒"} {item}</li>)}</ul>{unlocked ? <button onClick={() => setActiveAddon(addon.id)}>ABRIR MATERIAL</button> : <button onClick={() => setTab("code")}>DESBLOQUEAR</button>}</article>; })}</div></section> : null}

        {activeTab === "install" ? <InstallGuide /> : null}

        {activeTab === "code" ? <section className="code-view"><div className="code-card"><span className="key-icon">⌁</span><small>LIBERAÇÃO DE CONTEÚDO</small><h1>Insira sua chave de acesso</h1><p>A chave pode liberar o Plano Completo, um adicional específico ou vários conteúdos de uma vez.</p><label>Código de acesso<input value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="NK-XXXX-XXXX-XXXX-XXXX" /></label>{codeMessage ? <div className="code-message">{codeMessage}</div> : null}<button className="member-primary" onClick={redeem} disabled={!code.trim()}>LIBERAR MEU ACESSO</button><a className="support-inline-button" href={whatsapp} target="_blank" rel="noreferrer">FALAR COM O SUPORTE</a></div></section> : null}

        {activeTab === "support" ? <section className="support-view"><div><span>SUPORTE NADOKIDS</span><h1>Precisa de ajuda?</h1><p>Fale com o suporte para localizar sua compra, receber sua chave ou tirar dúvidas sobre o acesso.</p><a className="member-primary" href={whatsapp} target="_blank" rel="noreferrer">FALAR PELO WHATSAPP</a></div></section> : null}

        {activeTab === "admin" && session.isAdmin ? <AdminPanel session={session} /> : null}
      </section>

      {selected ? <div className="training-modal" role="dialog" aria-modal="true" aria-label={selected.title}><button className="modal-backdrop" onClick={() => setSelected(null)} aria-label="Fechar" /><article><button className="modal-close" onClick={() => setSelected(null)}>×</button><span className={`modal-photo pool-photo pool-photo-${selected.image}`} /><div className="modal-content"><small>{selected.id} • {selected.category}</small><h1>{selected.title}</h1><div className="modal-tags"><span>{selected.age}</span><span>{selected.level}</span><span>{selected.duration} minutos</span></div><h3>Objetivo da atividade</h3><p>{selected.objective}</p><div className="training-detail-grid"><article><small>ONDE FAZER</small><p>{selected.where}</p></article><article><small>QUANTIDADE DE ALUNOS</small><p>{selected.groupSize}</p></article><article><small>MATERIAIS</small><p>{selected.materials.join(" • ")}</p></article><article><small>DOSAGEM</small><p>{selected.dosage}</p></article></div><h3>Como preparar o espaço</h3><p>{selected.setup}</p><div className="role-grid"><article><small>O QUE O PROFESSOR FAZ</small><p>{selected.teacherRole}</p></article><article><small>O QUE O ALUNO FAZ</small><p>{selected.studentRole}</p></article></div><h3>Execução passo a passo</h3><ol>{selected.steps.map((step, index) => <li key={`${index}-${step}`}><span>{index + 1}</span>{step}</li>)}</ol><h3>Como saber se foi bem executado</h3><p>{selected.successCriteria}</p><div className="progression-grid"><article><small>PARA FACILITAR</small><p>{selected.easier}</p></article><article><small>PARA PROGREDIR</small><p>{selected.harder}</p></article></div><div className="attention-box"><strong>Atenção do professor</strong><p>{selected.attention}</p></div><small className="safety-note">Adapte a profundidade, a distância e o apoio ao nível real da turma. Mantenha supervisão ativa e contínua; flutuadores recreativos não substituem equipamento de segurança nem vigilância profissional.</small></div></article></div> : null}
      {activeBonus ? <BonusMaterial bonusId={activeBonus} onClose={() => setActiveBonus(null)} /> : null}
      {activeAddon ? <AddonMaterial addonId={activeAddon} onClose={() => setActiveAddon(null)} /> : null}
    </main>
  );
}

const addonFiles: Record<string, { title: string; files: { name: string; filename: string; rows: string[][] }[] }> = {
  "smart-sheets": {
    title: "Planilhas Inteligentes",
    files: [
      { name: "Planejamento semanal", filename: "planejamento-semanal.csv", rows: [["Dia", "Turma", "Objetivo", "Aquecimento", "Atividade principal", "Volta à calma", "Duração"], ["Segunda", "Golfinhos", "Respiração", "Aquecimento dos animais", "Bolhas coloridas", "Flutuação guiada", "40 min"]] },
      { name: "Controle de presença", filename: "controle-presenca.csv", rows: [["Aluno", "Turma", "Data", "Presença", "Observação"], ["", "", "", "", ""]] },
      { name: "Evolução dos alunos", filename: "evolucao-alunos.csv", rows: [["Aluno", "Adaptação", "Respiração", "Flutuação", "Propulsão", "Autonomia", "Próximo objetivo"], ["", "Em desenvolvimento", "Em desenvolvimento", "", "", "", ""]] },
      { name: "Ficha individual", filename: "ficha-individual.csv", rows: [["Aluno", "Idade", "Nível", "Objetivo atual", "Cuidados", "Observações"], ["", "", "", "", "", ""]] },
    ],
  },
  "assessment-pack": {
    title: "Pack de Avaliação e Evolução",
    files: [
      { name: "Avaliação inicial", filename: "avaliacao-inicial.csv", rows: [["Habilidade", "Ainda não realiza", "Com ajuda", "Autônomo", "Observação"], ["Entrada segura", "", "", "", ""], ["Expiração na água", "", "", "", ""], ["Flutuação dorsal", "", "", "", ""], ["Retorno à borda", "", "", "", ""]] },
      { name: "Rubrica por habilidade", filename: "rubrica-habilidades.csv", rows: [["Nível", "Descrição"], ["1", "Necessita apoio integral"], ["2", "Realiza com apoio parcial"], ["3", "Realiza com orientação verbal"], ["4", "Realiza de forma autônoma e consistente"]] },
      { name: "Relatório de progresso", filename: "relatorio-progresso.csv", rows: [["Período", "Habilidades trabalhadas", "Avanços observados", "Pontos de atenção", "Próximos passos"], ["", "", "", "", ""]] },
    ],
  },
  "themed-calendar": {
    title: "Calendário de Aulas Temáticas",
    files: [{ name: "Calendário anual", filename: "calendario-aulas-tematicas.csv", rows: [["Mês", "Tema", "Objetivo sugerido", "Materiais"], ["Janeiro", "Exploradores do oceano", "Adaptação", "Argolas e brinquedos"], ["Fevereiro", "Carnaval aquático", "Coordenação", "Fitas e bolas"], ["Março", "Cores da piscina", "Orientação", "Objetos coloridos"], ["Abril", "Caça ao tesouro", "Imersão", "Argolas submersíveis"], ["Maio", "Super-heróis", "Propulsão", "Pranchas"], ["Junho", "Arraiá na água", "Equilíbrio", "Espaguetes"], ["Julho", "Circuito de férias", "Coordenação", "Cones e argolas"], ["Agosto", "Equipe de resgate", "Segurança", "Espaguetes"], ["Setembro", "Primavera aquática", "Respiração", "Flores de EVA"], ["Outubro", "Semana das crianças", "Jogos em grupo", "Bolas leves"], ["Novembro", "Desafio dos golfinhos", "Deslize", "Marcadores"], ["Dezembro", "Festival de habilidades", "Revisão", "Materiais variados"]] }],
  },
};

const ageLevelMatrix = [
  ["Faixa etária", "Iniciante", "Intermediário", "Avançado", "Prioridade do professor"],
  ["3 a 5 anos", "Adaptação, entrada segura e bolhas", "Flutuação com apoio e deslocamentos curtos", "Circuitos simples e autonomia supervisionada", "Linguagem lúdica, demonstração curta e apoio próximo"],
  ["5 a 7 anos", "Respiração, flutuação e retorno à borda", "Deslize, pernada e coordenação inicial", "Combinações de habilidades e pequenos desafios", "Repetições curtas, referências visuais e correção individual"],
  ["7 a 9 anos", "Domínio corporal e propulsão básica", "Coordenação de braços, pernas e respiração", "Técnica dos nados e resistência progressiva", "Qualidade do movimento antes de aumentar a distância"],
  ["9 a 12 anos", "Revisão técnica e segurança aquática", "Aprimoramento dos quatro nados", "Séries, viradas, ritmo e refinamento", "Dosagem por nível, feedback objetivo e autonomia responsável"],
];

const bonusFiles: Record<string, { title: string; intro: string; files: { name: string; filename: string; rows: string[][] }[] }> = {
  "editable-sheets": {
    title: "Planilhas editáveis",
    intro: "Baixe os quatro modelos e personalize nomes, turmas, datas, objetivos e observações.",
    files: addonFiles["smart-sheets"].files,
  },
  "themed-calendar-bonus": {
    title: "Calendário de aulas temáticas",
    intro: "Use o calendário anual como ponto de partida e adapte cada tema à realidade da sua piscina.",
    files: addonFiles["themed-calendar"].files,
  },
  "age-level-matrix": {
    title: "Matriz por idade e nível",
    intro: "Consulte a prioridade sugerida para cada grupo e baixe a matriz para editar ou compartilhar com a equipe.",
    files: [{ name: "Matriz completa por idade e nível", filename: "matriz-idade-nivel.csv", rows: ageLevelMatrix }],
  },
};

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(";")).join("\n");
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function BonusMaterial({ bonusId, onClose }: { bonusId: string; onClose: () => void }) {
  const printableTrainings = trainings.slice(0, 24);
  const bonus = bonuses.find((item) => item.id === bonusId);
  if (!bonus) return null;

  if (bonusId === "printable-cards") {
    const cardRows = [
      ["Treino", "Categoria", "Faixa etária", "Nível", "Duração", "Objetivo", "Materiais", "Onde fazer", "Orientação do professor"],
      ...printableTrainings.map((item) => [item.title, item.category, item.age, item.level, `${item.duration} min`, item.objective, item.materials.join(", "), item.where, item.teacherRole]),
    ];
    return <div className="training-modal bonus-material-modal" role="dialog" aria-modal="true" aria-label={bonus.title}><button className="modal-backdrop" onClick={onClose} aria-label="Fechar" /><article><button className="modal-close" onClick={onClose}>×</button><div className="modal-content"><small>BÔNUS 2 • MATERIAL LIBERADO</small><h1>Cards imprimíveis de atividades</h1><p>Escolha imprimir para levar as fichas à piscina ou baixe a versão completa em CSV.</p><div className="bonus-actions"><button onClick={() => window.print()}>IMPRIMIR 24 CARDS</button><button className="secondary" onClick={() => downloadCsv("cards-imprimiveis-nadokids.csv", cardRows)}>BAIXAR CSV</button></div><div className="printable-bonus"><header><strong>NadoKids 250</strong><span>Cards rápidos de atividades</span></header><div className="printable-card-grid">{printableTrainings.map((item, index) => <article key={item.id}><small>CARD {String(index + 1).padStart(2, "0")} • {item.category}</small><h2>{item.title}</h2><div><span>{item.age}</span><span>{item.level}</span><span>{item.duration} min</span></div><h3>Objetivo</h3><p>{item.objective}</p><h3>Materiais</h3><p>{item.materials.join(" • ")}</p><h3>Aplicação rápida</h3><p>{item.teacherRole}</p></article>)}</div></div></div></article></div>;
  }

  const material = bonusFiles[bonusId];
  if (!material) return null;
  return <div className="training-modal bonus-material-modal" role="dialog" aria-modal="true" aria-label={material.title}><button className="modal-backdrop" onClick={onClose} aria-label="Fechar" /><article><button className="modal-close" onClick={onClose}>×</button><div className="modal-content"><small>BÔNUS DO PLANO COMPLETO • MATERIAL LIBERADO</small><h1>{material.title}</h1><p>{material.intro}</p>{bonusId === "age-level-matrix" ? <div className="matrix-preview"><table><thead><tr>{ageLevelMatrix[0].map((cell) => <th key={cell}>{cell}</th>)}</tr></thead><tbody>{ageLevelMatrix.slice(1).map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div> : null}<div className="download-list">{material.files.map((file) => <article key={file.filename}><div><strong>{file.name}</strong><small>{file.rows.length - 1} linha(s) de conteúdo • formato editável</small></div><button onClick={() => downloadCsv(file.filename, file.rows)}>BAIXAR CSV</button></article>)}</div></div></article></div>;
}

function AddonMaterial({ addonId, onClose }: { addonId: string; onClose: () => void }) {
  const material = addonFiles[addonId];
  if (!material) return null;
  return <div className="training-modal addon-modal" role="dialog" aria-modal="true" aria-label={material.title}><button className="modal-backdrop" onClick={onClose} aria-label="Fechar" /><article><button className="modal-close" onClick={onClose}>×</button><div className="modal-content"><small>MATERIAL LIBERADO</small><h1>{material.title}</h1><p>Baixe os arquivos em CSV para abrir e editar no Excel, Google Planilhas ou aplicativo compatível.</p><div className="download-list">{material.files.map((file) => <article key={file.filename}><div><strong>{file.name}</strong><small>{file.rows.length - 1} linha(s) de modelo • formato editável</small></div><button onClick={() => downloadCsv(file.filename, file.rows)}>BAIXAR CSV</button></article>)}</div></div></article></div>;
}

function LockedPanel({ title, text, onCode }: { title: string; text: string; onCode: () => void }) {
  return <div className="locked-panel"><span>🔒</span><h2>{title}</h2><p>{text}</p><button className="member-primary" onClick={onCode}>INSERIR CHAVE DE ACESSO</button><a href={whatsapp} target="_blank" rel="noreferrer">Falar com o suporte</a></div>;
}

function InstallGuide() {
  return <section className="install-view"><div className="member-title"><span>ACESSO RÁPIDO</span><h1>Baixe o NadoKids no seu celular</h1><p>Não precisa procurar em loja. Adicione este aplicativo à tela inicial e abra como qualquer outro app.</p></div><div className="install-hero"><img src="/images/nadokids-swimmer-logo.png" alt="Ícone azul do NadoKids 250 com nadador branco" width="160" height="160" /><div><small>ÍCONE DO APLICATIVO</small><h2>NadoKids 250</h2><p>Depois da instalação, esta mesma imagem azul aparecerá na tela inicial do celular.</p></div></div><div className="install-platforms"><article><span className="platform-label">IPHONE • SAFARI</span><h2>Como adicionar no iPhone</h2><ol><li><i>1</i><div><strong>Abra pelo Safari</strong><p>Use o navegador Safari. Se estiver em outro navegador, copie o endereço e abra no Safari.</p></div></li><li><i>2</i><div><strong>Toque em Compartilhar</strong><p>É o ícone de um quadrado com uma seta apontando para cima, na barra do navegador.</p></div></li><li><i>3</i><div><strong>Escolha “Adicionar à Tela de Início”</strong><p>Role a lista de opções até encontrar esse texto.</p></div></li><li><i>4</i><div><strong>Confirme em “Adicionar”</strong><p>Mantenha o nome NadoKids 250 e toque em Adicionar no canto superior.</p></div></li></ol></article><article><span className="platform-label">ANDROID • CHROME</span><h2>Como instalar no Android</h2><ol><li><i>1</i><div><strong>Abra pelo Google Chrome</strong><p>Acesse sua conta normalmente usando o Chrome.</p></div></li><li><i>2</i><div><strong>Toque nos três pontos</strong><p>Abra o menu no canto superior direito do navegador.</p></div></li><li><i>3</i><div><strong>Toque em “Instalar app”</strong><p>Em alguns celulares aparece como “Adicionar à tela inicial”.</p></div></li><li><i>4</i><div><strong>Confirme a instalação</strong><p>Toque em Instalar ou Adicionar. O ícone ficará junto aos demais aplicativos.</p></div></li></ol></article></div><div className="install-note"><strong>Importante</strong><p>Seu login continua o mesmo. Instalar apenas cria um atalho do aplicativo; seus acessos e seu plano permanecem vinculados à conta.</p></div></section>;
}
