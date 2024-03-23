const apiEndpoint = 'https://herl3zrpnf.execute-api.us-east-1.amazonaws.com/prod';

function invokeGetWalkers() {

    fetch(apiEndpoint + "/walker", {
        method: 'GET',
        headers: {
            "Accept": "*/*",
            "Authorization": "eyJraWQiOiJLTzRVMWZs",
            "Content-Type": "application/json; charset=UTF-8"
        },
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
