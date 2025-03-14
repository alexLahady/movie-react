import Banner from '../components/banner';
import { useState, useEffect } from 'react';
import { Link } from "react-router";

interface LoginData {
    email: string;
    password: string;
}

interface ServerResponse {
    message: string; // Exemple de message, ajuste selon la réponse réelle de ton serveur
}

function Login() {
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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data: ServerResponse = await response.json();
                setMessage(data.message);  // Affiche la réponse du serveur problème ne renvoi pas de message d'erreur ou réponse juste le cookie mais fonctionnel
            } else {
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
