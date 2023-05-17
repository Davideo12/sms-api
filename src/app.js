const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 4000;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const mainPage = process.env.MAIN_PAGE;
const fromNumber = process.env.FROM_NUMBER;
const toNumber = process.env.TO_NUMBER;

const client = require('twilio')(accountSid, authToken);

app.get("/about", (req, res) => {
    res.status(200).json({
        "author": "Jesus David Elizondo Oliva",
        "clave": "33209"
    })
});

app.use( bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.post("/sendsms", (req, res) => {

    console.log(req.body);

    let mensaje = `# ${req.body.sujeto} #\n${req.body.mensaje}`;

    client.messages.create({
        body: mensaje,
        from: fromNumber,
        to: toNumber
    })
    .then(message => {
        console.log("+ Message SID: " + message.sid);
        res.redirect(mainPage);
    })
    .catch(err => {
        console.error(err);
        res.status(500);
    })
});

app.listen(PORT, () => {
    console.log("## SMS Twilio API ##\n - By: David Elizondo\n+ PORT:" + PORT);
})