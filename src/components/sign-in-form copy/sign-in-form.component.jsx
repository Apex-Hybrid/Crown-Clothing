import { useState } from 'react';
import { signInWithGooglePopup, createUserDocFromAuth, createAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'
import Button from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: ''
};

function SignInForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password, } = formFields;

    function resetFormFields() {
        setFormFields(defaultFormFields)
    }

    async function signInWithGoogle() {
        const { user } = await signInWithGooglePopup();
        await createUserDocFromAuth(user)
    };

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
            console.log(response)

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('incorrect email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    function handleChange(event) {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };


    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email" type="email" required onChange={handleChange} name='email' value={email} />
                <FormInput
                    label='Password' type="password" required onChange={handleChange} name='password' value={password} />
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
};

export default SignInForm;