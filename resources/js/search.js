const apiEndpoint = 'https://herl3zrpnf.execute-api.us-east-1.amazonaws.com/prod';

window.onload = getWalkers()

async function getWalkers() {

    const walkersFromDB = await fetchWalkerDetailsFromDatabase()

    const tableBody = document.getElementById("WalkerTableBody");
    tableBody.innerHTML = "";

    
    for (const walkerObject of walkersFromDB) {
        for (const key in walkerObject) {
            if (key == "Walker") {

                // This is the actual information we want to display
                const walkerInfo = walkerObject[key];
                console.log(walkerInfo);
                
                const tableRow = document.createElement("tr");

                const firstNameData = document.createElement("td");
                firstNameData.textContent = walkerInfo["FirstName"];
                tableRow.appendChild(firstNameData);

                const lastNameData = document.createElement("td");
                lastNameData.textContent = walkerInfo["LastName"];
                tableRow.appendChild(lastNameData);

                const phoneNumberData = document.createElement("td");
                phoneNumberData.textContent = walkerInfo["PhoneNumber"];
                tableRow.appendChild(phoneNumberData);

                const emailData = document.createElement("td");
                emailData.textContent = walkerInfo["Email"];
                tableRow.appendChild(emailData);

                tableBody.appendChild(tableRow);
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
