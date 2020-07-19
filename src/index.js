const m = require("mithril")

const Home = require("./views/Home")
const ExpenseList = require("./views/ExpenseList")
const ExpenseForm = require("./views/ExpenseForm")
const Categories = require("./views/CategoryList")
const CategoryForm = require("./views/CategoryForm")
const SettingsPage = require("./views/Settings")
const Layout = require("./views/Layout")

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
    "/categories": {
        render: () => {
            return m(Layout, m(Categories))
        }
    },
    "/edit/:id": {
        render: (vnode) => {
            return m(Layout, m(ExpenseForm, vnode.attrs))
        }
    },
    "/categories/edit/:id": {
        render: (vnode) => {
            return m(Layout, m(CategoryForm, vnode.attrs))

        }
    },
    "/settings": {
        render: (vnode) => {
            return m(Layout, m(SettingsPage, vnode.attrs))
        }
    }
})
