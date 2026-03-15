console.log(window.location.hostname.split('.').slice(-2).join('.'))


if (localStorage.getItem(window.location.hostname.split('.').slice(-2).join('.'))) {
    document.body.style.display = "None"
}