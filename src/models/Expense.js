var m = require("mithril")

const LOCAL_STORAGE_KEY = "expenseTrackingData"

module.exports = {
    list: [],
    next: 0,
    loadList: function() {
        var things = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || { next: 0, list: [] }
        this.next = things.next
        this.list = things.list.filter(v => v.name)
    },

    current: {},
    load: function(id) {
        this.loadList()
        console.log("load: looking for id", id)
        const found = this.list.find(thing => thing.id == id)
        console.log("load: found", found)
        if (found !== undefined) {
            this.current = found
        } else {
            this.current = {id: id}
        }
        console.log("load: current", this.current)
    },

    save: function(id) {
        const existingIndex = this.list.findIndex(v => v.id == id)

        if (id && existingIndex !== -1) {
            console.log("save: found existing")
            this.list[existingIndex] = this.current
            console.log("save: updated element",existingIndex, "to", this.current)
        } else {
            // make a new one
            this.current.id = this.next
            this.current.date = Date.now()
            console.log("new: current is", this.current)
            this.list.push(this.current)
            console.log("save: list appended with", this.current)
            this.next++
            console.log("save: next is now", this.next)
        }

        console.log("save: list is now", this.list)
        this.current = {}
        this.writeOut()
        m.route.set('/list')
    },

    delete: function(id) {
        this.loadList()
        console.log("delete: removing id", id)
        this.list = this.list.filter(v => v.id != id)
        this.current = {}
        this.writeOut()
    },

    writeOut: function() {
        const data = {next: Number(this.next), list: this.list}
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
        console.log("writeOut: wrote", data)
    },

    new: function() {
        this.save()
        m.route.set('/edit/'+this.current.id)
    }
}
