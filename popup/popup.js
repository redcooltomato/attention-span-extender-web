import { getActiveTab, getDomainFromTab, reloadActiveTabIfMatched } from "../scripts/utils.js"


function loadList() {
    let list = document.getElementById("website-list")

    list.innerHTML = ""

    browser.storage.local.get("block-list").then(result => {
        let items = result["block-list"]

        if (!items) {
            items = {}
        }

        let isEmpty = true

        for (const key in items) {
            if (items.hasOwnProperty(key)) {
                list.insertAdjacentHTML("beforeend",
                    `<div data-key="${key}">${key}<button class="kill-button">X</button></div>`
                )

                isEmpty = false
            }
        }

        if (isEmpty) {
            list.innerHTML = `<i style="font-size: 14px;">There is nothing here</i>`
        }
        
        document.querySelectorAll(".kill-button").forEach(button => {
            button.addEventListener('click', buttonKillMyself);
        });
    })
}


function addToFilter(input) {
    if (input) {
        browser.storage.local.get("block-list").then(result => {
            let list = result["block-list"]

            if (!list) {
                list = {}
            }

            list[input] = true

            browser.storage.local.set({"block-list": list}).then(() => {
                loadList()
            })
        })
    }

    reloadActiveTabIfMatched(input)
}

function removeFromFilter(input) {
    if (input) {
        browser.storage.local.get("block-list").then(result => {
            let list = result["block-list"]

            delete list[input]

            browser.storage.local.set({"block-list": list}).then(() => {
                loadList()
            })
        })
    }
 
    reloadActiveTabIfMatched(input)
}

document.getElementById("add-website-button").addEventListener("click", (e) => {
    const input = document.getElementById("website-input-box").value

    addToFilter(input)

    document.getElementById("website-input-box").value = ""
})


function buttonKillMyself(e) {
    const parent = e.currentTarget.parentNode
    let dom = parent.dataset.key
    
    removeFromFilter(dom)
}


document.getElementById("add-current-website-button").addEventListener("click", () => {
    getActiveTab().then((resp) => {
        addToFilter(getDomainFromTab(resp))
    })
})


document.addEventListener('DOMContentLoaded', loadList)