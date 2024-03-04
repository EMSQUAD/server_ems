const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get, child } = require("firebase/database");

const firebaseConfig = {
    apiKey: "AIzaSyA2acgT8KjqXuhy5B48XbVyHmlC7xPdpfE",
    authDomain: "emsquad-firebase.firebaseapp.com",
    projectId: "emsquad-firebase",
    storageBucket: "emsquad-firebase.appspot.com",
    messagingSenderId: "326941243316",
    appId: "1:326941243316:web:c00ba5a3f50bd1ed4364e1",
    measurementId: "G-80DM5X1JHE",
    databaseURL: "https://emsquad-firebase-default-rtdb.europe-west1.firebasedatabase.app"
};

const _ = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db);

const saveToken = async (userId, token) => {
    const values = (await get(child(dbRef, `userTokens/${userId}/`))).val() ?? {};
    const payload = { ...values, token };
    set(ref(db, `userTokens/${userId}/`), payload);
};

module.exports = { saveToken };
