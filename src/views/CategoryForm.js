var m = require("mithril")
var Category = require("../models/Category")

module.exports = {

    oninit: (vnode) => {
        Category.load(vnode.attrs.id)
    },
    view(vnode) {
        const category = Category.current

        return (
            <div>
                <label class={"label"}>Name</label>
                <input type="text"
                       placeholder="Name"
                       oninput={e => category.name = e.target.value}
                       value={category.name}
                />
                <button onclick={() => {
                    Category.save(vnode.attrs.id)
                    m.route.set("/categories")
                }}>Save</button>
            </div>
        )
    }
}