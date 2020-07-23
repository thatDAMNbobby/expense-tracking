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
        console.log("loadlist: things is", things)
        console.log("loadlist: things.list is", things.list)
    },

    current: {},
    load: function(id) {
        this.loadList()
        console.log("load: looking for id", id)
        const found = this.list.find(v => v.id == id)
        if (found !== undefined) {
            console.log("load: found", found)
            this.current = found
        } else {
            console.log("load: not found, making a new one with id", id)
            this.current = {id: this.next}
        }
        console.log("load: current", this.current)
    },

    save: function(id) {
        const existingIndex = this.list.findIndex(v => v.id == id)

        if (id && existingIndex !== -1) {
            console.log("save: found existing")
            this.list[existingIndex] = this.current
            console.log("save: updated element", existingIndex, "to", this.current)
        } else {
            console.log("new: current is", this.current)
            this.list.push(this.current)
            console.log("save: list appended with", this.current)
            this.next++
            console.log("save: next is now", this.next)
        }

        console.log("save: list is now", this.list)
        this.writeOut()
    },

    delete: function(id) {
        this.loadList()
        console.log("delete: removing id", id)
        this.list = this.list.filter(v => v.id != id)
        this.current = {}
        this.writeOut()
    },

    writeOut: function() {
        // get the live data
        var data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || defaultData
        console.log("writeout: pulled data", data)
        // replace the appropriate stuff
        data.next = Number(this.next)
        data.list = this.list
        // write it
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
        console.log("writeOut: wrote", data)
    },

    new: function() {
        console.log("new: making a new expense")
        this.current = {
            id: this.next,
            date: Date.now()
        }
        this.save(this.current.id)
    }
}
