import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Textbox from '../../../views/textbox/textbox';
import { Link } from 'react-router-dom';
import './logoutbar.css';
import { logout } from '../../../state/account/accountActions';
import { connect } from 'react-redux';
import { getAccountInfo } from '../../../state/account/accountSelectors';
import { addFriendAction } from '../../../state/account/accountActions';

export class LogoutB extends Component {
    static propTypes = {
        loggedIn: PropTypes.bool.isRequired,
        createSuite: PropTypes.bool.isRequired,
        toggleCreateSuite: PropTypes.func.isRequired,
    }

    componentWillMount() {
        this.handleLogout = this.handleLogout.bind(this);
        this.handleToggleCreateSuite = this.handleToggleCreateSuite.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleAddFriend = this.handleAddFriend.bind(this);

        this.state = {
            showModal: false,
        };
    }

    handleAddFriend(event) {
        event.preventDefault();
        
        let usernameB = event.target.username.value;
        addFriendAction(this.props.account.username, usernameB)
            .then(response => {
                return response.json();
            }).then(json => {
                this.handleCloseModal();
            });
    }

    handleOpenModal() {
        this.setState({
            showModal: true,
        });
    }

    handleCloseModal() {
        this.setState({
            showModal: false,
        });
    }

    handleLogout() {
        this.props.logout();
    }

    handleToggleCreateSuite() {
        if (this.props.createSuite) {
            //Clicked on "Save Suite"
            this.props.toggleCreateSuite(false);
        } else {
            // Clicked on "Create Suite"
            this.props.toggleCreateSuite(true);
        }
    }

    render() {
        if (this.props.loggedIn) {
            return (
                <div className='logoutContainer'>
                    <div className="homeLink">
                        <div className='homeLinkText'>
                            <Link className='homeLinkText' to="/">IC</Link>                            
                        </div>
                    </div>
                    <div className="logoutText">
                        <div className='logLink' onClick={this.handleLogout}>Logout</div>
                    </div>
                    <div className="logoutText">
                        {!this.props.createSuite ? <div className="logLink" onClick={this.handleToggleCreateSuite}>Create Suite</div> : <div className="logLink" onClick={this.handleToggleCreateSuite}>Save Suite</div>}
                    </div>
                    <div className="logoutText">
                        <div className="logLink" onClick={this.handleOpenModal}>Add Friend</div>
                    </div>
                    <ReactModal isOpen={this.state.showModal} contentLabel="Add Friend Modal" className="addFriendModal">
                        <div className="loginModalContainer">
                            <h4 className="friendHeader">FOLLOW NEW PEOPLE</h4>
                            <form onSubmit={this.handleAddFriend}>
                                <div className="modalContent">
                                    <Textbox name="username" placeholder="Username" password={false} />
                                    <div className="modalDiv">
                                        <button className="modalButton" type="submit">ADD</button>
                                    </div>
                                    <div className="modalDiv">
                                        <button className="modalButton" onClick={this.handleCloseModal} type="button">CANCEL</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </ReactModal>
                </div>
            );
        }

        return (
            <div className='logoutContainer'>
                <div className="homeLink">
                    <div className='homeLinkText'>
                        <Link className='homeLinkText' to="/">IC</Link>                            
                    </div>
                </div>
                <div className="logoutText">
                    <Link className='logLink' to="/login">Login</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        account: getAccountInfo(state),        
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
