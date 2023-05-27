// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    setDoc,
    doc,
} from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAX2frIeUE6yu5KMoO6KM6Ih9AtiZlkhNE",
    authDomain: "proyectocomentarios-54b38.firebaseapp.com",
    projectId: "proyectocomentarios-54b38",
    storageBucket: "proyectocomentarios-54b38.appspot.com",
    messagingSenderId: "99426446216",
    appId: "1:99426446216:web:f13cbe77ceb2ab836aa83d",
    measurementId: "G-7VJ5Z326Z2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export async function getProdcuts() {
    const allProducts = [];

    const querySnapshot = await getDocs(collection(db, "productos"));
    querySnapshot.forEach((doc) => {
        console.log("hola🐸");
        allProducts.push({
            ...doc.data(),
            id: doc.id
        });
    });

    return allProducts;
}
  