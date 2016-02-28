import React from 'react';
import {TableRow} from './TableRow';
import {TableRowsSet} from './TableRowSet';
import {Scrollable} from './Scrollable';

function calculateAbsoluteTopOffset(elem) {
    let offsetTop = elem.offsetTop;

    while(elem.offsetParent != null) {
        elem = elem.offsetParent;
        offsetTop += elem.offsetTop;
    }

    return offsetTop;
}

export class App extends React.Component {
    render() {
        const {rows} = this.props;
        const options = {
            size: rows.length,
            rowHeight: 40
        };
        return <div>
            <div id="table">
                <Scrollable {...options} >
                    <TableRowsSet rows={rows}/>
                </Scrollable>
            </div>
        </div>;
    }
}