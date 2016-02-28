import React from 'react';

export class Scrollable extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            viewportHeight: window.innerHeight,
            scrollTop: window.pageYOffset
        };

        this.onScroll = this.onScroll.bind(this);
    }

    onScroll() {
        this.setState({scrollTop: window.pageYOffset});
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    render() {
        const {floor, min, ceil} = Math;
        const {viewportHeight, scrollTop} = this.state;
        const {size, rowHeight, children} = this.props;

        const from = min(floor(scrollTop / rowHeight), 0);
        const to = min(ceil((scrollTop + viewportHeight)/rowHeight), size);

        return <div>
            <div style={{height: this._topPlaceholderHeight(from)}}></div>
            {React.Children.map(
                children,
                (child) => React.cloneElement(child, {from, to}, child.props.children))}
            <div style={{height: this._bottomPlaceholderHeight(size, to)}}></div>
        </div>;
    }

    _topPlaceholderHeight(from) {
        return from * this.props.rowHeight;
    }

    _bottomPlaceholderHeight(size, to) {
        return (size - to) * this.props.rowHeight;
    }
}