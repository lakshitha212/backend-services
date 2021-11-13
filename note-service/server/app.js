import createError from 'http-errors'
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import bodyParser from 'body-parser'

import indexRouter from './routes/index'
import cors from 'cors';

import compression from "compression";

/**
 * Enable Loggin
 * Save log files in ../log
 */
import morgan from 'morgan'
const rfs = require("rotating-file-stream");

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "../log"),
});

import {
  postCustomer,
  postLogin,
  getCutomers,
  getCutomer,
  putCutomer,
  deleteCutomer
} from './controllers'
import makeCallback from './express-callback'
dotenv.config()
var app = express()
app.use(express.static('public'))
app.use(cors())
app.use(compression());
app.use(bodyParser.json())

app.use(morgan("combined", { stream: accessLogStream }));
app.use('/', indexRouter)
app.use('/static', express.static('public'))
app.post('/customer', makeCallback(postCustomer))
app.post('/customer/login', makeCallback(postLogin))
app.get('/customers', makeCallback(getCutomers))
app.get('/customer/:customerId', makeCallback(getCutomer))
app.put('/customer/:customerId', makeCallback(putCutomer))
app.delete('/customer/:customerId', makeCallback(deleteCutomer))


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.status(err.status).send({ error: err.message })
});

export default app;
