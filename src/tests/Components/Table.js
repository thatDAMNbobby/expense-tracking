var m = require("mithril")
var mq = require("mithril-query")
var o = require("ospec")

var Table = require("../../Components/Table")

o.spec("Table", function() {
    o("Only required attrs are given: correctly builds table using defaults", function() {
        var vnode = mq(
            <Table
                path={'/'}
                rows={[
                    {id: 1, name: 'row1'},
                    {id: 2, name: 'row2'}]}
                columns={[
                    {title: 'Id', name: 'id'},
                    {title: 'Name', name: 'name'}]}
            />
        )

        o(vnode.rootNode.children[0].attrs.id).equals("fancy-table")
        o(vnode.rootNode.children[0].children[0].children[0].children[0].text).equals("Id")
        o(vnode.rootNode.children[0].children[0].children[0].children[1].text).equals("Name")
        o(vnode.rootNode.children[0].children[1].tag).equals("tbody")
        o(vnode.rootNode.children[0].children[1].children[0].tag).equals("tr")
        o(vnode.rootNode.children[0].children[1].children[0].children[0].text).equals("1")
        o(vnode.rootNode.children[0].children[1].children[0].children[1].text).equals("row1")
        o(vnode.rootNode.children[0].children[1].children[1].children[0].text).equals("2")
        o(vnode.rootNode.children[0].children[1].children[1].children[1].text).equals("row2")
    })

    o("Custom rowDisplayKey: correctly builds table", function() {
        var vnode = mq(
            <Table
                path={'/'}
                rowDisplayKey={'otherName'}
                rows={[
                    {id: 1, name: 'row1'},
                    {id: 2, name: 'row2'}]}
                columns={[
                    {title: 'Id', otherName: 'id'},
                    {title: 'Name', otherName: 'name'}]}
            />
        )

        o(vnode.rootNode.children[0].attrs.id).equals("fancy-table")
        o(vnode.rootNode.children[0].children[0].children[0].children[0].text).equals("Id")
        o(vnode.rootNode.children[0].children[0].children[0].children[1].text).equals("Name")
        o(vnode.rootNode.children[0].children[1].tag).equals("tbody")
        o(vnode.rootNode.children[0].children[1].children[0].tag).equals("tr")
        o(vnode.rootNode.children[0].children[1].children[0].children[0].text).equals("1")
        o(vnode.rootNode.children[0].children[1].children[0].children[1].text).equals("row1")
        o(vnode.rootNode.children[0].children[1].children[1].children[0].text).equals("2")
        o(vnode.rootNode.children[0].children[1].children[1].children[1].text).equals("row2")
    })

    o("Custom colDisplayKey: correctly builds table", function() {
        var vnode = mq(
            <Table
                path={'/'}
                colDisplayKey={'otherTitle'}
                rows={[
                    {id: 1, name: 'row1'},
                    {id: 2, name: 'row2'}]}
                columns={[
                    {otherTitle: 'Id', name: 'id'},
                    {otherTitle: 'Name', name: 'name'}]}
            />
        )

        o(vnode.rootNode.children[0].attrs.id).equals("fancy-table")
        o(vnode.rootNode.children[0].children[0].children[0].children[0].text).equals("Id")
        o(vnode.rootNode.children[0].children[0].children[0].children[1].text).equals("Name")
        o(vnode.rootNode.children[0].children[1].tag).equals("tbody")
        o(vnode.rootNode.children[0].children[1].children[0].tag).equals("tr")
        o(vnode.rootNode.children[0].children[1].children[0].children[0].text).equals("1")
        o(vnode.rootNode.children[0].children[1].children[0].children[1].text).equals("row1")
        o(vnode.rootNode.children[0].children[1].children[1].children[0].text).equals("2")
        o(vnode.rootNode.children[0].children[1].children[1].children[1].text).equals("row2")
    })

})