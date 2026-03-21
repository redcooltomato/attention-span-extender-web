const domain = window.location.hostname.split('.').slice(-2).join('.')

browser.storage.local.get("block-list").then(result => {
    
    let list = result["block-list"]

    if (!list) {
        list = {}
    }

    if (domain in list) {
        // prob really bad idea, if you are reading this, write an issue or smth if you know how to do this better way
        document.head.innerHTML = `
            <title>Swoon</title>
            <link rel="icon" type="image/x-icon" href="${browser.runtime.getURL("assets/icon48.png")}">
            <style>
                html {background-color: black;}
            </style>
        `
        document.body.innerHTML = `

        `
    }
    
})