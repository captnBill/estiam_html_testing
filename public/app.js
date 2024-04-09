document.getElementById('message-form').addEventListener('submit', function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Get the user's message
    var message = document.getElementById('message-input').value;

    // Post the message to the server
    fetch('/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then(response => response.json())
    .then(data => {
        // Create a new li element
        var li = document.createElement('li');

        // Set the text of the li element to the user's message
        li.innerText = message;

        // Append the li element to the ul
        document.getElementById('message-display').appendChild(li);

        // Clear the textarea
        document.getElementById('message-input').value = '';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Get messages from the server when the page loads
fetch('/messages')
    .then(response => response.json())
    .then(data => {
        data.forEach(row => {
            // Create a new li element
            var li = document.createElement('li');

            // Set the text of the li element to the message
            li.innerText = row.text;

            // Append the li element to the ul
            document.getElementById('message-display').appendChild(li);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });