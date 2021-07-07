const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get("/api/accounts", (req, res) => {
    db.select("*").from("accounts")
    .then(accounts => res.status(200).json(accounts))
    .catch(error => res.status(500).json({message: "could not retrieve database information"}));
});

server.post("/api/accounts", (req, res) => {
    if(req.body.name && req.body.budget)
        db("accounts").insert(req.body)
        .then(() => res.sendStatus(201))
        .catch(() => res.status(500).json({message: "could not add row to database"}));
    else
        res.status(400).json({message: "name and budget properties required"});
})

server.put("/api/accounts/:id", (req, res) => {
    db("accounts").where({id: req.params.id})
    .update(req.body)
    .then(() => res.sendStatus(200))
    .catch(() => res.status(500).json({message: "could not update database row"}));
});

server.delete("/api/accounts/:id", (req, res) => {
    db("accounts").where({id: req.params.id})
    .del()
    .then(() => res.sendStatus(200))
    .catch(() => res.status(500).json({message: "could not delete database row"}));
});

module.exports = server;