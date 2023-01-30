import dynamoose from 'dynamoose';

const videoModel = dynamoose.model(
    'Video',
    new dynamoose.Schema({
        id: {
            type: Number,
            hashKey: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        storgeBucketKey: {
            type: String,
            required: true,
        },
    }),
);

export default videoModel;

