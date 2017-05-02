chrome.runtime.sendMessage({type: "GetComments"});

chrome.runtime.onMessage.addListener(function (message) {
    var comments = document.createElement('section');
    var html = message.html;

    comments.innerHTML = html
        ? html
        : 'Geen linkjes gevonden';

    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').appendChild(comments);
});
