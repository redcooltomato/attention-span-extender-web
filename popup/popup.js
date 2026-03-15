function loadList() {
    let list = document.getElementById("website-list")

    list.innerHTML = `<p>Current list</p>`

    browser.storage.local.get().then(items => {
        for (const key in items) {
            if (items.hasOwnProperty(key)) {
                list.insertAdjacentHTML("beforeend",
                    `<div data-key="${key}">${key}<button class="kill-button" onclick="buttonKillMyself(this)">kill me</button></div>`
                )
            }
        }
    })
}

document.getElementById("add-website-button").addEventListener("click", (e) => {
    const input = document.getElementById("website-input-box").value

    if (input) {
        browser.storage.local.set({[input]: true}).then(() => {
            loadList()
        })
    }

    document.getElementById("website-input-box").value = ""
})

function buttonKillMyself(el) {
    
}

document.addEventListener('DOMContentLoaded', loadList)