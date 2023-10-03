import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import {ENV} from '../environment/env';
import * as expressSession from "express-session";
import express from 'express';
import expressMySqlSession from "express-mysql-session";
import helmet from "helmet";
import logger from '../logger';
import cookieParser from 'cookie-parser';

const MySQLStore = expressMySqlSession(expressSession)

const MySQLOptions = {
	host: ENV.DB_HOST,
	port: ENV.DB_PORT,
	user: ENV.DB_USER,
	password: ENV.DB_PASS,
	database: ENV.DB_NAME
};
const sessionStore = new MySQLStore(MySQLOptions);

let sessionOptions: any;

sessionOptions = {
    key: ENV.KEY,
    secret: ENV.SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}

function rutaValida(err, req, res, next) {
    if (err) {
        logger.error(err)
    return res.status(err.statusCode || 500).json(err.message);  
    }
    next()
}

export const middlewareGlobal: any[] = [

    express.static(__dirname + "/public"),

    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    
    cookieParser(),

    cors(),

    helmet({
        contentSecurityPolicy: false,
    }),

    compression(),

    session(sessionOptions),
    
    (err, req, res, next) => rutaValida(err, req, res, next)
]