function readEnv(name: string) {
  const runtime = (globalThis as typeof globalThis & {
    __NADOKIDS_ENV__?: Record<string, string | undefined>;
  }).__NADOKIDS_ENV__;
  return runtime?.[name] || process.env[name];
}

export async function GET() {
  const firebase = {
    apiKey: readEnv("FIREBASE_API_KEY"),
    authDomain: readEnv("FIREBASE_AUTH_DOMAIN"),
    projectId: readEnv("FIREBASE_PROJECT_ID"),
    storageBucket: readEnv("FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: readEnv("FIREBASE_MESSAGING_SENDER_ID"),
    appId: readEnv("FIREBASE_APP_ID"),
    measurementId: readEnv("FIREBASE_MEASUREMENT_ID"),
  };
  return Response.json({
    ready: Boolean(firebase.apiKey && firebase.authDomain && firebase.projectId && firebase.appId),
    firebase,
  });
}
