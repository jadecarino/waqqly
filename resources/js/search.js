const apiEndpoint = 'https://herl3zrpnf.execute-api.us-east-1.amazonaws.com/prod';

window.onload = getWalkers()

async function getWalkers() {

    const walkers = await fetchWalkerDetailsFromDatabase()

    const list = document.getElementById("WalkerList");
    list.innerHTML = "";

    for (let walker of walkers) {
        for (let key in walker) {
            var element = walker[key]
            if (element.includes("WalkerFirstName")){
                const walkerItem = document.createElement("li");
                walkerItem.textContent = element;
                list.appendChild(walkerItem);
            }
        }
    }

}

async function fetchWalkerDetailsFromDatabase() {

    const events = fetch(apiEndpoint + '/walker', {
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

    return events;
}
