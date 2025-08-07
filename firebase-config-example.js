// Configuration Firebase - Instructions d'installation
// 
// 1. Créez un projet Firebase sur https://console.firebase.google.com/
// 2. Activez Firestore Database
// 3. Copiez vos clés de configuration ici
// 4. Remplacez les valeurs dans src/firebase.js

const firebaseConfig = {
  apiKey: "votre-api-key",
  authDomain: "votre-project.firebaseapp.com",
  projectId: "votre-project-id",
  storageBucket: "votre-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "votre-app-id"
};

// Instructions pour Firestore:
// 1. Allez dans "Firestore Database" dans la console Firebase
// 2. Créez la base de données en mode test (ou production avec règles de sécurité)
// 3. Les collections seront créées automatiquement par l'application:
//    - "contact-requests" : pour stocker les demandes de contact

export default firebaseConfig;