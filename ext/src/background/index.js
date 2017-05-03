chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (tab.url.indexOf('dumpert.nl/mediabase') > -1) {
        chrome.pageAction.show(tabId);
    }
});

chrome.extension.onMessage.addListener(function (request) {
    if (request.type === 'GetComments') {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var url = 'https://i321720.iris.fhict.nl/php/linkjes_scrape.php?target=' + tabs[0].url;

            fetchHtml(url).then(function (html) {
                chrome.runtime.sendMessage({html: html});
            });
        });
    }
});

function fetchHtml(url) {
    return fetch(url).then(function (response) {
        return response.text();
    });
}