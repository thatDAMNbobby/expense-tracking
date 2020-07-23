const m = require("mithril")
const Expense = require("../models/Expense")

module.exports = {
    oninit() {
        Expense.loadList()
    },
    view() {
        return (
            <div class={"home"}>
                <h1>Expense breakdown, or something similar</h1>
                <img src={"https://i.kym-cdn.com/photos/images/newsfeed/001/499/826/2f0.png"} />
                <div id="root"></div>
            </div>
        )
    }
}

