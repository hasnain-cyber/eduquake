import express from 'express';
import videoController from '../controllers/videoController';

const router = express.Router();

router.get('/', videoController.getAllVideos);
router.post('/', videoController.createVideo);
router.get('/:id', videoController.getVideoById);
router.put('/:id', videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);

module.exports = router;