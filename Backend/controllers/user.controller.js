import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';
import * as userService from '../services/user.service.js';
import redisClient from '../services/redis.service.js';


export const createUserController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try{
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT();
        return res.status(201).json({user, token});
    }
    catch(e) {
        return res.status(400).send(e.message);
    }
}

export const loginUserController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const user = await userModel.findOne({email: req.body.email}).select('+password');
        if(!user) {
            return res.status(401).json({
                errors: ' Invalid email'
            })
        }
        const isValid = await user.isValid(req.body.password);
        if(!isValid) {
            return res.status(401).json({
                errors: 'Invalid password'
            })
        }
        const token = await user.generateJWT();
        res.status(200).json({user, token});
    }
    catch(e) {
        return res.status(400).send(e.message);
    }
}

export const profileUserController = async (req, res) => {
    console.log(req.user);
    res.status(200).json({user: req.user});
}

export const logoutUserController = async (req, res) => {
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({errors: 'Unauthorized user'});
        }
        redisClient.set(token, 'logout','EX', 60*60*24);
        res.status(200).json({
            message: 'User logged out'});
    }
    catch(e) {
        return res.status(401).json({errors: 'Unauthorized user'});
    }
}