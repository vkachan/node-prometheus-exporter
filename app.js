'use strict'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

let promclient = require('prom-client'),
	express = require('express'),
	argv = require('yargs').argv;

const HOST = 'https://' + argv.host;

const port = argv.port || 9010;

const counter = new promclient.Counter({ name: 'metric_name', help: 'metric_help' });
counter.inc(); // Inc with 1

let gauges = {};

let app = express();

app.get("/metrics", (req, res) => {
	res.end(promclient.register.metrics());
});

app.listen(port, () => {
    console.log("Listening on " + port);
});