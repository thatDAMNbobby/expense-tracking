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

  current: {},
  list: [],
  next: 3,
  load: () => {
    var things = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || defaultData
    this.list = things.categories
    this.next = this.list.slice(-1).id + 1
  },

  save: (id) => {
    const existingIndex = this.list.findIndex(v => v.id == id)

    if (id && existingIndex !== -1) {
      console.log("category save: found existing")
      this.list[existing] = this.current
      console.log("category save: updated element", existingIndex, "to", this.current)
    } else {
      // make a new one
      this.current.id = this.next
    }

  },

  new: () => {
    this.save()
    m.route.set('/editCategory'+this.current.id)
  },

  writeOut: function() {
      // get the live data
      var data = localStorage.getItem(LOCAL_STORAGE_KEY) || defaultData
      // replace the appropriate stuff
      data.categories = this.list
      // write it
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
      console.log("writeOut: wrote", data)
  },

}
