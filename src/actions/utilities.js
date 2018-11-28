import axios from 'axios';
const BASE_URL = process.env.BASE_URL;

export function SendRequest(name, surname, email, phone, businessName, note, history) {
    axios.post(`${BASE_URL}/request`, {
        name,
        surname,
        email,
        phone,
        businessName,
        note,
    });
    history.push('/signin');
}