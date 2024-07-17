document.addEventListener("DOMContentLoaded", () => {
    const containerList = document.getElementById('list');
    const timeframeList = document.getElementById('timeframe');
    let data = [];
    let activeTimeframe = 'daily';

    fetch('/data.json').then((response) => {  
        if(!response.ok) {
            throw new Error('Oops! Something went wrong.');
        }
        return response.json();
    })
    .then((fetchedData) => {
        data = fetchedData;
        appendTimeframes(Object.keys(data[0].timeframes));

        displayItems('daily');
    })
    .catch((error) => {
        console.log(error.message);
    });

    const appendItem = (item, timeframe) => {
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
                <p class="list__item-content-current">${item.timeframes[timeframe].current}hrs</p>
                <p class="list__item-content-previous">Last Week - ${item.timeframes[timeframe].previous}</p>
            </div>
        </div>
        `

        containerList.appendChild(listItemContainer);
    };

    const appendTimeframes = (timeframes) => {
        timeframes.forEach((timeframe) => {
            const timeframeItem = document.createElement('li');
            timeframeItem.classList.add('hero__timeframe-selection');
            timeframeItem.setAttribute("id", timeframe)
            timeframeItem.textContent = timeframe.charAt(0).toUpperCase() + timeframe.slice(1);
            timeframeList.appendChild(timeframeItem);

            timeframeItem.addEventListener('click', () => {
                setActiveTimeframe(timeframeItem);
                displayItems(timeframe);
            });
        });

        document.getElementById(activeTimeframe).classList.add('active');
    };

    const setActiveTimeframe = (newActiveTime) => {
        const previousActiveTime = document.querySelector('.hero__timeframe-selection.active');

        if (previousActiveTime) previousActiveTime.classList.remove('active');

        newActiveTime.classList.add('active')
        activeTimeframe = newActiveTime.getAttribute('id');
    }

    const displayItems = (timeframe) => {
        containerList.innerHTML = '';
        data.forEach((item) => {
            appendItem(item, timeframe);
        });
        console.log(timeframe)
        console.log(timeframeList);
    };
})