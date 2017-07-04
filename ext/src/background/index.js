chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (tab.url.indexOf('dumpert.nl/mediabase') > -1) {
        chrome.pageAction.show(tabId);
    }
});

const NO_LINKS_FOUND = 'Geen linkjes gevonden'

chrome.extension.onMessage.addListener((request) => {
    if (request.type === 'GetComments') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const { id, url } = tabs[0];
            const key = getSessionKey(url);
            const stored = sessionStorage.getItem(key);

            if (stored) {
                chrome.runtime.sendMessage({ html: stored });
            } else {
                const apiUrl = 'https://i321720.iris.fhict.nl/php/linkjes_scrape.php?target=' + url;
                fetchHtml(apiUrl).then((html) => {
                    html = html
                        ? sortHtmlByKudos(html)
                        : NO_LINKS_FOUND;

                    chrome.tabs.sendMessage(id, { type: 'valid_date' }, (response) => {
                        if (response.valid) {
                            sessionStorage.setItem(key, html);
                        }
                        chrome.runtime.sendMessage({ html });
                    });
                });
            }
        });
    }
});

function fetchHtml (url) {
    return fetch(url).then(response => response.text());
}

function sortHtmlByKudos (html) {
    const section = document.createElement('section');
    section.innerHTML = html;

    return [...section.querySelectorAll('article')]
        .sort((a, b) => b.getAttribute('data-kudos') - a.getAttribute('data-kudos'))
        .map((article) => article.outerHTML);
}

function getSessionKey (url) {
    const split = url.split('/');
    return split[4] + split[5];
}
