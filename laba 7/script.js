const burgerIcon = document.getElementById('burgerIcon');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const notification = document.getElementById('notification');
const closeNotificationBtn = document.getElementById('closeNotificationBtn');

burgerIcon.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);

    closeNotificationBtn.addEventListener('click', () => {
        notification.style.display = 'none';
    });
});
