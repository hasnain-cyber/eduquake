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
    if (course) {
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
}

const updateCourse = async (req: Request, res: Response) => {
    const courseId = req.params.id;
    const course = await courseModel.scan().where('id').eq(courseId).exec();
    if (course.length > 0) {
        const course = await courseModel.update({
            id: courseId,
            ...req.body
        });
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
}

const deleteCourse = async (req: Request, res: Response) => {
    const course = await courseModel.scan().where('id').eq(req.params.id).exec();
    if (course.length > 0) {
        const course = await courseModel.delete(req.params.id);
        res.status(200).json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
}

export default {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
};