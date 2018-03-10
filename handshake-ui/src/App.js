import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem} from "react-bootstrap";
import { Auth } from "aws-amplify";
import logo from './HandShake.svg';
import Routes from "./Routes"
import RouteNavItem from "./components/RouteNavItem";
import TransactionsModal from "./containers/modals/transactions/TransactionsModal"
import "./App.css";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
            authNavBarOptions: ['Make Transaction', 'Share', 'About/FAQ', 'Search', 'Account'],
            unAuthNavBarOptions: ['Signup', 'Login'],
            navBarElements: [],
            isModalOpen: false
        };
        // After ES6, non-React methods no longer auto-bind this
        // removing this line will cause setModealOpenFalse to not have 'this' reference
        // having callback function executed by modal component
        this.closeModal = this.closeModal.bind(this);
    }
    userHasAuthenticated = authenticated => {
        this.setState({
            isAuthenticated: authenticated,
            navBarElements: this.buildLoggedInNavBar()
        });
    };

    handleLogout = async () => {
        await Auth.signOut();
        this.userHasAuthenticated(false);
        this.setState({navBarElements: this.buildLoggedOutNavBar()});
        this.props.history.push("/login");
    };

    buildLoggedInNavBar() {
        let navOptionsArray = [];
        let key = 1;
        this.state.authNavBarOptions.forEach( navOption => {
            const href = "/"+navOption.toLowerCase().replace(" ", "");

            // build navBar Button Shit up in there to open a sweet fucking modal boi
            if(href === '/maketransaction') {
                navOptionsArray.push(
                    <NavItem key = {key} onClick={() => this.openModal()}>{navOption}</NavItem>
                );
            }
            else{
                navOptionsArray.push(
                    <RouteNavItem key = {key} href= {href}>{navOption}</RouteNavItem>
                );
            }
            key = key + 1;
        });
        navOptionsArray.push(<NavItem key={key} onClick={this.handleLogout}>Logout</NavItem>);
        return navOptionsArray;
    }
    openModal() {
        this.setState({ isModalOpen: true })
    }

    closeModal() {
        this.setState({ isModalOpen: false })
    }


    buildLoggedOutNavBar() {
        let navOptionsArray = [];
        let key = 1;
        this.state.unAuthNavBarOptions.forEach( navOption => {
            const href = "/"+navOption.toLowerCase().replace(" ", "");
            navOptionsArray.push(
                <RouteNavItem key = {key} href= {href}>{navOption}</RouteNavItem>
            );
            key = key + 1;
        });
        return navOptionsArray;
    }

    async componentDidMount() {
        try {
            if (await Auth.currentSession()) {
                this.userHasAuthenticated(true);
                this.setState({navBarElements: this.buildLoggedInNavBar()});
            }
        }
        catch(e) {
            if(e !== 'No current user'){
                // alert(JSON.stringify(e));
                console.error(e);
            }
            else{
                this.setState({
                    isAuthenticated: false,
                    navBarElements: this.buildLoggedOutNavBar()
                })
            }
        }
        this.setState({isAuthenticating: false});

    }

    render() {
       const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated,
        };
        return (
            !this.state.isAuthenticating&&
            <div className="App container">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">HandShake Application</h1>
                </header>
                {this.state.isModalOpen&& <TransactionsModal closeModal={this.closeModal} />}
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/dashboard">HandShake</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            {this.state.navBarElements}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes childProps={childProps} />
            </div>
        );
    }



}

export default withRouter(App);