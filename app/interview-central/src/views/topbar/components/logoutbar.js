import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import Textbox from '../../../views/textbox/textbox';
import { Link } from 'react-router-dom';
import './logoutbar.css';
import { logout } from '../../../state/account/accountActions';
import { connect } from 'react-redux';

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

        this.state = {
            showModal: false,
        };
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
                            <h4 className="friendHeader">ADD FRIEND</h4>
                            <div className="modalContent">
                                <Textbox name="Friend's name" placeholder="Friend's username" password={false} />
                                <div className="modalDiv">
                                    <button className="modalButton">ADD</button>
                                </div>
                                <div className="modalDiv">
                                    <button className="modalButton" onClick={this.handleCloseModal}>CANCEL</button>
                                </div>
                            </div>
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
