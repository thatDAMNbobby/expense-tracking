const m = require("mithril")

module.imports = {
    oninit(vnode) { console.log(vnode) },
    view() {
        return (
            <div>
                <h1>Settings</h1>
            </div>
        )
    }
}