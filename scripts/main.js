const domain = window.location.hostname.split('.').slice(-2).join('.')
const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1)

const block_css = `
    width: 100%;
    height: 100%;
    background-color: black;
    
    color: white;
    font-size: 18px;
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
        list = {}
    }

    if (domain in list) {
        block = document.createElement("div")
        block.style.cssText = block_css
        block.innerHTML = "Swoon"
        document.body.appendChild(block)
    }

    })
}



blockout()