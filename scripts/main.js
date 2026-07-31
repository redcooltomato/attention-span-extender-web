const domain = window.location.hostname.split('.').slice(-2).join('.')
const path = domain + window.location.pathname

const block_css = `
    visibility: hidden;

    width: 100%;
    height: 100%;
    background-color: black;
    
    color: white;
    font-size: 20px;
    font-family: 'Times New Roman', Times, serif;
    
    z-index: 999999;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

let block

function blockout() {
    browser.storage.local.get("block-list").then(result => {
    
    let list = result["block-list"]
    if (!list) {
        list = []
    }

    if (list.filter(addr => path.startsWith(addr)).length > 0) {
        if (!block) {
            block = document.createElement("div")
            block.style.cssText = block_css
            document.body.appendChild(block)
        }
        block.style.visibility = "visible"
    } else {
        if (block) {
            block.style.visibility = "hidden"
        }
    }
    
    if (block) {
        block.innerHTML = ""
        browser.storage.local.get("block-text").then(result => {
            if (result["block-list"]) {
                block.innerHTML = result["block-list"]
            } else {
                browser.storage.local.set({"block-text": "Swoon"})
                block.innerHTML = "Swoon"
            }
        })
    }

    })
}


blockout()

browser.runtime.onMessage.addListener((msg, sender) => {
    blockout()
})