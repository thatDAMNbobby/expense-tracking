var m = require("mithril")
var Expense = require("../models/Expense")
var DatePicker = require('mithril-datepicker')
var Category = require("../models/Category")

module.exports = {

    oninit: (vnode) => {
        Expense.load(vnode.attrs.id)
        Category.loadList()
    },
    view(vnode) {
        const expense = Expense.current
        const date = Date(expense.date) || Date.now()
        const categories = Category.list

        return (
            <div>
                <label class={"label"}>Name</label>
                <input type="text"
                       placeholder="Name"
                       oninput={e => expense.name = e.target.value}
                       value={expense.name}
                />

                <label class={"label"} for={"categories"}>Category</label>
                <select name={"categories"}
                        placeholder="Category"
                        onchange={e => expense.category = e.target.value}
                        value={expense.category}
                >
                    {categories.map(c => {
                        return (
                            <option value={c.id}>{c.name}</option>
                        )
                    })}

                </select>
                <label class={"label"}>Description</label>
                <input type="text"
                       placeholder="Description"
                       oninput={e => expense.description = e.target.value}
                       value={expense.description}
                />

                <label class={"label"}>Amount</label>
                <input
                    placeholder="Amount"
                    onchange={e => expense.amount = e.target.value}
                />

                <label class={"label"}>Date</label>
                <DatePicker date={date}
                            onchange={d => expense.date = Date.parse(d)}
                />
                <br />
                <button onclick={() => {
                    Expense.save(vnode.attrs.id)
                    m.route.set('/list')
                }}>Save</button>
                <button onclick={() => {
                    Expense.delete(vnode.attrs.id)
                    m.route.set("/list")
                }}>Delete</button>
            </div>
        )
    },

    // TODO - get this working correctly
    CurrencyInput: {
        oninit(vnode) {
            this.value = (vnode.attrs.value || '').toLowerCase().replace(/[^0-9.]+/g, '')
        },
        view(vnode) {
            return (
                <input {...vnode.attrs}
                       value={this.value}
                       oninput={ e => {
                           e.preventDefault()
                           e.target.value = e.target.value.toLowerCase().replace(/[^0-9.]+/g, '')
                           this.value = e.target.value
                       }}
                />
            )
        }
    },
}