chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (tab.url.indexOf('dumpert.nl/mediabase') > -1) {
        chrome.pageAction.show(tabId);
    }
});

var NO_LINKS_FOUND = 'Geen linkjes gevonden';

chrome.extension.onMessage.addListener(function (request) {
    if (request.type === 'GetComments') {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var tabUrl = tabs[0].url;
            var key = getSessionKey(tabUrl);

            var stored = sessionStorage.getItem(key);
            if (stored) {
                chrome.runtime.sendMessage({html: stored});
            } else {
                var apiUrl = 'https://i321720.iris.fhict.nl/php/linkjes_scrape.php?target=' + tabUrl;

                fetchHtml(apiUrl).then(function (html) {
                    html = html || NO_LINKS_FOUND;
                    sessionStorage.setItem(key, html);
                    chrome.runtime.sendMessage({html: html});
                });
            }
        });
    }
});

function fetchHtml(url) {
    return fetch(url).then(function (response) {
        return response.text();
    });
}

function getSessionKey(url) {
    var split = url.split('/');
    return split[4] + split[5];
}
