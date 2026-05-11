const domain = window.location.hostname.split('.').slice(-2).join('.')
const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1)

function sleep(ms) { // i have to duplicate this for some reason
    return new Promise(resolve => setTimeout(resolve, ms))
}

function blockout() {
    browser.storage.local.get("block-list").then(result => {
    
    let list = result["block-list"]

    if (!list) {
        list = {}
    }

    if (domain in list) {
        // prob really bad idea
        document.head.innerHTML = `
            <title>Swoon</title>
            <link rel="icon" type="image/x-icon" href="${browser.runtime.getURL("assets/icon48.png")}">
            <style>
                html {background-color: black;}
            </style>
        `
        document.body.innerHTML = `

        `

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((newNode) => {
                    mutation.target.removeChild(newNode)
                })
            })
        })

        observer.observe(document.body, {
            subtree: true,
            childList: true
        })
    }

    })
}



blockout()
sleep(5).then(() => { // to prevent some stuff
    blockout()
})