function loadList() {
    let list = document.getElementById("website-list")

    list.innerHTML = ""

    browser.storage.local.get().then(items => {
        for (const key in items) {
            if (items.hasOwnProperty(key)) {
                list.insertAdjacentHTML("beforeend",
                    `<div data-key="${key}">${key}<button class="kill-button">X</button></div>`
                )
            }
        }
        
        document.querySelectorAll(".kill-button").forEach(button => {
            button.addEventListener('click', buttonKillMyself);
        });
    })
}


function addToFilter(input) {
    if (input) {
        browser.storage.local.set({[input]: true}).then(() => {
            loadList()
        })
    }
}


document.getElementById("add-website-button").addEventListener("click", (e) => {
    const input = document.getElementById("website-input-box").value

    addToFilter(input)

    document.getElementById("website-input-box").value = ""
})


function buttonKillMyself(e) {
    const parent = e.currentTarget.parentNode
    
    browser.storage.local.remove(parent.dataset.key).then(() => {
        loadList()
    })
}


function getActiveWindow() {
    return browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        let current = tabs[0]
        return current
    })
}


document.getElementById("add-current-website-button").addEventListener("click", () => {
    getActiveWindow().then((resp) => {
        let dom = ""

        if (resp.url) {
            try {
                let url = new URL(resp.url)
                dom = url.hostname.split('.').slice(-2).join('.')
            } catch (e) {
                dom = ""
            }
        }
        
        addToFilter(dom)
    })
})


document.addEventListener('DOMContentLoaded', loadList)