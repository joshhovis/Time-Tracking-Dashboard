document.addEventListener("DOMContentLoaded", () => {
    const containerList = document.querySelector('.list');
    const mainContainer = document.getElementById('main');

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

    const colorClasses = {
        'Work': 'list__item-accent--work',
        'Play': 'list__item-accent--play',
        'Study': 'list__item-accent--study',
        'Exercise': 'list__item-accent--exercise',
        'Social': 'list__item-accent--social',
        'Self Care': 'list__item-accent--selfcare',
    }

    const appendItem = (item) => {
        const listItemContainer = document.createElement('div');
        listItemContainer.classList.add('list__item');

        listItemContainer.innerHTML = `
        <div class="list__item-accent" style="background-color: ${item.backgroundColor}">
            <img class="list__item-accent-icon" src="${item.icon}" alt="${item.title} icon" />
        </div>

        <div class="list__item-content">
            <div class="list__item-content-header">
                <p class="list__item-content-title">${item.title}</p>
                <button class="list__item-content-button">
                    <img class="list__item-content-ellipsis" src="./images/icon-ellipsis.svg" alt="ellipsis icon">
                </button>
            </div>
                
            <div class="list__item-content-footer">
                <p class="list__item-content-current">${item.timeframes.weekly.current}hrs</p>
                <p class="list__item-content-previous">Last Week - ${item.timeframes.weekly.previous}</p>
            </div>
        </div>
        `

        containerList.appendChild(listItemContainer);
    };
})