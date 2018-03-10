import React, {Component} from 'react';
import './Options.css';
import RouteNavItem from "../../../components/RouteNavItem";

export default class Options extends Component {
    constructor(props) {
        super(props);
        this.href = "/"+this.props.option.toLowerCase();
    }
    render() {
        return (
            <td className='col-md-3'>
                <RouteNavItem href ={this.href}>{this.props.option}</RouteNavItem>
            </td>);
    }
}