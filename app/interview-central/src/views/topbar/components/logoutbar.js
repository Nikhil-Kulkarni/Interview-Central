import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './logoutbar.css';
import { logout } from '../../../state/account/accountActions';
import { connect } from 'react-redux';

export class LogoutB extends Component {
    static propTypes = {
        loggedIn: PropTypes.bool.isRequired,
    }

    componentWillMount() {
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout();
    }

    render() {
        return (
            <div className='logoutContainer'>
                <div className="logoutText">
                    {this.props.loggedIn ? <div className='logLink' onClick={this.handleLogout}>Logout</div> : <Link className='logLink' to="/login">Login</Link>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {      
    };
};

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        logout: () => dispatch(logout()),
    };
};

const LogoutBar = connect(
    mapStateToProps, 
    mapDispatchToProps,    
) (LogoutB);

export default LogoutBar;
