import crypto from 'crypto';
import { Request, Response } from 'express';
import courseModel from '../models/courseModel';

const getAllCourses = async (req: Request, res: Response) => {
    const courses = await courseModel.scan().exec();
    res.status(200).json(courses);
}

const createCourse = async (req: Request, res: Response) => {
    const course = new courseModel({
        id: crypto.randomUUID(),
        ...req.body
    });
    const newCourse = await course.save();
    res.status(201).json(newCourse);
}

const getCourseById = async (req: Request, res: Response) => {
    const course = await courseModel.query('id').eq(req.params.id).exec();
    res.status(200).json(course);
}

const updateCourse = async (req: Request, res: Response) => {
    const courseId = req.params.id;
    const course = await courseModel.update({
        id: courseId,
        ...req.body
    });
    res.status(200).json(course);
}

const deleteCourse = async (req: Request, res: Response) => {
    const course = await courseModel.delete(req.params.id);
    res.status(200).json(course);
}

export default {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
};