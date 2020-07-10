var m = require("mithril")
var Expense = require("../models/Expense")

module.exports = {
    oninit: Expense.loadList,
    view: function() {
        return m(".expense-list", Expense.list.map(function(expense) {
            return m(m.route.Link, {
                class: "expense-list-item",
                href: "/edit/" + expense.id,
            }, expense.name)
        }),
            m("form", {
                onsubmit: function(e) {
                    e.preventDefault()
                    Expense.new()
                }
            },
                m("button.button[type=submit]", "New")
            )
        )
    }
}