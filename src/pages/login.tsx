import Banner from '../components/banner';
import { useState, useEffect } from 'react';
import { Link } from "react-router";
import { useNavigate } from 'react-router-dom';

interface LoginData {
    email: string;
    password: string;
}

function Login() {
    //variable pour changer de page React router v6
    const navigate = useNavigate();

    //variable d'email
    const [email, setEmail] = useState<string>('');
    const [isEmail, setIsEmail] = useState<boolean>(false);

    //variable mdp
    const [password, setPassword] = useState<string>('');
    const [isPassword, setIsPassword] = useState<boolean>(false);

    //temporaire
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        email.length >= 4 ? setIsEmail(true) : setIsEmail(false);
        password.length >= 8 ? setIsPassword(true) : setIsPassword(false);

    }, [email, password]);

    //post
    const handleSubmit = async () => {
        //isEmail && isPassword ? setMessage("email and password good") : setMessage("email or password not good");
        if (isEmail && isPassword) {
            const loginData: LoginData = {
                email: email,
                password: password,
            };

            const response = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                credentials: 'include',
                //mode:'cors',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if(response !== null){
                navigate('/', {replace:true});
            } else {
              // Si la réponse n'est pas OK, affichez un message d'erreur
              setMessage('Erreur lors de l\'envoi des données');
            }
            
        } else {
            setMessage("email or password not good");
        }
    }


    return (
        <div>
            <Banner />
            <p>email : <input type='email' value={email} onChange={e => setEmail(e.target.value)} /> {email.length >= 4 ? "it's good" : "it's false"}</p>
            <p>password : <input type='password' value={password} onChange={e => setPassword(e.target.value)} /> {password.length >= 8 ? "it's good" : "it's false"}</p>
            <button onClick={handleSubmit}>send request</button>
            <p>{message}</p>
            <p>Create account click on <Link to="/signup">signup</Link></p>
            <p>largeur de email {email.length}</p>

        </div>
    )
}

export default Login;
