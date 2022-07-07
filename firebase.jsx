import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB8aywpkHcdfy-E7XACeKCdPqiF4HJDs-8",
  authDomain: "whatsapp-clone-aa5cf.firebaseapp.com",
  projectId: "whatsapp-clone-aa5cf",
  storageBucket: "whatsapp-clone-aa5cf.appspot.com",
  messagingSenderId: "88645937031",
  appId: "1:88645937031:web:c5be32a13bec6980191522",
  measurementId: "G-M9R57R1DVG"
};
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth,provider };
  export default db;