var m = require("mithril")
var Expense = require("../models/Expense")
var DatePicker = require('mithril-datepicker')

module.exports = {

    oninit: (vnode) => { Expense.load(vnode.attrs.id) },
    view(vnode) {
        const expense = Expense.current
        const date = Date(expense.date) || Date.now()

        // TODO - get this working correctly
        let CurrencyInput = {
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
        }

        return (
            <div>
                <label class={"label"}>Name</label>
                <input type="text"
                       placeholder="Name"
                       oninput={e => expense.name = e.target.value}
                       value={expense.name}
                />

                <label class={"label"}>Category</label>
                <input type="text"
                       placeholder="Category"
                       oninput={e => expense.category = e.target.value}
                       value={expense.category}
                />

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

                <button onclick={() => {
                    Expense.save(vnode.attrs.id)
                }}>Save</button>
                <button onclick={() => {
                    Expense.delete(vnode.attrs.id)
                    m.route.set("/list")
                }}>Delete</button>
            </div>
        )
    }
}