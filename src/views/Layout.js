var m = require("mithril")

module.exports = {

    view(vnode) {
        return (
            <div class={"main layout"}>
                <div class={"nav menu"}>
                    <m.route.Link href={"/"}>Home</m.route.Link>
                     |
                    <m.route.Link href={"/list"}>Expenses</m.route.Link>
                     |
                    <m.route.Link href={"/categories"}>Categories</m.route.Link>
                     |
                    <m.route.Link href={"/settings"}>Settings</m.route.Link>
                </div>
                <div class={"section"}>{vnode.children}</div>
            </div>
        )
    }
}
