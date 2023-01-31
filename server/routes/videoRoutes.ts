import express from 'express';
import videoController from '../controllers/videoController';
import upload from '../uploadConfig';

const router = express.Router();

router.get('/', videoController.getAllVideos);
router.post('/', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]), videoController.createVideo);
router.get('/:id', videoController.getVideoById);
router.put('/:id', videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);

module.exports = router;