export function getActiveTab() { // irreplaceble by browser.tabs.getActive() as it doesnt work for some reason in poppups
    return browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        return tabs[0]
    })
}

export function sendToAllTabs(msg) {
    browser.tabs.query({}).then((tabs) => {
        for (const tab of tabs) {
            if (!tab || !tab.id) {
                continue
            }
            browser.tabs.sendMessage(tab.id, msg).catch(() => {
                // don't do anything 
            })
        }
    })
}

export function getDomainFromTab(tab) {
    let dom = ""
    if (tab.url) {
        try {
            let url = new URL(tab.url)
            dom = url.hostname.split('.').slice(-2).join('.')
        } catch (e) {
            dom = ""
        }
    }
    return dom
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}