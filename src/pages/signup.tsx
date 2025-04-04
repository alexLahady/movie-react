import Banner from "../components/banner";
import { useState, useEffect } from 'react';
import { Link } from "react-router";
import { useNavigate } from 'react-router-dom';
import Cookie from "../components/cookie";

interface SignupData {
    email: string;
    name : string;
    password: string;
}


function Signup() {
    const navigate = useNavigate();

    //variable formulaire
    const [email, setEmail] = useState<string>('');
    const [isEmail, setIsEmail] = useState<boolean>(false);

    const [name , setName] = useState<string>('');
    const [isName, setIsName] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [isPassword, setIsPassword] = useState<boolean>(false);

    useEffect(() => {
        email.length >= 4 ? setIsEmail(true) : setIsEmail(false);
        name.length >= 1 ? setIsName(true) : setIsName(false);
        password.length >= 8 ? setIsPassword(true) : setIsPassword(false);

    }, [email, name, password]);

    const handleSubmit = async () => {
        if(isEmail && isName && isPassword){
            const signupData: SignupData = {
                email: email,
                name : name,
                password: password,
            };
            if (!signupData.email || !signupData.name || !signupData.password) {
                console.log("Tous les champs doivent être remplis.");
                return; // Stoppe l'envoi si un champ est manquant
            };
            
            let url =  'http://localhost:3001/users/signup'
            const response = await Cookie(false,url,'POST',signupData)
    
            if(response !== null){
                navigate('/user', {replace:true});
            } else {
              // Si la réponse n'est pas OK, affichez un message d'erreur
              console.log('Erreur lors de l\'envoi des données');
            }
        } else {
            console.log("error email, name or password");
        }
    }



    return (
        <div>
            <Banner />
            <h2>Fill out the registration form</h2>
            <div className="formulare">
                <p>email : <input type='email' value={email} onChange={e => setEmail(e.target.value)} /> {email.length >= 4 ? "it's good" : "it's false"}</p>
                <p>name : <input type='name' value={name} onChange={e => setName(e.target.value)} /> {name.length >= 1 ? "it's good" : "it's false"}</p>
                <p>password : <input type='password' value={password} onChange={e => setPassword(e.target.value)} /> {password.length >= 8 ? "it's good" : "it's false"}</p>
                <button onClick={handleSubmit}>send request</button>
                <p>if you have already created an account <Link to="/user">login</Link></p>
            </div>

        </div>
    )
}

export default Signup; 