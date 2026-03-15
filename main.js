const domain = window.location.hostname.split('.').slice(-2).join('.')

console.log(domain)

browser.storage.local.get(domain).then(result => {
    console.log(domain)
    console.log(result[domain])
    
    if (result[domain] === true) {
        document.body.style.display = "none"
    }
})