"use client";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getFirebaseAuth } from "@/app/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const firebaseAuth = await getFirebaseAuth();
      const credential = mode === "register"
        ? await createUserWithEmailAndPassword(firebaseAuth, email.trim(), password)
        : await signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
      if (mode === "register" && name.trim()) await updateProfile(credential.user, { displayName: name.trim() });
      const token = await credential.user.getIdToken(true);
      const syncResponse = await fetch("/api/auth/sync", {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
      });
      const synced = (await syncResponse.json()) as { isAdmin?: boolean };
      router.push(synced.isAdmin ? "/admin" : "/area");
    } catch {
      setError("Não foi possível entrar. Confira o e-mail e a senha ou crie uma conta.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="member-brand"><img src="/images/nadokids-swimmer-logo.png" alt="" width="42" height="42" /><strong>NadoKids 250</strong></div>
        <span className="auth-kicker">ÁREA DE MEMBROS</span>
        <h1>{mode === "login" ? "Acesse seus treinos" : "Crie seu acesso"}</h1>
        <p>{mode === "login" ? "Entre com o e-mail usado na compra." : "Toda nova conta começa no Plano Inicial."}</p>

        <div className="auth-tabs">
          <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Entrar</button>
          <button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>Criar conta</button>
        </div>

        <form onSubmit={submit}>
          {mode === "register" ? (
            <label>Nome<input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" /></label>
          ) : null}
          <label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
          <label>Senha<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} /></label>
          {error ? <div className="form-error">{error}</div> : null}
          <button className="member-primary" type="submit" disabled={busy}>{busy ? "AGUARDE..." : mode === "login" ? "ENTRAR NA PLATAFORMA" : "CRIAR CONTA GRATUITA"}</button>
        </form>
        <small className="auth-note">Se comprou o Plano Completo ou um adicional, use sua chave de acesso após entrar.</small>
      </section>
    </main>
  );
}
