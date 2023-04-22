// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getAuth } from "firebase/auth";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwYeuLt0RQRrO7b2QmlcHkXSL8JWbHJpo",
  authDomain: "arrigut-app.firebaseapp.com",
  projectId: "arrigut-app",
  storageBucket: "arrigut-app.appspot.com",
  messagingSenderId: "324715284384",
  appId: "1:324715284384:web:e9f1b1a3ce2e2f9a2b86c5",
  measurementId: "G-539418YJ5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
const db = getFirestore(app);


// existe usuario, en este caso si existe el unico usuario que puede entrar, yo
export async function userExists(uid) {
  // donde queremos buscar la refetencia, mandar llamar funcion que busca referencia
  // cuando buscas en un documento que ya sabes
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);

  // console.log(res);
  // devuelve si existe o no
  return res.exists();
}

export async function signOut() {
  await auth.signOut();
}

export async function getUserInfo(uid) {
  // console.log(uid)
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.log(error);
  }
}

//

export async function insertProducto(verb, type, docId) {
  try {
    // para enviar datos, docRef recibe la coleccion creo y res envia los datos
    // const docRef = collection(db, type);
    const docRef = doc(db, type, docId);
    // creo que envia los datos
    // const res = await addDoc(docRef, verb);
    const res = await setDoc(docRef, verb);
    // console.log(res)
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProducto(docId, verb, type) {
  try {
    const docRef = doc(db, type, docId);
    const res = await setDoc(docRef, verb);
    return res;
  } catch (error) {
    console.log(error);
  }
}

// para cargar los links cuando carga la pagina en el dashboard
export async function getLinks(type) {
  // console.log("s9")
  const links = [];
  try {
    const collectionRef = collection(db, type);
    // const q = query(collectionRef, where("uid", "==", uid));
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const link = { ...doc.data() };
      link.docId = doc.id;
      links.push(link);
    });

    // console.log(links)
    return links;
  } catch (error) {
    console.log(error);
  }
}

// creo que docRef, osea doc solo busca, y ya haces con eso despues lo que sea

export async function deleteProducto(docId, type) {
  try {
    // console.log(docId)
    const docRef = doc(db, type, docId);
    const res = await deleteDoc(docRef);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function existsProductosMode(verbMode) {
  // console.log(username)
  const verbModes = [];
  // cuando buscas en varios documentos donde no sabes
  // const docsRef = collection(db, "types");
  const q = query(collection(db, "types"), where("type", "==", verbMode));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    verbModes.push(doc.data());
  });
  // console.log(users)

  return verbModes.length > 0 ? verbModes[0].type : null;
}

export async function deleteType(type) {
  console.log("eliminar");
}
