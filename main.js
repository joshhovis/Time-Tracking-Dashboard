document.addEventListener("DOMContentLoaded", () => {
    const containerList = document.getElementById('container-list');

    fetch('/data.json').then((response) => {  
        if(!response.ok) {
            throw new Error('Oops! Something went wrong.');
        }
        return response.json();
    })
    .then((data) => {
        data.forEach((item) => {
            appendItem(item);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });

    const appendItem = (item) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${item.title}</span>`

        containerList.appendChild(listItem);
    };
})