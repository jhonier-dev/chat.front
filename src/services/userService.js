import { request } from "./apiServiceBase";

export async function createSesion(userData) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    };
    
    try {
        const newItem = await request('security/login', options);
        console.log(newItem); // Verifica la respuesta de la API
        return newItem;
    } catch (error) {
        throw error;
    }

}

export async function createUser(userData) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    };
    
    try {
        const newItem = await request('security/user', options);
        return newItem;
    } catch (error) {
        throw error;
    }
}