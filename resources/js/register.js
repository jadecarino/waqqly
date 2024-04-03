const apiEndpoint = 'https://herl3zrpnf.execute-api.us-east-1.amazonaws.com/prod';

function invokeRegisterDogAndOwner() {

    document.getElementById('RegisterDogForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        var json = getJson(event.target.elements)
        console.log(json);

        fetch(apiEndpoint + '/dog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json,
        })
        .then(response => {
            if (response.ok) {
                showSuccessMessage('RegisterDog')
            } else {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    });

}

function invokeRegisterWalker() {

    document.getElementById('RegisterWalkerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var json = getJson(event.target.elements)
        console.log(json);

        fetch(apiEndpoint + '/walker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json,
        })
        .then(response => {
            if (response.ok) {
                showSuccessMessage('RegisterWalker')
            } else {                
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    });

}

function getJson(elements) {
    var formData = {};
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (el.name){
            formData[el.name] = el.value;
        }
    }
    var json = JSON.stringify(formData);
    return json;
}

function showSuccessMessage(parentDivId) {
    const parentDiv = document.getElementById(parentDivId);

    const successHero = document.createElement('section');
    successHero.classList = 'hero is-success';


    const heroBody = document.createElement('div');
    heroBody.classList = 'hero-body';

    const message = document.createElement('p');
    message.textContent = 'Registration successful!';

    heroBody.appendChild(message);
    successHero.appendChild(heroBody);
    parentDiv.appendChild(successHero);
}