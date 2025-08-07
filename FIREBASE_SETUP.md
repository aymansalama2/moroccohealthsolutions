# 🔥 Guide de Configuration Firebase

## Étapes de Configuration

### 1. Créer un Projet Firebase
1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet"
3. Nommez votre projet (ex: "medtours-maroc")
4. Désactivez Google Analytics (optionnel)
5. Cliquez sur "Créer le projet"

### 2. Configurer Firestore Database
1. Dans la console Firebase, allez dans "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Sélectionnez "Démarrer en mode test" (pour le développement)
4. Choisissez un emplacement proche (Europe ouest pour le Maroc)

### 3. Ajouter une Application Web
1. Dans les paramètres du projet, cliquez sur "Ajouter une application"
2. Sélectionnez l'icône Web (</>)
3. Nommez votre application (ex: "medtours-web")
4. Cochez "Configurer aussi Firebase Hosting" (optionnel)
5. Cliquez sur "Enregistrer l'application"

### 4. Copier la Configuration
Copiez le code de configuration qui s'affiche :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "medtours-maroc.firebaseapp.com",
  projectId: "medtours-maroc",
  storageBucket: "medtours-maroc.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

### 5. Mettre à Jour le Projet
Remplacez la configuration dans `src/firebase.js` :

```javascript
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// REMPLACEZ par votre configuration Firebase
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_DOMAIN.firebaseapp.com",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_BUCKET.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
```

### 6. Configurer les Règles Firestore

Dans la console Firebase, allez dans "Firestore Database" > "Règles" et remplacez par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permettre l'écriture des demandes de contact
    match /contact-requests/{document} {
      allow read, write: if true; // En production, ajoutez de la sécurité
    }
  }
}
```

**⚠️ IMPORTANT** : En production, sécurisez ces règles !

### 7. Tester la Configuration
1. Redémarrez votre serveur de développement : `npm run dev`
2. Remplissez le formulaire de contact
3. Vérifiez dans la console Firebase que les données apparaissent dans Firestore

## 🔒 Sécurisation pour la Production

### Règles Firestore Sécurisées
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contact-requests/{document} {
      // Permettre seulement l'écriture de nouveaux documents
      allow create: if request.auth == null && 
        validateContactRequest(request.resource.data);
      // Permettre la lecture seulement aux administrateurs authentifiés
      allow read: if request.auth != null && 
        request.auth.token.admin == true;
    }
  }
}

function validateContactRequest(data) {
  return data.keys().hasAll(['fullName', 'email', 'phone', 'country', 'services']) &&
    data.fullName is string && data.fullName.size() > 0 &&
    data.email is string && data.email.matches('.*@.*\\..*') &&
    data.phone is string && data.phone.size() > 0;
}
```

### Variables d'Environnement
Créez un fichier `.env` (ne pas committer) :

```bash
VITE_FIREBASE_API_KEY=votre-api-key
VITE_FIREBASE_AUTH_DOMAIN=votre-domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre-project-id
VITE_FIREBASE_STORAGE_BUCKET=votre-bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=votre-app-id
```

Puis dans `firebase.js` :
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 📊 Structure des Données

### Collection: `contact-requests`
```javascript
{
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+223 XX XX XX XX",
  country: "mali",
  clientCount: "5-10",
  preferredDate: "2024-02-15",
  services: ["Bilan de santé complet", "Tests sanguins spécialisés"],
  message: "Message optionnel du client",
  timestamp: "2024-01-15T10:30:00Z",
  status: "nouveau"
}
```

## 🚀 Déploiement Firebase Hosting

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter à Firebase
firebase login

# Initialiser le projet
firebase init hosting

# Build et deploy
npm run build
firebase deploy
```

---

✅ **Votre application est maintenant prête à recevoir des demandes de contact !**