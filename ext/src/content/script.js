const MONTHS = {
    januari: '01',
    februari: '02',
    maart: '03',
    april: '04',
    mei: '05',
    juni: '06',
    juli: '07',
    augustus: '08',
    september: '09',
    oktober: '10',
    november: '11',
    december: '12'
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'valid_date') {
        sendResponse({ valid: isDateToCache() });
    }
});

function isDateToCache () {
    const posted = getDumpPubDate();

    const now = new Date();
    now.setDate(now.getDate() - 1);

    return posted <= now;
}

function getDumpPubDate () {
    const [d, m, y] = document.querySelector('.dump-pub').innerHTML.split(' ');

    return new Date(`${y}-${MONTHS[m]}-${d}`);
}
