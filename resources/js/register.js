function invokeAPI() {
    const apiEndpoint = 'https://herl3zrpnf.execute-api.us-east-1.amazonaws.com/prod';

    fetch(apiEndpoint, {
        path: "/walker",
        method: 'POST',
        headers: {
            "Accept": "*/*",
            "Authorization": "eyJraWQiOiJLTzRVMWZs",
            "content-type": "application/json; charset=UTF-8"
        },
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