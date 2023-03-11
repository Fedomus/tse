import express from 'express';

export interface IRouter {
    path: string;
    name: express.Router
}