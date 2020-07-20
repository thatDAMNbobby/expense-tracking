const m = require("mithril")
const Expense = require("../models/Expense")

module.exports = {
    oninit() {
        Expense.loadList()
    },
    view() {
        return (
            <div class={"home"}>
                <h1>Expense breakdown</h1>
                <div id="root"></div>
            </div>
        )
    }
}

