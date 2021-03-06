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
        sendResponse({ valid: isDateToCache(getCurrentDumpDate()) });
    }
});

function isDateToCache(date) {
    const now = new Date();
    now.setDate(now.getDate() - 1);

    return date <= now;
}

function getCurrentDumpDate() {
    const [d, m, y] = document.querySelector('.dump-pub').innerHTML.split(' ');

    return new Date(`${y}-${MONTHS[m]}-${d}`);
}
