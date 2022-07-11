function attachEvents() {
    //console.log('TODO...');
    const url = 'http://localhost:3030/jsonstore/messenger';

    const msgElement = document.getElementById('messages');
    const authorElement = document.querySelector('input[name=author]');
    const contentElement = document.querySelector('input[name=content]');
    const submitBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    submitBtn.addEventListener('click', function onSend(e) {
        const newMsg = {
            author: authorElement.value,
            content: contentElement.value,
        }
        if (authorElement.value != '' && contentElement.value != '') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newMsg)
            })
                .then(() => {
                    authorElement.value = '';
                    contentElement.value = '';
                });
        }
    });

    refreshBtn.addEventListener('click', function onRefresh(e) {
        msgElement.value = '';
        fetch(url)
            .then(res => res.json())
            .then(res => Object.values(res))
            .then(messages => msgElement.value += messages.map(msg => `${msg.author}: ${msg.content}`).join('\n'));
    });
}

attachEvents();