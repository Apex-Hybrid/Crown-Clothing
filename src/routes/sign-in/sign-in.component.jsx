import { signInWithGooglePopup, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';



function SignIn() {
    async function logGoogleUser() {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user)
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    );
};


export default SignIn;