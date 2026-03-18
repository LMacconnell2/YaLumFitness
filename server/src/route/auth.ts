import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

// Register a new user
router.post('/register', (req: Request, res: Response) => {
  // get the user details from the request body
  const { email, password, fName, lName } = req.body;

  // TODO: validate the input (e.g. check if email is valid, password strength, etc.)
  if (!email || !password || !fName || !lName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // TODO: hash the password using bcrypt or similar library

  // TODO: save the user to the database (e.g. MongoDB, PostgreSQL, etc.)

  // TODO: return a success response (e.g. 201 Created) or an error response if something goes wrong
  res.status(201).json({ message: 'User registered successfully' });
})