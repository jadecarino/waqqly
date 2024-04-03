const apiEndpoint = 'https://herl3zrpnf.execute-api.us-east-1.amazonaws.com/prod';

function invokeRegisterWalker() {

    document.getElementById('RegisterWalkerForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        
        var json = getJson(event.target.elements)
        console.log(json);

        fetch(apiEndpoint + '/walker', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: json,
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

        var json = getJson(event.target.elements)
        console.log(json);

        fetch(apiEndpoint + '/owner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: json,
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

function getJson(elements) {
    var formData = {};
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i]
        if (el.name){
            formData[el.name] = el.value;
        }
    }
    var json = JSON.stringify(formData)
    return json;
}
