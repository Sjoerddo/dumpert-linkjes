chrome.runtime.sendMessage({type: "GetComments"});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    var comments = document.createElement('section');
    var html = message.html;

    comments.innerHTML = html
        ? html
        : 'Geen linkjes gevonden';

    document.getElementById('content').appendChild(comments);
});