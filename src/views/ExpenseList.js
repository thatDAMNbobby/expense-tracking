var m = require("mithril")
var moment = require("moment")
var Table = require("../Components/Table")
var Expense = require("../models/Expense")
var Category = require("../models/Category")

module.exports = {
    oninit() {
        Expense.loadList()
        Category.loadList()
    },
    view() {

        const rows = Expense.list.map(v => {
            v.date = moment(v.date).format('YYYY/MM/DD')
            v.category = (Category.find(v.category) || {name: ""}).name
            return v
        })

        return (
            <div class={"expense-list"}>
            <Table
                columns={columns}
                rows={rows}
                path={"/edit/"}
                tableClass={"expense-list-table"}
            />
            <button onclick={e => {
                e.preventDefault()
                Expense.new()
                m.route.set('/edit/'+Expense.current.id)
            }}>New</button>
            </div>
        )
    }
}

const columns = [
    {
        title: "Name",
        name: "name"
    },
    {
        title: "Category",
        name: "category"
    },
    {
        title: "Description",
        name: "description"
    },
    {
        title: "Amount",
        name: "amount"
    },
    {
        title: "Date",
        name: "date"
    }
]