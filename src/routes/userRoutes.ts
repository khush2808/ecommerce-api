import express from 'express';
import User, { IUser } from '../models/User';

const router = express.Router();

// Create/Update user
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
		console.log(name , email , phone);
		if(!name || !email || !phone){
			res.status(400).json({ message: 'Missing required fields' });
		}
    const user = await User.findOneAndUpdate(
      { email },
      { name, email, phone },
      { upsert: true, new: true }
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating/updating user', error });
  }
});

// Get user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id , );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

router.get('/', async (req, res) => {
  try {
    
    res.end("Hello World");
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

export default router;

