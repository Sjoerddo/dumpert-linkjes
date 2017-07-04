chrome.runtime.sendMessage({ type: 'GetComments' });

chrome.runtime.onMessage.addListener(({ html }) => {
    const comments = document.createElement('section');
    comments.innerHTML = typeof html === 'object'
        ? html.join('')
        : html;

    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').appendChild(comments);
});
