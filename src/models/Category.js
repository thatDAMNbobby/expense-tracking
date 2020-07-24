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
    this.list = things.categories
    if (this.list === undefined) {
      this.list = defaultData.categories
    }
    this.next = this.list.length
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
    }

    this.writeOut()
  },

  find: function(id) {
    return this.list.find(v => v.id == id)
  },

  new: function() {
    this.current = {id: this.next}
    this.save(this.current.id)

  },

  writeOut: function() {
      // get the live data
      var data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || defaultData
      // replace the appropriate stuff
      data.categories = this.list
      // write it
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
  },

}
