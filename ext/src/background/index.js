chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === "GetComments") {
        chrome.tabs.query({active: true}, function (tabs) {
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