export function getActiveTab() { // irreplaceble by browser.tabs.getActive() as it doesnt work for some reason
    return browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        return tabs[0]
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

export function reloadActiveTabIfMatched(name) {
    getActiveTab().then((res) => {
        if (getDomainFromTab(res) == name) {
            browser.tabs.reload(res.id)
        }
    })
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}