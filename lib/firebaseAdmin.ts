import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app"
import { getFirestore, type Firestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"

interface FirebaseAdminAppParams {
  projectId: string
  clientEmail: string
  storageBucket: string
  privateKey: string
}

function formatPrivateKey(key: string) {
  return key.replace(/\n/g, "\n")
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams): App {
  if (getApps().length > 0) {
    return getApp()
  }

  return initializeApp({
    credential: cert({
      projectId: params.projectId,
      clientEmail: params.clientEmail,
      privateKey: formatPrivateKey(params.privateKey),
    }),
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  })
}

export async function initAdmin(): Promise<App> {
  return createFirebaseAdminApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  })
}

/** 取得 Firestore（必要時自動初始化 App） */
export async function getAdminDb(): Promise<Firestore> {
  return getFirestore(await initAdmin())
}

/** 取得 Storage 的預設 bucket（必要時自動初始化 App） */
export async function getAdminBucket() {
  return getStorage(await initAdmin()).bucket()
}
