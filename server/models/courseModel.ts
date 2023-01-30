import dynamoose from 'dynamoose';

// generate a courseModel using dynamodb
const courseModel = dynamoose.model(
    'Course',
    new dynamoose.Schema({
        id: {
            type: Number,
            hashKey: true,
        },
        name: {
            type: String,
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        fullDescription: {
            type: String,
            required: true,
        },
        videoIds: {
            type: [String],
        },
    }),
);

export default courseModel;