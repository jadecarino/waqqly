const apiEndpoint = 'https://herl3zrpnf.execute-api.us-east-1.amazonaws.com/prod';

window.onload = getDogs()

async function getDogs() {

    const dogsFromDB = await fetchDogDetailsFromDatabase();

    const tableBody = document.getElementById('DogTableBody');
    tableBody.innerHTML = '';

    
    for (const dogObject of dogsFromDB) {
        for (const key in dogObject) {
            if (key == 'Dog') {

                // This is the actual information we want to display
                const dogInfo = dogObject[key];
                console.log(dogInfo);
                
                const tableRow = document.createElement('tr');

                const dogNameData = document.createElement('td');
                dogNameData.textContent = dogInfo['DogName'];
                tableRow.appendChild(dogNameData);

                const ageData = document.createElement('td');
                ageData.textContent = dogInfo['Age'];
                tableRow.appendChild(ageData);

                const breedData = document.createElement('td');
                breedData.textContent = dogInfo['Breed'];
                tableRow.appendChild(breedData);

                const ownerNameData = document.createElement('td');
                ownerNameData.textContent = dogInfo['FirstName'] + ' ' + dogInfo['LastName'];
                tableRow.appendChild(ownerNameData);

                const phoneNumberData = document.createElement('td');
                phoneNumberData.textContent = dogInfo['PhoneNumber'];
                tableRow.appendChild(phoneNumberData);

                const emailData = document.createElement('td');
                emailData.textContent = dogInfo['Email'];
                tableRow.appendChild(emailData);

                const cityData = document.createElement('td');
                cityData.textContent = dogInfo['City'];
                tableRow.appendChild(cityData);

                tableBody.appendChild(tableRow);
            }
        }
    }

}

async function fetchDogDetailsFromDatabase() {

    const events = fetch(apiEndpoint + '/dog', {
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