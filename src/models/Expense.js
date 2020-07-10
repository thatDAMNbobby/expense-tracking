var m = require("mithril")

const LOCAL_STORAGE_KEY = "expenseTrackingData"

var Expense = {
    list: [],
    loadList: function() {
        var things = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (Array.isArray(things))
            Expense.list = things
    },

    current: {},
    load: function(id) {
        var things = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        Expense.current = things[id]
    },

    save: function(id) {
        this.list[id] = this.current
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.list))
        m.route.set('/list')
    },

    new: function() {
        this.current = {}
        this.current.id = this.list.length || 0
        this.save(this.current.id)
        m.route.set('/edit/'+this.current.id)
    }
}

module.exports = Expense