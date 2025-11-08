//Component
import Banner from "../components/banner";
import Cookie from "../components/cookie";

//utils
import { apiUrl } from "../utils/type";

//CSS
import '../styles/signup.scss';

//Framework MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

//React
import { useState, useEffect } from 'react';
import { Link } from "react-router";
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

interface SignupData {
    email: string;
    name: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}


function Signup() {
    const navigate = useNavigate();

    //variable formulaire
    const [email, setEmail] = useState<string>('');
    const [isEmail, setIsEmail] = useState<boolean>(true);

    const [name, setName] = useState<string>('');
    const [isName, setIsName] = useState<boolean>(true);

    const [password, setPassword] = useState<string>('');
    const [isPassword, setIsPassword] = useState<boolean>(true);

    //Le bouton si il doit chargé pu pas
    const [pushButton, setPushButton] = useState<boolean>(true);

    //La partie test si le mot de passe est valide et afficher les erreur s'il y en a
    const [labelError, setLabelError] = useState<string>('Password (min. 8 characters) * ');
    const [helpTextError, setHelpTextError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, } = useForm<SignupData>();//test useFrom


    const onSubmit : SubmitHandler<SignupData> = (data) => {
        console.log(data);
    }

    /*
    useEffect(() => {
        email.length >= 4 && email.includes('@') ? setIsEmail(true) : setIsEmail(false);
        name.length >= 2 ? setIsName(true) : setIsName(false);
        password.length >= 8 ? setIsPassword(true) : setIsPassword(false);

    }, [email, name, password]);
    */


    const sendData = async () => {
        if (isEmail && isName && isPassword) {
            const signupData: SignupData = {
                email: email,
                name: name,
                password: password,
            };
            if (!signupData.email || !signupData.name || !signupData.password) {
                console.log("Tous les champs doivent être remplis.");
                return; // Stoppe l'envoi si un champ est manquant
            };

            setPushButton(false);
            let url = `${apiUrl}/users/signup`
            const response = await Cookie(false, url, 'POST', signupData);
            const data = await response.json();
            console.log(data);

            if (data.statusCode !== 400) {
                const loginData: LoginData = {
                    email: signupData.email,
                    password: signupData.password,
                };

                url = `${apiUrl}/auth/login`;

                const resposne$ = await Cookie(false, url, 'POST', loginData);
                const data2 = await resposne$.json();

                if (data2.statusCode === 200) {
                    navigate('/', { replace: true });
                } else {
                    console.log('Erreur lors de l\'envoi des données');
                }

            } else {
                // Si la réponse n'est pas OK, affichez un message d'erreur
                setPushButton(true);
                setIsPassword(false);
                setPasswordError(true);

                setLabelError('error');
                setTimeout(() => {
                    setLabelError('Password (min. 8 characters) * ');
                }, 3000);

                //setHelpTextError(data.message[1].textError);
                console.log('Erreur lors de l\'envoi des données');
            }
        } else {
            setPushButton(true);
            console.log("error email, name or password");
        }
    }

    let sendButton = pushButton ? <Button type="submit" onClick={sendData} variant="contained" >
        send request
    </Button> : <Button
        type="submit"
        loading
        loadingPosition="start"
        variant="outlined"
    >
        Account creation
    </Button>

    let textFieldEmail = <TextField
       {...register('email', { 
          required: 'Email is required useForm', 
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email must be valid useFrom' } 
        })}
        error={!!errors.email}//s'il se trompe error tout le temps
        type='email'
        id="standard-basic"
        label="Email"
        variant="standard"
        value={email}
        placeholder="example@example.com"
        helperText={errors.email?.message}
        onChange={e => setEmail(e.target.value)}
    />

    let textFieldname = <TextField
       {...register('name', { 
          required: 'Name is required useForm',
          minLength: { value: 2, message: 'Name must be at least 2 characters useForm' }
        })}
        error={!!errors.name}
        type='name'
        id="standard-basic"
        label="Name"
        variant="standard"
        value={name}
        placeholder="Richard"
        helperText={errors.name?.message}
        onChange={e => setName(e.target.value)}
    />

    let textFieldpassword = <TextField
        {...register('password', { 
          required: 'Password is required useForm',
          minLength: { value: 8, message: 'Password must be at least 8 characters useForm' }
        })}
        error={!!errors.password}
        type='password'
        id="standard-basic"
        label={labelError}
        variant="standard"
        value={password}
        helperText={errors.password?.message}
        onChange={e => setPassword(e.target.value)}
    />




    return (
        <div className="signup">
            <Banner />
            <h2>Fill out the registration form</h2>
            <form className="formulare" onSubmit={handleSubmit(onSubmit)}>
                <Stack direction='column' spacing={2} sx={{ width: '400px', ml: 4 }}>
                    {textFieldEmail}
                    {textFieldname}
                    {textFieldpassword}
                    {sendButton}
                </Stack>
            </form>
            <p className="text-login">if you have already created an account go to <Link to="/user">login</Link></p>

        </div>
    )
}

export default Signup; 


//set un data qui serait un array et aurait toute les message property et ne sera set que en 400