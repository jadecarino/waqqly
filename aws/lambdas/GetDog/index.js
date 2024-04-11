const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    console.log('Received event: ', event);

    scanDogs().then((data) => {
        const dogs = data.Items;

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(dogs),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);
        errorResponse(err.message, context.awsRequestId, callback);
    });
};

function scanDogs() {
    const params = {
        TableName: 'Dogs',
    };

    return ddb.scan(params).promise();
}

function errorResponse(errorMessage, awsRequestId, callback) {
    callback(null, {
        statusCode: 500,
        body: JSON.stringify({
            Error: errorMessage,
            Reference: awsRequestId,
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });
}
