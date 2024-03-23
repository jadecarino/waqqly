const apiEndpoint = 'https://herl3zrpnf.execute-api.us-east-1.amazonaws.com/prod';

function invokeRegisterWalker() {

    fetch(apiEndpoint + "/walker", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        // TO DO
        // add body for POST request
        // body: JSON.stringify({ key: 'value' }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // or .text() or .blob()?
    })
    .then(data => {
        // handle response data
        console.log(data);
    })
    .catch(error => {
        // handle errors
        console.error('There was a problem with the fetch operation:', error);
    });
}

function invokeRegisterDogOwner() {

    fetch(apiEndpoint + "/owner", {
        method: 'POST',
        headers: {
            "Accept": "*/*",
            "Authorization": "eyJraWQiOiJLTzRVMWZs", // Remove
            "Content-Type": "application/json; charset=UTF-8"
        },
        // TO DO
        // add body for POST request
        // body: JSON.stringify({ key: 'value' }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // or .text() or .blob()?
    })
    .then(data => {
        // handle response data
        console.log(data);
    })
    .catch(error => {
        // handle errors
        console.error('There was a problem with the fetch operation:', error);
    });
}