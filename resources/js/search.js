const apiEndpoint = 'https://herl3zrpnf.execute-api.us-east-1.amazonaws.com/prod';

window.onload = getWalkers()

async function getWalkers() {

    const walkers = await fetchWalkerDetailsFromDatabase()
    console.log(walkers)

}

async function fetchWalkerDetailsFromDatabase() {

    fetch(apiEndpoint + '/walker', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(response.json)
        return response.json();
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
