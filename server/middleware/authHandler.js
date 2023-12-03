import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler';
import User from '../models/userModel';

//Protect routes
export const protect = asyncHandler(async (res, req, next) => {
  let token;

  //read jwt from cookie
  token = req.cookie.jwt;
});
