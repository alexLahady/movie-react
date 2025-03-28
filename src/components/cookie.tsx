//amélioration futur

import { useState, useEffect } from "react";


function Cookie() {
    const [dataUser, setDataUser] = useState<(number | string)[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/pro/pro', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(arrayUser => {
                setDataUser(arrayUser);
            });
    },[])

    if(dataUser.length >= 2){
        return dataUser;
    } else {
        return [];
    }
}
export default Cookie;