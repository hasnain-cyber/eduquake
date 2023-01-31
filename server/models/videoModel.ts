import dynamoose from 'dynamoose';

const videoModel = dynamoose.model(
    'Video',
    new dynamoose.Schema({
        id: {
            type: String,
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
        thumbnailStorageBucketKey: {
            type: String,
            required: true,
        },
        videoStorageBucketKey: {
            type: String,
            required: true,
        },
    }),
);

export default videoModel;

