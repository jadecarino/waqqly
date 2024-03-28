const apiEndpoint = 'https://herl3zrpnf.execute-api.us-east-1.amazonaws.com/prod';

function invokeRegisterWalker() {

    document.getElementById('RegisterWalkerForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // const formData = formToJson('RegisterWalkerForm');
        // console.log(formData); 

        const formData = "{\"WalkerFirstName\": \"Jade\", \"WalkerLastName\": \"Carino\", \"WalkerPhoneNumber\": \"07100200300\", \"WalkerEmail\": \"jade@email.com\", \"WalkerAddress\": \"address\"}";
        console.log(formData); 

        fetch(apiEndpoint + '/walker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(formData),
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

    });

}

function invokeRegisterDogOwner() {

    document.getElementById('RegisterDogForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = formToJson('RegisterDogForm');
        console.log(formData); 

        fetch(apiEndpoint + '/owner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
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

function formToJson(formId) {

    const form = document.getElementById(formId);
    const formData = new FormData(form);

    const json = {};

    formData.forEach((value, key) => {
        json[key] = value;
    });

    return json;

}