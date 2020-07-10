// src/views/UserForm.js
var m = require("mithril")
var Expense = require("../models/Expense")
var DatePicker = require('mithril-datepicker')

module.exports = {
    oninit: function(vnode) {Expense.load(vnode.attrs.id)},
    view: function(vnode) {
        var expense = Expense.current
        return m("form", {
            onsubmit: function(e) {
                e.preventDefault()
                Expense.save(vnode.attrs.id)
            }
        }, [
            m("label.label", "Name"),
            m("input.input[type=text][placeholder=Name]", {
                oninput: function (e) {expense.name = e.target.value},
                value: expense.name
            }),
            m("label.label", "Category"),
            m("input.input[type=text][placeholder=Category]", {
                oninput: function (e) {expense.category = e.target.value},
                value: expense.category
            }),
            m("label.label", "Description"),
            m("input.input[type=text][placeholder=Description]", {
                oninput: function (e) {expense.description = e.target.value},
                value: expense.description
            }),
            m("label.label", "Amount"),
            m("input.input[type=text][placeholder=amount]", {
                oninput: function (e) {expense.amount = e.target.value},
                value: expense.amount
            }),
            m("label.label", "Date"),
            m(DatePicker, {
                date: expense.date,
                onchange: function(date) {
                    expense.date = date
                }
            }),

            m("input.input[type=text][placeholder=date]", {
                oninput: function (e) {expense.date = e.target.value},
                value: expense.date
            }),
            m("button.button[type=submit]", "Save"),
        ])
    }
}