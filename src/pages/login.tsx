//Component
import Banner from '../components/banner';
import Cookie from '../components/cookie';

//utils
import { apiUrl } from '../utils/type';

//CSS
import '../styles/login.scss';

//Framework MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

//React
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router";

interface LoginData {
    email: string;
    password: string;
}

function Login() {
    //variable pour changer de page React router v6
    const navigate = useNavigate();

    const location = useLocation();
    const [signupLocation, setSignupLocation] = useState<boolean>(false);

    //variable d'email
    const [email, setEmail] = useState<string>('');
    const [isEmail, setIsEmail] = useState<boolean>(false);

    //variable mdp
    const [password, setPassword] = useState<string>('');
    const [isPassword, setIsPassword] = useState<boolean>(false);

    //temporaire
    const [message, setMessage] = useState<string>('');

    //temporaire button
    const [pushButton, setPushButton] = useState<boolean>(true);

    useEffect(() => {
        email.length >= 4 ? setIsEmail(true) : setIsEmail(false);
        password.length >= 2 ? setIsPassword(true) : setIsPassword(false);

    }, [email, password]);

    useEffect(() => {
        if (location.state?.fromSignup) {
            console.log("Utilisateur arrivé après signup");
            setSignupLocation(true);
            // Tu peux afficher un message de bienvenue, ou autre
        }
    }, [location]);

    //post
    const handleSubmit = async () => {
        //isEmail && isPassword ? setMessage("email and password good") : setMessage("email or password not good");
        if (isEmail && isPassword) {
            const loginData: LoginData = {
                email: email,
                password: password,
            };
            //console.log(loginData);
            setPushButton(false);
            let url = `${apiUrl}users/login`
            const response = await Cookie(false, url, 'POST', loginData)

            if (response !== null) {
                navigate('/', { replace: true });
            } else {
                // Si la réponse n'est pas OK, affichez un message d'erreur
                setMessage('Erreur lors de l\'envoi des données');
            }

        } else {
            setPushButton(true);
            setMessage("email or password not good");
        }
    }

    let sendButton = pushButton ? <Button onClick={handleSubmit} variant="contained" >
        send request
    </Button> : <Button
        loading
        loadingPosition="start"
        variant="outlined"
    >
        send request
    </Button>

    let textFieldEmail = !isEmail ? <TextField error type='email' id="standard-error" label="Email required *" variant="standard" value={email} onChange={e => setEmail(e.target.value)} /> :
        <TextField
            type='email'
            id="standard-basic"
            label="OK"
            variant="standard"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />

    let textFieldpassword = !isPassword ? <TextField error type='password' id="standard-error" label="Password required *" variant="standard" value={password} onChange={e => setPassword(e.target.value)} /> :
        <TextField
            type='password'
            id="standard-basic"
            label="OK"
            variant="standard"
            value={password}
            onChange={e => setPassword(e.target.value)}
        />

    return (
        <div className='login'>
            <Banner />
            {!signupLocation ? <div></div> : <h2 className='login-created'>Your account has been created. You can now sign in with your credentials.</h2>}
            <Stack direction='column' spacing={2} sx={{ width: '400px', ml: 4 }}>
                {textFieldEmail}
                {textFieldpassword}
                {sendButton}
            </Stack>

            <p>{message}</p>
            {!signupLocation ? <p>If you don't have an account, go to <Link to="/signup">signup</Link></p> : <div></div>}
        </div>

    )

}

export default Login;
