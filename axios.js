const axios = require('axios');

const URL = 'http://localhost:8080'

async function totalProductos () {
    try{
        const data = await axios.get(`${URL}/registro`)
        console.log(data);
        return data
    } catch(err) {
        console.log(err);
    }
}

totalProductos()