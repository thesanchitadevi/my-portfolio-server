import express from 'express';
import { MessageControllers } from './message.controller';

const router = express.Router();

router.post('/', MessageControllers.createMessage);

router.get('/', MessageControllers.getMessages);

export const MessageRouter = router;
