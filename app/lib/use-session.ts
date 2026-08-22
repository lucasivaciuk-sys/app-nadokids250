"use client";

import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { getFirebaseAuth } from "./firebase";

export type MemberProfile = {
  uid: string;
  email: string;
  name: string;
  planComplete: boolean;
  smartSheets: boolean;
  assessmentPack: boolean;
  themedCalendar: boolean;
  createdAt: string;
  lastLoginAt: string;
};

async function apiWithToken(path: string, user: User, init?: RequestInit) {
  const token = await user.getIdToken();
  return fetch(path, {
    ...init,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });
}

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async (currentUser?: User | null) => {
    const activeUser = currentUser || user;
    if (!activeUser) return;
    try {
      const response = await apiWithToken("/api/me", activeUser);
      const data = (await response.json()) as { user?: MemberProfile; isAdmin?: boolean; error?: string };
      if (!response.ok || !data.user) throw new Error(data.error || "Não foi possível carregar o acesso.");
      setProfile(data.user);
      setIsAdmin(Boolean(data.isAdmin));
      setError("");
    } catch (sessionError) {
      setError(sessionError instanceof Error ? sessionError.message : "Falha ao carregar sua conta.");
    }
  }, [user]);

  useEffect(() => {
    let unsubscribe = () => {};
    void getFirebaseAuth()
      .then((auth) => {
        unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
          setUser(nextUser);
          setProfile(null);
          setIsAdmin(false);
          if (nextUser) await refresh(nextUser);
          setLoading(false);
        });
      })
      .catch(() => {
        setLoading(false);
        setError("O Firebase ainda não foi conectado a este site.");
      });
    return () => unsubscribe();
  }, [refresh]);

  return {
    user,
    profile,
    isAdmin,
    loading,
    error,
    refresh: () => refresh(),
    api: (path: string, init?: RequestInit) => {
      if (!user) throw new Error("UNAUTHENTICATED");
      return apiWithToken(path, user, init);
    },
    logout: async () => signOut(await getFirebaseAuth()),
  };
}
