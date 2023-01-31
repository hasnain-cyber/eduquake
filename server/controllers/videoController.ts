import { Request, Response } from "express";
import videoModel from "../models/videoModel";
import crypto from "crypto";

const getAllVideos = async (req: Request, res: Response) => {
    const videos = await videoModel.scan().exec();
    res.status(200).json(videos);
}

const createVideo = async (req: Request, res: Response) => {
    // if both the thumbnail and video are uploaded
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (Object.keys(files).length === 2) {
        const thumbnailStorageBucketKey = files['thumbnail'][0] as any;
        const videoStorageBucketKey = files['video'][0] as any;
        const video = await videoModel.create({
            id: crypto.randomUUID(),
            title: req.body.title,
            description: req.body.description,
            thumbnailStorageBucketKey: thumbnailStorageBucketKey.key,
            videoStorageBucketKey: videoStorageBucketKey.key,
        });
        res.status(201).json(video);
    } else {
        res.status(400).json({ message: 'Internal server error! Please try again later.' });
    }
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
