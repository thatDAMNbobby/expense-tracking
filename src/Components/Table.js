var m = require("mithril")

module.exports = {
    oninit: (vnode) => { console.log(vnode)},
    view(vnode) {

        const columns = vnode.attrs.columns
        const rows = vnode.attrs.rows

        return (
            <div class={"expense-list"}>
                <table class={"expense-list-table"}>

                    <thead>
                    <tr>
                        {columns.map(h => {
                            return (<th>{h.title}</th>)
                        })}
                    </tr>
                    </thead>

                    <tbody>
                        {rows.map(row => (
                            <tr>
                                {columns.map(h => {
                                    return (<td onclick={() => m.route.set("/edit/" + row.id)}>{row[h.name]}</td>)
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
