const activitiesDashboard = document.querySelector('.user-activities-cards')
const options = document.querySelectorAll('button')

const createItem = (item, option) => {

    const type = option === 'Weekly' ? item.timeframes.weekly : option === 'Daily' ? item.timeframes.daily : item.timeframes.monthly;
    const activitieDiv = document.createElement('div');
    activitieDiv.classList.add('user-activity');
    activitieDiv.style = `background-color:${item.color}`
    activitieDiv.innerHTML = `<div class="img-container">
    
    <img src=${item.iconPath} alt="">
  </div>
  <div class="user-acitvity-details">
    <div class="activity-type">
      <p>${item.title}</p>
      <img src="images/icon-ellipsis.svg" alt="">
    </div>
    <div class="activity-duration">
      <p>${type.current}hrs</p>
      <span>Last Week - ${type.previous}hrs</span>
    </div>
  </div>`;
    activitiesDashboard.appendChild(activitieDiv);
}
const data = fetch('./data.json').then((response) => {
    return response.json();
}).then((data) => {

    data.forEach(item => {
        const activeButton = [...options].find((button) => button.hasAttribute('active'));
        const option = activeButton.textContent;

        createItem(item, option);

    });

    [...options].forEach((button) => {
        button.addEventListener('click', () => {
            if (button.hasAttribute('active')) {
                return
            }
            const [activeButton,] = [...options].filter((item) => item.hasAttribute('active'));
            activeButton.removeAttribute('active')
            activitiesDashboard.innerHTML = '';
            button.setAttribute('active', '');
            data.forEach(item => {
                const option = button.textContent;

                createItem(item, option);
            });

        })
    })
})


