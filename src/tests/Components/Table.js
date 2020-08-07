var m = require("mithril")
var mq = require("mithril-query")
var o = require("ospec")

var Table = require("../../Components/Table")

o.spec("Table", function() {
    o("Only required attrs are given: correctly uses default displayKey", function() {
        var out = mq(
            <Table
                path={'/'}
                rows={[{id: 1, name: 'name'}]}
                columns={['id', 'name']}
            />
        )
        out.should.have('div')
        //console.log(out)
    })

    // o("Only rows and columns passed in: Defaults are used", () => {
    //     var out = mq(
    //         <Table columns={['id', 'name']}/>
    //     )
    //     out.should.have('div')
    // })
})