export function getActiveTab() {
    return browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        return tabs[0]
    })
}


export function getDomainFromTab(tab) {
    dom = ""
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