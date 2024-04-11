const randomBytes = require('crypto').randomBytes;
const AWS = require('aws-sdk');
const ddbDocClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    const walkerId = toUrlString(randomBytes(16));
    console.log('Received event (', walkerId, '): ', event);

    const requestBody = JSON.parse(event.body);
    console.log('Request body: ' + requestBody)
    
    const walker = createWalker(requestBody);
    
    ddbDocClient.put({
        TableName: 'Walkers',
        Item: {
            WalkerId: walkerId,
            Walker: walker,
        },
    }).promise().then(() => {
        callback(null, {
            statusCode: 201,
            body: JSON.stringify({
                WalkerId: walkerId,
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);
        errorResponse(err.message, context.awsRequestId, callback)
    });

};

function createWalker(requestBody) {
  return {
        FirstName: requestBody.WalkerFirstName,
        LastName: requestBody.WalkerLastName,
        Email: requestBody.WalkerEmail,
        PhoneNumber: requestBody.WalkerPhoneNumber,
        HouseNumber: requestBody.WalkerHouseNumber,
        Street: requestBody.WalkerStreet,
        City: requestBody.WalkerCity,
        PostCode: requestBody.WalkerPostCode
    };
}

function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
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