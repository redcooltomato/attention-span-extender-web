console.log(window.location.hostname.split('.').slice(-2).join('.'))

browser.storage.local.get(domain).then(result => {
    console.log(domain)
    console.log(result[domain])
    
    if (result[domain] === true) {
        console.log("slay");
        document.body.style.display = "none"
    }
}).catch(error => {
    console.error("err accessing storage,", error)
});