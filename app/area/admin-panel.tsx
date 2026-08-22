"use client";

import { useEffect, useState } from "react";
import { type MemberProfile, useSession } from "@/app/lib/use-session";

const scopeOptions = [
  ["planComplete", "Plano Completo"],
  ["smartSheets", "Planilhas Inteligentes"],
  ["assessmentPack", "Pack de Avaliação"],
  ["themedCalendar", "Calendário Temático"],
] as const;

type AdminSession = Pick<ReturnType<typeof useSession>, "user" | "isAdmin" | "api">;

export default function AdminPanel({ session }: { session: AdminSession }) {
  const [users, setUsers] = useState<MemberProfile[]>([]);
  const [scopes, setScopes] = useState<string[]>(["planComplete"]);
  const [label, setLabel] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [message, setMessage] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);

  async function loadUsers() {
    if (!session.user || !session.isAdmin) return;
    setLoadingUsers(true);
    try {
      const response = await session.api("/api/admin/users");
      const data = (await response.json()) as { users?: MemberProfile[]; error?: string };
      if (!response.ok) throw new Error(data.error || "Falha ao carregar usuários.");
      setUsers(data.users || []);
    } catch {
      setMessage("Não foi possível carregar os usuários agora.");
    } finally {
      setLoadingUsers(false);
    }
  }

  useEffect(() => {
    if (session.isAdmin) void loadUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.isAdmin]);

  function toggleScope(scope: string) {
    setScopes((current) => current.includes(scope) ? current.filter((item) => item !== scope) : [...current, scope]);
  }

  async function generateCode() {
    setMessage("");
    setGeneratedCode("");
    try {
      const response = await session.api("/api/admin/codes", { method: "POST", body: JSON.stringify({ scopes, label }) });
      const data = (await response.json()) as { code?: string; error?: string };
      if (!response.ok || !data.code) throw new Error(data.error || "Falha ao gerar código.");
      setGeneratedCode(data.code);
      setMessage("Código criado. Ele poderá ser usado uma única vez.");
    } catch {
      setMessage("Selecione pelo menos um acesso e tente novamente.");
    }
  }

  async function updateUser(user: MemberProfile, field: keyof Pick<MemberProfile, "planComplete" | "smartSheets" | "assessmentPack" | "themedCalendar">) {
    const updated = { ...user, [field]: !user[field] };
    setUsers((current) => current.map((item) => item.uid === user.uid ? updated : item));
    const response = await session.api("/api/admin/users", { method: "POST", body: JSON.stringify(updated) });
    if (!response.ok) {
      setUsers((current) => current.map((item) => item.uid === user.uid ? user : item));
      setMessage("Não foi possível alterar esse acesso.");
    }
  }

  async function deleteUser(user: MemberProfile) {
    const confirmed = window.confirm(`Excluir a conta de ${user.name} (${user.email})? O acesso será bloqueado imediatamente.`);
    if (!confirmed) return;
    setMessage("");
    const response = await session.api("/api/admin/users", { method: "DELETE", body: JSON.stringify({ uid: user.uid }) });
    if (!response.ok) {
      setMessage("Não foi possível excluir essa conta.");
      return;
    }
    setUsers((current) => current.filter((item) => item.uid !== user.uid));
    setMessage("Conta removida e acesso bloqueado.");
  }

  return (
    <section className="admin-main admin-inline">
      <header>
        <div><span>CONTROLE DE ACESSOS</span><h1>Administração</h1><p>Gerencie clientes, planos, adicionais e chaves sem sair da plataforma.</p></div>
        <button onClick={loadUsers}>{loadingUsers ? "CARREGANDO..." : "ATUALIZAR USUÁRIOS"}</button>
      </header>

      <div className="admin-summary">
        <article><small>USUÁRIOS</small><strong>{users.length}</strong></article>
        <article><small>PLANO COMPLETO</small><strong>{users.filter((user) => user.planComplete).length}</strong></article>
        <article><small>ADICIONAIS LIBERADOS</small><strong>{users.reduce((sum, user) => sum + Number(user.smartSheets) + Number(user.assessmentPack) + Number(user.themedCalendar), 0)}</strong></article>
      </div>

      <section className="code-generator">
        <div><span>GERAR CÓDIGO DE ACESSO</span><h2>Escolha o que será liberado</h2><p>Você pode gerar uma única chave para um ou vários conteúdos. Cada código funciona uma vez.</p></div>
        <label>Identificação interna<input value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Ex.: Pedido 1042 — Maria" /></label>
        <div className="scope-checks">{scopeOptions.map(([id, text]) => <label key={id}><input type="checkbox" checked={scopes.includes(id)} onChange={() => toggleScope(id)} /><span><i>{scopes.includes(id) ? "✓" : ""}</i>{text}</span></label>)}</div>
        <button className="member-primary" onClick={generateCode}>GERAR CÓDIGO ÚNICO</button>
        {generatedCode ? <div className="generated-code"><small>CÓDIGO GERADO</small><strong>{generatedCode}</strong><button onClick={() => navigator.clipboard.writeText(generatedCode)}>COPIAR</button></div> : null}
        {message ? <p className="admin-message">{message}</p> : null}
      </section>

      <section className="user-control">
        <div className="user-control-title"><div><span>CLIENTES CADASTRADOS</span><h2>Usuários e permissões</h2></div><small>{loadingUsers ? "Carregando..." : `${users.length} contas`}</small></div>
        <div className="users-table"><div className="users-head"><span>Cliente</span><span>Completo</span><span>Planilhas</span><span>Avaliação</span><span>Calendário</span><span>Ações</span></div>{users.map((user) => <div className="user-row" key={user.uid}><div><strong>{user.name}</strong><small>{user.email}</small></div>{scopeOptions.map(([field, text]) => <label key={field} title={text}><input type="checkbox" checked={Boolean(user[field])} onChange={() => updateUser(user, field)} /><i /></label>)}{user.uid === session.user?.uid ? <small className="admin-self">ADMIN</small> : <button className="delete-user-button" onClick={() => deleteUser(user)}>EXCLUIR</button>}</div>)}</div>
      </section>
    </section>
  );
}
