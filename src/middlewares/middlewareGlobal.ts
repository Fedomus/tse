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

const MySQLStore = expressMySqlSession(expressSession)

const MySQLOptions = {
	host: ENV.DB_HOST,
	port: ENV.DB_PORT,
	user: ENV.DB_USER,
	password: ENV.DB_PASS,
	database: ENV.DB_NAME
};
const sessionStore = new MySQLStore(MySQLOptions);

let sessionOptions;

if(ENV.KEY && ENV.SECRET) {
    sessionOptions = {
        key: ENV.KEY,
        secret: ENV.SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }
} else {
    logger.error('Falta configurar SESSION_KEY y SESSION_SECRET')
}

const CSPDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();
CSPDirectives["script-src"] = ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "cdn.datatables.net", "code.jquery.com", "cdnjs.cloudflare.com", "pagination.js.org", "kit.fontawesome.com"];
CSPDirectives["style-src"] = ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "cdn.datatables.net", "cdnjs.cloudflare.com", "fonts.cdnfonts.com"];
CSPDirectives["connect-src"] = ["'self'", "localhost:8080", "ka-f.fontawesome.com", "fonts.cdnfonts.com", "cdn.datatables.net"];
CSPDirectives["script-src-attr"] = ["'unsafe-inline'"]
delete CSPDirectives['upgrade-insecure-requests'];

function rutaValida(err, req, res, next) {
    if (err) {
    return res.status(err.statusCode || 500).json(err.message);  
    }
    next()
}

export const middlewareGlobal: any[] = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    express.urlencoded({extended: true}),
    cors(),
    helmet({
        contentSecurityPolicy: {
            directives: CSPDirectives   
        }
    }),
    compression(),
    session(sessionOptions),
    (err, req, res, next) => {rutaValida(err, req, res, next)}
]