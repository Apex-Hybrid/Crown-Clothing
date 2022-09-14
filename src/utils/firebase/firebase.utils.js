import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDPKZt6x2AtMO_kFYQdjFPtfaDKgwonijc",
    authDomain: "crown-7d054.firebaseapp.com",
    projectId: "crown-7d054",
    storageBucket: "crown-7d054.appspot.com",
    messagingSenderId: "479621870392",
    appId: "1:479621870392:web:a55a4552f531cb469687cd",
    measurementId: "G-49NHCGL92X"
};


const firebaseApp = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export async function createUserDocFromAuth(userAuth) {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef
};