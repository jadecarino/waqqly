const apiEndpoint = 'https://herl3zrpnf.execute-api.us-east-1.amazonaws.com/prod';

window.onload = getWalkers()

async function getWalkers() {

    const walkers = await fetchWalkerDetailsFromDatabase()

    const list = document.getElementById("WalkerList");
    list.innerHTML = "";

    for (const walker of walkers) {
        console.log("Walker: " + walker)
        for (const key in walker) {
            console.log("Key: " + key)
            if (key == "Walker") {
                const walkerInfo = walker[key]
                console.log(walkerInfo)
                const displayText = "Name: " + walkerInfo["WalkerFirstName"] + " " + walkerInfo["WalkerLastName"] + " Phone number: " + walkerInfo["WalkerPhoneNumber"] + " Email address: " + walkerInfo["WalkerEmailAddress"]
                const listItem = document.createElement("li");
                listItem.textContent = displayText;
                list.appendChild(listItem);
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
