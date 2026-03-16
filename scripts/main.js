const domain = window.location.hostname.split('.').slice(-2).join('.')

console.log(domain)

browser.storage.local.get(domain).then(result => {
    
    if (result[domain] === true) {
        document.head.innerHTML = `
            <title>Swoon</title>
            <style>
                html {background-color: black;}
            </style>
        `
        document.body.innerHTML = `

        `
    }
    
})