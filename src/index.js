var m = require("mithril")

var Home = require("./views/Home")
var ExpenseList = require("./views/ExpenseList")
var ExpenseForm = require("./views/ExpenseForm")
var Layout = require("./views/Layout")

m.route(document.body, "/", {
    "/": {
        render: () => {
            return m(Layout, m(Home))
        }
    },
    "/list": {
        render: () => {
            return m(Layout, m(ExpenseList))
        }
    },
    "/edit/:id": {
        render: (vnode) => {
            return m(Layout, m(ExpenseForm, vnode.attrs))
        }
    },
})