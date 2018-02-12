/**
 * A loader object.
 *
 * @module app/components
 */

import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';

export function CenterLoader() {
    return <div className="center-loader"><Loader /></div>;
}

export function MaybeLoader({ show }) {
    if (!show) {
        return null;
    }

    return <Loader />;
}

export class LoaderButton extends Component {
    static propTypes = {
        bsStyle: PropTypes.string,
        text: PropTypes.string,
        onClick: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        loaderOptions: PropTypes.object,
    };

    static defaultProps = {
        bsStyle: 'primary',
        loaderOptions: {
            width: 50,
            height: 20,
        },
    };

    render() {
        const { bsStyle, onClick, isLoading, text, children, loaderOptions, ...rest } = this.props;

        return (
            <Button
                bsStyle={bsStyle}
                onClick={onClick}
                disabled={isLoading}
                {...rest}>
                { isLoading ? <Loader {...loaderOptions} /> : (!!children && children.length ? children : text) }
            </Button>
        );
    }
}

export default class Loader extends Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
    }

    static defaultProps = {
        width: 24,
        height: 30,
    };

    render() {
        const { width, height, ...rest } = this.props;

        return (
            <div className='loader'>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width={width} height={height} viewBox="0 0 24 30" xmlSpace="preserve" style={{ enableBackground: 'new 0 0 50 50' }} {...rest}>
                    <rect x="0" y="13" width="4" height="5">
                        <animate attributeName="height" attributeType="XML"
                            values="5;21;5"
                            begin="0s" dur="0.8s" repeatCount="indefinite" />
                        <animate attributeName="y" attributeType="XML"
                            values="13; 5; 13"
                            begin="0s" dur="0.8s" repeatCount="indefinite" />
                    </rect>
                    <rect x="10" y="13" width="4" height="5">
                        <animate attributeName="height" attributeType="XML"
                            values="5;21;5"
                            begin="0.15s" dur="0.8s" repeatCount="indefinite" />
                        <animate attributeName="y" attributeType="XML"
                            values="13; 5; 13"
                            begin="0.15s" dur="0.8s" repeatCount="indefinite" />
                    </rect>
                    <rect x="20" y="13" width="4" height="5">
                        <animate attributeName="height" attributeType="XML"
                            values="5;21;5"
                            begin="0.3s" dur="0.8s" repeatCount="indefinite" />
                        <animate attributeName="y" attributeType="XML"
                            values="13; 5; 13"
                            begin="0.3s" dur="0.8s" repeatCount="indefinite" />
                    </rect>
                </svg>
            </div>
        );
    }
}
