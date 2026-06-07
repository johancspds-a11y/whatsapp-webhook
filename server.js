const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const VERIFY_TOKEN = "MiTokenSecreto123";

// Verificación de Meta (GET)
app.get('/webhook', (req, res) => {

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Webhook verificado');
        return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
});

// Recepción de eventos (POST)
app.post('/webhook', (req, res) => {

    console.log('Evento recibido:');
    console.log(JSON.stringify(req.body, null, 2));

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});