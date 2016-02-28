import React from 'react';

export class Scrollable extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            viewportHeight: window.innerHeight,
            scrollTop: window.pageYOffset,
            offsetTopIndex: 0
        };
    }

    render() {
        const from = this.state.offsetTopIndex;
        const to = this.state.viewportHeight / this.props.rowHeight;
        return <div>
            {React.Children.map(
                this.props.children,
                (child) => React.cloneElement(child, {from, to}, child.props.children))}
        </div>;
    }
}