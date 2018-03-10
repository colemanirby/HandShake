import React, {Component} from 'react'

export default class TransactionsModal extends Component {

    constructor(props) {
        super(props);
        this.state= {
            step: 1,
            headers: ["A second great header"],
            header: "Wow, what an amazing header"
        };

        this.close= this.close.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    componentWillMount() {
        this.modalStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999',
            background: '#fff'
        };
        this.backdropStyle = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: '9998',
            background: 'rgba(0, 0, 0, 0.3)'
        };
    }

    nextStep() {
        const state = this.state;
        this.setState({
            header: state.headers[state.step-1],
            step : state.step+1 });
    }

    render() {

        if (this.props.width && this.props.height) {
            this.modalStyle.width = this.props.width + 'px';
            this.modalStyle.height = this.props.height + 'px';
            this.modalStyle.marginLeft = '-' + (this.props.width / 2) + 'px';
            this.modalStyle.marginTop = '-' + (this.props.height / 2) + 'px';
            this.modalStyle.transform = null;
        }

        if (this.props.style) {
            this.props.style.forEach(key => {
                this.modalStyle[key] = this.props.style[key];
            });
        }

        if (this.props.backdropStyle) {
            this.props.backdropStyle.forEach(key => {
                this.backdropStyle[key] = this.props.backdropStyle[key];
            });
        }

        if (this.state.step === 1) {
            return (
                <div>
                    <div style={this.modalStyle}>
                        <div className="close-button-div">
                            <span className="fa-stack fa-lg close-button ">
                            </span>
                        </div>
                        <h1>{this.state.header}</h1>
                        <p>hello Beotch 1</p>
                        <p><button id = 'ok' onClick={this.nextStep}>Ok</button></p>
                        <p><button id = 'close-modal' onClick={this.close}>Close</button></p>
                    </div>
                    <div style={this.backdropStyle}
                         onClick={this.close}/>
                </div>
            )
        }

        else if(this.state.step === 2)
        {

            return (
                <div>
                    <div style={this.modalStyle}>
                        <div className="close-button-div">
                            <span className="fa-stack fa-lg close-button ">
                            </span>
                        </div>
                        <h1>{this.state.header}</h1>
                        <p>hello Beotch 2</p>
                        <p><button id = 'ok' onClick={this.close}>Ok</button></p>
                        <p><button id = 'close-modal' onClick={this.close}>Close</button></p>
                    </div>
                    <div style={this.backdropStyle}
                         onClick={this.close}/>
                </div>
            )
        }
    }

    close() {

        // closeModal passed in as callback in props from App.js parent
        this.props.closeModal();
    }


}