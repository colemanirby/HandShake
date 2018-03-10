import React, {Component} from 'react'

export default class TransactionsModal extends Component {

    constructor(props) {
        super(props);
        this.state= {
            step: 1,
            header: "Wow, what an amazing header"
        };
        this.close= this.close.bind(this)
    }

    render() {

        let modalStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999',
            background: '#fff'
        };

        if (this.props.width && this.props.height) {
            modalStyle.width = this.props.width + 'px';
            modalStyle.height = this.props.height + 'px';
            modalStyle.marginLeft = '-' + (this.props.width / 2) + 'px';
            modalStyle.marginTop = '-' + (this.props.height / 2) + 'px';
            modalStyle.transform = null;
        }

        if (this.props.style) {
            for (let key in this.props.style) {
                modalStyle[key] = this.props.style[key]
            }
        }

        let backdropStyle = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: '9998',
            background: 'rgba(0, 0, 0, 0.3)'
        };

        if (this.props.backdropStyle) {
            for (let key in this.props.backdropStyle) {
                backdropStyle[key] = this.props.backdropStyle[key]
            }
        }

        if (this.state.step === 1) {
            return (
                <div>
                    <div style={modalStyle}>
                        <div className="close-button-div">
                            <span className="fa-stack fa-lg close-button ">
                            </span>
                        </div>
                        <h1>{this.state.header}</h1>
                        <p>hello Beotch</p>
                        <p><button id = 'close-modal' onClick={this.close}>Close</button></p>
                    </div>
                    <div style={backdropStyle}
                         onClick={this.close}/>
                </div>
            )
        }
    }

    close() {
        // closeModal passed in as callback prop from App.js parent
        this.props.closeModal();
    }


}