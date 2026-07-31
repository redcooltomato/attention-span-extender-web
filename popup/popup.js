import { getActiveTab, getDomainFromTab, sendToAllTabs } from "../scripts/utils.js"

function buttonKillMyself(e) {
    const parent = e.currentTarget.parentNode
    let dom = parent.dataset.key
    
    removeFromFilter(dom)
}

function loadList() {
    let weblist = document.getElementById("website-list")

    weblist.innerHTML = ""

    browser.storage.local.get("block-list").then(result => {
        let list = result["block-list"]

        if (!list) {
            list = []
        }

        let isEmpty = true

        for (const e of list) {
            weblist.insertAdjacentHTML("beforeend",
                `<div data-key="${e}">${e}<button class="kill-button">X</button></div>`
            )

            isEmpty = false
        }

        if (isEmpty) {
            weblist.innerHTML = `<i style="font-size: 14px;">There is nothing here</i>`
        }
        
        document.querySelectorAll(".kill-button").forEach(button => {
            button.addEventListener('click', buttonKillMyself);
        });
    })
}

function addFromInput() {
    const input = document.getElementById("website-input-box").value

    addToFilter(input)

    document.getElementById("website-input-box").value = ""
}

function addToFilter(input) {
    if (input) {
        browser.storage.local.get("block-list").then(result => {
            let list = result["block-list"]

            if (!list) {
                list = []
            }

            list.push(input)

            browser.storage.local.set({"block-list": list}).then(() => {
                loadList()
            })
        })
    }

    sendToAllTabs(input)
}

function removeFromFilter(input) {
    if (input) {
        browser.storage.local.get("block-list").then(result => {
            let list = result["block-list"]

            let idx = list.indexOf(input)
            if (idx > -1) {
                list.splice(idx, 1)
            }

            browser.storage.local.set({"block-list": list}).then(() => {
                loadList()
            })
        })
    }
 
    sendToAllTabs(input)
}



document.addEventListener('DOMContentLoaded', () => {
    loadList()
    
    document.onkeydown = function (e) {
        if (!e) { return }
        if (e.key == "Enter") {
            addFromInput()
        }
    }
    
    document.getElementById("add-current-website-button").addEventListener("click", () => {
        getActiveTab().then((resp) => {
            addToFilter(getDomainFromTab(resp))
        })
    })

    document.getElementById("add-website-button").addEventListener("click", (e) => {
        addFromInput()
    })
})