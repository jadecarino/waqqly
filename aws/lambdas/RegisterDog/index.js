const randomBytes = require('crypto').randomBytes;
const AWS = require('aws-sdk');
const ddbDocClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    const dogId = toUrlString(randomBytes(16));
    console.log('Received event (', dogId, '): ', event);

    const requestBody = JSON.parse(event.body);
    console.log('Request body: ' + requestBody)
    
    const dog = createDog(requestBody);
    
    ddbDocClient.put({
        TableName: 'Dogs',
        Item: {
            DogId: dogId,
            Dog: dog,
        },
    }).promise().then(() => {
        callback(null, {
            statusCode: 201,
            body: JSON.stringify({
                DogId: dogId,
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

function createDog(requestBody) {
  return {
        DogName: requestBody.DogName,
        Breed: requestBody.DogBreed,
        Gender: requestBody.DogGender,
        Age: requestBody.DogAge,
        FirstName: requestBody.OwnerFirstName,
        LastName: requestBody.OwnerLastName,
        Email: requestBody.OwnerEmail,
        PhoneNumber: requestBody.OwnerPhoneNumber,
        HouseNumber: requestBody.OwnerHouseNumber,
        Street: requestBody.OwnerStreet,
        City: requestBody.OwnerCity,
        PostCode: requestBody.OwnerPostCode
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
