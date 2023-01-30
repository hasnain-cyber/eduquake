import { Request, Response } from "express";
import videoModel from "../models/videoModel";

const getAllVideos = async (req: Request, res: Response) => {
    const videos = await videoModel.scan().exec();
    res.status(200).json(videos);
}
    
const createVideo = async (req: Request, res: Response) => {
    const video = new videoModel({
        id: crypto.randomUUID(),
        ...req.body
    });
    const newVideo = await video.save();
    res.status(201).json(newVideo);
}

const getVideoById = async (req: Request, res: Response) => {
    const video = await videoModel.query('id').eq(req.params.id).exec();
    if (video.length > 0) {
        res.status(200).json(video[0]);
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
}

const updateVideo = async (req: Request, res: Response) => {
    const videoId = req.params.id;
    const video = await videoModel.scan().where('id').eq(videoId).exec();
    if (video.length > 0) {
        // remove storageBucketKey from req.body, so that user cannot access other videos with this.
        delete req.body.storageBucketKey;
        const video = await videoModel.update({
            id: videoId,
            ...req.body
        });
        res.status(200).json(video);
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
}

const deleteVideo = async (req: Request, res: Response) => {
    const video = await videoModel.scan().where('id').eq(req.params.id).exec();
    if (video.length > 0) {
        const video = await videoModel.delete(req.params.id);
        res.status(200).json(video);
    } else {
        res.status(404).json({ message: 'Video not found' });
    }
}

export default {
    getAllVideos,
    createVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
}
