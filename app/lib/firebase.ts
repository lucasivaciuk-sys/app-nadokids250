"use client";

import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

let authPromise: Promise<Auth> | null = null;

export function getFirebaseAuth() {
  if (!authPromise) {
    authPromise = fetch("/api/config")
      .then(async (response) => {
        const data = (await response.json()) as { firebase?: FirebaseOptions; ready?: boolean };
        if (!response.ok || !data.ready || !data.firebase) throw new Error("FIREBASE_NOT_CONFIGURED");
        const app = getApps().length ? getApp() : initializeApp(data.firebase);
        return getAuth(app);
      });
  }
  return authPromise;
}
