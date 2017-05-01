chrome.runtime.sendMessage({type: "GetComments"});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    var comments = document.createElement('section');

    comments.innerHTML = message.html;

    document.getElementById('content').appendChild(comments);
});