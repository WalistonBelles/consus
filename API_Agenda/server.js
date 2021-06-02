const express = require('express');
const gcal = require('./Utility/gcal.js');
const cors = require('cors')

const days = require('./ReqHandlers/GET-Handlers/days.js');
const timeslots = require('./ReqHandlers/GET-Handlers/timeslots.js');
const book = require('./ReqHandlers/POST-Handlers/book.js');

const app = express();
const auth = {};

app.use(cors())

// Obtenha o cliente OAuth2 para fazer solicitações de API do Google Agenda.
gcal.initAuthorize(setAuth);

function setAuth(auth) {
    this.auth = auth;
    console.log('\nServer is now running... Ctrl+C to end');
}

/**
 * Lida com solicitações GET de 'days'.
 * @param {object} req  O objeto de solicitações fornecido pelo Express. Veja o documento Expresso.
 * @param {object} res  O objeto de resultados fornecido pelo Express. Veja o documento Expresso.
 */
function handleGetDays(req, res) {
    const year = req.query.year;
    const month = req.query.month;
    days.getBookableDays(this.auth, year, month)
    .then(function(data) {
        res.send(data);
    })
    .catch(function(data) {
        res.send(data);
    });
}

/**
 * Lida com solicitações GET de 'timeslots'.
 * @param {object} req  O objeto de solicitações fornecido pelo Express. Veja o documento Expresso.
 * @param {object} res  O objeto de resultados fornecido pelo Express. Veja o documento Expresso.
 */
function handleGetTimeslots(req, res) {
    const year = req.query.year;
    const month = req.query.month;
    const day = req.query.day;
    timeslots.getAvailTimeslots(this.auth, year, month, day)
        .then(function(data) {
            res.send(data);
        })
        .catch(function(data) {
            res.send(data);
        });
}

/**
 * Lida com solicitações POST de 'book'.
 * @param {object} req  O objeto de solicitações fornecido pelo Express. Veja o documento Expresso.
 * @param {object} res  O objeto de resultados fornecido pelo Express. Veja o documento Expresso.
 */
function handleBookAppointment(req, res) {
    const year = req.query.year;
    const month = req.query.month;
    const day = req.query.day;
    const hour = req.query.hour;
    const minute = req.query.minute;
    book.bookAppointment(this.auth, year, month, day, hour, minute)
        .then(function(data) {
            res.send(data);
        })
        .catch(function(data) {
            res.send(data);
        });
}

// Routes.
app.get('/days', handleGetDays);
app.get('/timeslots', handleGetTimeslots);
app.post('/book', handleBookAppointment);

// Porta 8080 para solicitações de entrada para o servidor.
const server = app.listen(8080, function() {});