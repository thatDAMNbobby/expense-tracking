var m = require("mithril")

module.exports = {

    view(vnode) {

        const columns = vnode.attrs.columns
        const rows = vnode.attrs.rows
        const path = vnode.attrs.path
        const tableClass = vnode.attrs.tableClass || ""
        const headClass = vnode.attrs.headClass || ""
        const rowDisplayKey = vnode.attrs.rowDisplayKey || "name"
        const colDisplayKey = vnode.attrs.colDisplayKey || "title"
        const idKey = vnode.attrs.displayKey || "id"

        return (
            <div>
                <table class={tableClass}>

                    <thead class={headClass}>
                    <tr>
                        {columns.map(h => {
                            return (<th>{h[colDisplayKey]}</th>)
                        })}
                    </tr>
                    </thead>

                    <tbody>
                        {rows.map(row => (
                            <tr>
                                {columns.map(col => {
                                    return (
                                        <td onclick={() =>
                                            m.route.set(path + row[idKey])}
                                        >{row[col[rowDisplayKey]]}</td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
