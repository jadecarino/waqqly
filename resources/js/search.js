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
        console.log(data);
        return data;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
