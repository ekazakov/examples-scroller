import React from 'react';

export class TableRow extends React.Component {
    render() {
        const {row} = this.props;

        return <tr style={{height: 40}}>
            <td className="index">
                <div>{row.id}</div>
            </td>
            <td className="name">
                <div>{row.name}</div>
            </td>
            <td className="address">
                <div>{row.address}</div>
            </td>
            <td className="phone">
                <div>{row.phone}</div>
            </td>
            <td className="email">
                <div>{row.email}</div>
            </td>
        </tr>;
    }
}