var m = require("mithril")
var Category = require("../models/Category")
var Table = require("../Components/Table")

module.exports = {

    oninit() { Category.loadList() },
    view() {

        const categories = Category.list
        const columns = [{name:"name", title:"Name"}]

        return (
            <div class={"category-list category-list-table"}>
                <h1>Catgeories</h1>
                <Table id={"category-list"}
                       rows={categories}
                       columns={columns}
                       path={"/categories/edit/"}
                       tableClass={"category-list-table"}
                />
                <button onclick={e => {
                    e.preventDefault()
                    Category.new()
                    m.route.set(`/categories/edit/${Category.current.id}`)
                }}>New</button>
            </div>
        )
    }
}
