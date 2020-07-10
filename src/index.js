var m = require("mithril")

var ExpenseList = require("./views/ExpenseList")
var ExpenseForm = require("./views/ExpenseForm")
var Layout = require("./views/Layout")

m.route(document.body, "/list", {
    "/list": {
        render: function() {
            return m(Layout, m(ExpenseList))
        }
    },
    "/edit/:id": {
        render: function(vnode) {
            return m(Layout, m(ExpenseForm, vnode.attrs))
        }
    },
})