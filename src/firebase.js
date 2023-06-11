console.log("firebase doc");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { userValidation } from "./userValidation.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX2frIeUE6yu5KMoO6KM6Ih9AtiZlkhNE",
  authDomain: "proyectocomentarios-54b38.firebaseapp.com",
  projectId: "proyectocomentarios-54b38",
  storageBucket: "proyectocomentarios-54b38.appspot.com",
  messagingSenderId: "99426446216",
  appId: "1:99426446216:web:f13cbe77ceb2ab836aa83d",
  measurementId: "G-7VJ5Z326Z2",
};

// Initialize Firebase, firestore, Storage, Auth
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export const auth = getAuth(app);

let userId = "";

onAuthStateChanged(auth, async (user) => {
  console.log("hubo un cambio en auth");
  if (user) {
    userId = user.uid;
    const userInfo = await getUserInfo(userId);
    let addProduct = document.querySelector(".addProduct");
    if (userInfo.admin) {
      addProduct.style.display = "flex";
    } else {
      addProduct.style.display = "none";
    }
    //const uid = user.uid;
    userValidation(true, user.email);
    console.log("entro");
  } else {
    userValidation(false);
  }
});


export async function getUserInfo(id) {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.log(error);
  }
}

export async function getProdcuts() {
  const allProducts = [];

  const querySnapshot = await getDocs(collection(db, "productos"));
  querySnapshot.forEach((doc) => {
    allProducts.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return allProducts;
}

export async function getProductsAdded() {
  const newProducts = [];

  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    newProducts.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return newProducts;
}

/////////////Uploades

export async function addProduct(product) {
  try {
    const docRef = await addDoc(collection(db, "productos"), product);

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addProductWithId(product, id) {
  try {
    // const imageUrl = await uploadFile(file.name, file, 'products');

    await setDoc(doc(db, "products", id), {
      ...product,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function uploadFile(name, file, folder) {
  const taskImgRef = ref(storage, `${folder}/${name}`);

  try {
    await uploadBytes(taskImgRef, file);
    const url = await getDownloadURL(taskImgRef);
    return url;
  } catch (error) {
    console.log("error creando imagen ->", error);
  }
}

//crear usuarios

export async function createUser(email, password, username, file) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Signed in
    const user = userCredential.user;

    /// subir imagen
    const imageUrl = await uploadFile(file.name, file, "users");

    /// crear registro en BD
    await addUserToDB(
      {
        username,
        imageUrl,
        email,
        admin: false,
      },
      user.uid
    );

    return {
      status: true,
      info: user.uid,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      status: false,
      info: errorMessage,
    };
  }
}

//log-in del usuario

export async function logInUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return {
      status: true,
      info: user.uid,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      status: false,
      info: errorMessage,
    };
  }
}

//logOut del usuario

export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
}

export async function addUserToDB(userData, uid) {
  console.log("userData ---->", userData);
  console.log("uid ---->", uid);
  try {
    const docRef = await setDoc(doc(db, "users", uid), userData);
    const cartref = await setDoc(doc(db, "carts", uid), {
      products: [],
    });

    console.log(docRef);
    console.log(cartref);

    console.log("User written with ID: ", uid);
  } catch (e) {
    console.error("Error adding user: ", e);
  }
}

export async function getCarrito(userId) {
  const carritoProduct = [];

  try {
    const docRef = doc(db, "carts", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.log(error);
  }
}

//console.log(getCarrito())
