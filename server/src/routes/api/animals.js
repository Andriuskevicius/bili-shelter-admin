import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';
import Message, { validateMessage } from '../../models/Message';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const animals = await Message.find().sort({ createdAt: 'desc' }).populate('user');

    res.json({
      animals: animals.map((m) => {
        return m.toJSON();
      }),
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate('user');
    if (!message) return res.status(404).json({ message: 'No message found.' });
    res.json({ message: message.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let message = await Message.create({
      name: req.body.name,
      chip_id: req.body.chip_id,
      user: req.user.id,
    });
    message = await message.populate('user').execPopulate();

    res.status(200).json({ message: message.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const tempMessage = await Message.findById(req.params.id).populate('user');
    if (!(tempMessage.user.id === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ message: 'Not the message owner or admin.' });

    const message = await Message.findByIdAndRemove(req.params.id).populate('user');
    if (!message) return res.status(404).json({ message: 'No message found.' });
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const tempMessage = await Message.findById(req.params.id).populate('user');
    if (!(tempMessage.user.id === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ message: 'Not the message owner or admin.' });

    let message = await Message.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, chip_id: req.body.chip_id, user: tempMessage.user.id },
      { new: true },
    );
    if (!message) return res.status(404).json({ message: 'No message found.' });
    message = await message.populate('user').execPopulate();

    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;
