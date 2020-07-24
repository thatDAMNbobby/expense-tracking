const m = require("mithril")
const c3 = require("c3")
const d3 = require("d3")

const Expense = require("../models/Expense")
const Category = require("../models/Category")

module.exports = {

    oninit() {
        Expense.loadList()
        const expenses = Expense.list

        var counts = expenses
            .map(k => [k.category])
            .reduce((cat, item) => {
                cat[item] = (cat[item] || 0) +1
                return cat
            }, {})

        this.data = {
            type: 'pie',
            columns: Array.from(Object.entries(counts))
        }
    },
    oncreate({ dom, attrs}) {
      this.chart = c3.generate({
          bindto: "#chart",
          data: this.data
      })
    },
    onupdate({ dom, attrs }) {
      this.chart.load({
        columns: attrs.columns
      })
    },
    view() {
        return (
            <div class={"home"}>
                <h1>Expense breakdown, or something similar</h1>
                <div id="chart"></div>
            </div>
        )
    }
}

