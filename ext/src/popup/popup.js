chrome.runtime.sendMessage({type: 'GetComments'});

chrome.runtime.onMessage.addListener(function (message) {
    var comments = document.createElement('section');
    comments.innerHTML = message.html;

    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').appendChild(comments);
});
