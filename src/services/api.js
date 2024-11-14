import axios from 'axios';

const api = axios.create({
    baseURL: 'http://www.4sides.com.mx/api/prueba-tecnica',
    headers: {
        'Content-Type': 'application/json',
    },
});

const mapUsers = ( users ) => {
    return users.map(usuario => ({
        name: usuario.usuarioNombre,
        lastname: `${usuario.usuarioApellidoPaterno} ${usuario.usuarioApellidoMaterno}`,
        email: usuario.usuarioTelefono,
        phone: usuario.usuarioEmail,
        photo: 'https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg'
    })) ?? [];
}

//get users from endpoint api
export const getUsers = async ( results = 50 ) => {
    try {
        const response = await api.get(`/usuarios/index?results=${results}`);
        return mapUsers(response.data?.usuarios ?? null);
    } 
    catch (error) {
        console.error("Error al cargar los datos:", error);
        throw error;
    }
};

