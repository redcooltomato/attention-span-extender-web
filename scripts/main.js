const domain = window.location.hostname.split('.').slice(-2).join('.')

browser.storage.local.get(domain).then(result => {
    
    if (result[domain] === true) {
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