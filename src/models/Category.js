var m = require("mithril")

const LOCAL_STORAGE_KEY = "expenseTrackingData"

const defaultData = {
  categories: [
    {id: 0, name: "Personal"},
    {id: 1, name: "Work"},
    {id: 2, name: "Another category"}
  ]
}

module.exports = {
  list: [],
  next: 3,
  loadList: function() {
    var things = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || defaultData
    console.log("category loadList: things is", things)
    this.list = things.categories
    console.log("category loadList: this.list is", this.list)
    if (this.list === undefined) {
      console.log("category loadList: there was no data, using the default")
      this.list = defaultData.categories
    }
    console.log("category loadList: this.list is now", this.list)
    this.next = this.list.length
    console.log("category loadList: this.next is now", this.next)
  },

  current: {},
  load: function(id) {
    this.loadList()
    console.log("category load: loading id", id)
    const found = this.list.find(v => v.id == id)
    if (found !== undefined) {
      console.log("category load: found", found)
      this.current = found
    } else {
      this.current = {id: this.next}
    }
    console.log("category load: current", this.current)
  },

  save: function(id) {
    console.log("category save: id", id)
    const existingIndex = this.list.findIndex(v => v.id == id)

    if (id && existingIndex !== -1) {
      console.log("category save: found existing")
      this.list[existingIndex] = this.current
      console.log("category save: updated element", existingIndex, "to", this.current)
    } else {
      console.log("category save: id was not found, pushing new one")
      this.list.push(this.current)
    }

    this.writeOut()
  },

  find: function(id) {
    return this.list.find(v => v.id == id)
  },

  new: function() {
    // make a new one
    console.log("category save: making a new category")
    this.current = {id: this.next}
    console.log("category save: current.id", this.current.id)
    this.save(this.current.id)

  },

  writeOut: function() {
      // get the live data
      var data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || defaultData
      console.log("writeOut: got data", data)
      // replace the appropriate stuff
      data.categories = this.list
      // write it
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
      console.log("writeOut: wrote", data)
  },

}
