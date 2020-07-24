var m = require("mithril")

const LOCAL_STORAGE_KEY = "expenseTrackingData"

const defaultData = {
  next:0,
  list:[]
}

module.exports = {
    list: [],
    next: 0,
    loadList: function() {
        const things = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || defaultData
        this.next = things.next || defaultData.next
        this.list = things.list || defaultData.list
    },

    current: {},
    load: function(id) {
        this.loadList()
        const found = this.list.find(v => v.id == id)
        if (found !== undefined) {
            this.current = found
        } else {
            this.current = {id: this.next}
        }
    },

    save: function(id) {
        const existingIndex = this.list.findIndex(v => v.id == id)

        if (id && existingIndex !== -1) {
            this.list[existingIndex] = this.current
        } else {
            this.list.push(this.current)
            this.next++
        }

        this.writeOut()
    },

    delete: function(id) {
        this.loadList()
        this.list = this.list.filter(v => v.id != id)
        this.current = {}
        this.writeOut()
    },

    writeOut: function() {
        // get the live data
        var data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || defaultData
        // replace the appropriate stuff
        data.next = Number(this.next)
        data.list = this.list
        // write it
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
    },

    new: function() {
        this.current = {
            id: this.next,
            date: Date.now()
        }
        this.save(this.current.id)
    }
}
