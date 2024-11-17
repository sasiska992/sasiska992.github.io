document.addEventListener('DOMContentLoaded', () => {
    const openFormBtn = document.getElementById('openFormBtn');
    const closeFormBtn = document.getElementById('closeFormBtn');
    const feedbackPopup = document.getElementById('feedbackPopup');
    const feedbackForm = document.getElementById('feedbackForm');
    const responseMessage = document.getElementById('responseMessage');

    
    const restoreFormData = () => {
        document.getElementById('fullName').value = localStorage.getItem('fullName') || '';
        document.getElementById('email').value = localStorage.getItem('email') || '';
        document.getElementById('phone').value = localStorage.getItem('phone') || '';
        document.getElementById('organization').value = localStorage.getItem('organization') || '';
        document.getElementById('message').value = localStorage.getItem('message') || '';
    };

    restoreFormData();

    openFormBtn.addEventListener('click', () => {
        feedbackPopup.style.display = 'block';
        history.pushState({ popupOpen: true }, '', '#feedback');
    });

    closeFormBtn.addEventListener('click', () => {
        feedbackPopup.style.display = 'none';
        history.back();
    });

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.popupOpen) {
            feedbackPopup.style.display = 'block';
        } else {
            feedbackPopup.style.display = 'none';
        }
    });

    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            message: document.getElementById('message').value,
        };


        localStorage.setItem('fullName', formData.fullName);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('phone', formData.phone);
        localStorage.setItem('organization', formData.organization);
        localStorage.setItem('message', formData.message);

        fetch('https://formcarry.com/s/HwGpuGzcoXi', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Ошибка при отправке формы');
            })
            .then(data => {
                responseMessage.textContent = 'Форма успешно отправлена!';
                responseMessage.style.color = 'green';
                localStorage.removeItem('fullName');
                localStorage.removeItem('email');
                localStorage.removeItem('phone');
                localStorage.removeItem('organization');
                localStorage.removeItem('message');
                feedbackForm.reset();
            })
            .catch(error => {
                responseMessage.textContent = error.message;
                responseMessage.style.color = 'red';
            });
    });
});
