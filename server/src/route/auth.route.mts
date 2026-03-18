import { Router } from 'express';
import type { Request, Response } from 'express';
import { auth } from '../service/auth.ts';
import { getUserByEmail } from '../models/user.model.mts';

const router = Router();

// Register a new user
router.post('/register', async (req: Request, res: Response) => {
  // get the user details from the request body
  const { email, password, fName, lName } = req.body;

  // Check if user already exists
  if (await getUserByEmail(email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  // TODO: validate the input (e.g. check if email is valid, password strength, etc.)
  if (!email || !password || !fName || !lName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // TODO: hash the password using bcrypt or similar library
  const hashedPassword = await auth.options.password.hash(password);
  // TODO: save the user to the database (e.g. MongoDB, PostgreSQL, etc.)
  // const user = await addUser({ email, password: hashedPassword, fName, lName });
  // TODO: return a success response (e.g. 201 Created) or an error response if something goes wrong
  res.status(201).json({ message: 'User registered successfully' });
})

router.post('/login', async (req: Request, res: Response) => {
  // get the user details from the request body
  const { email, password } = req.body;
  // check if user exists
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  // verify the password
  const authenticated = await auth.options.password.verify(password, user.password);
  if (!authenticated) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  // TODO: generate a JWT token or session for the authenticated user
  
  // TODO: save the token to local storage or send it as a cookie to the client

  res.status(200).json({ message: 'Login successful' });
});