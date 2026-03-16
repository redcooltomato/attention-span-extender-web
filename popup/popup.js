import { getActiveTab, getDomainFromTab } from "../scripts/utils.js"


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

    getActiveTab().then((res) => {
        if (getDomainFromTab(res) == input) {
            browser.tabs.reload(res.id)
        }
    })
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


document.getElementById("add-current-website-button").addEventListener("click", () => {
    getActiveTab().then((resp) => {
        addToFilter(getDomainFromTab(resp))
    })
})


document.addEventListener('DOMContentLoaded', loadList)