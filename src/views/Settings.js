const m = require("mithril")

module.exports = {
    oninit(vnode) {},
    view() {
        return (
            <div>
                <h1>Settings</h1>
                <p>There's nothing to do here yet, so look at this kitten</p>
                <img src={"https://placekitten.com/600/400"} alt={"kitten photo"} id={"placeholder-photo"}/>
            </div>
        )
    }
}
