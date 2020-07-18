var m = require("mithril")
var moment = require("moment")
var Table = require("../Components/Table")
var Expense = require("../models/Expense")

module.exports = {
    oninit() { Expense.loadList() },
    view() {

        const rows = Expense.list.map(v => {
            v.date = moment(v.date).format('YYYY/MM/DD')
            return v
        })

        console.log(rows)

        return [
            <Table
                columns={columns}
                rows={rows}/>,

            <button onclick={e => {
                e.preventDefault()
                Expense.new()
            }}>New</button>
        ]
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