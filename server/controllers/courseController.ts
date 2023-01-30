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
    const course = await courseModel.findById(req.params.id);
    res.status(200).json(course);
}

const updateCourse = async (req: Request, res: Response) => {
    const course = await courseModel.findById(req.params.id);
    if (course) {
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
}

const deleteCourse = async (req: Request, res: Response) => {
    const course = await courseModel.findById(req.params.id);
    if (course) {
        await course.remove();
        res.status(200).json({ message: 'Course removed' });
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