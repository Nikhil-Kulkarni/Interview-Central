import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './tile.css';
import { recommendToFollowers } from '../../state/home/homeActions';
import { getAccountInfo } from '../../state/account/accountSelectors';
import {
    ShareButtons,
    generateShareIcon,
  } from 'react-share';

const {
    FacebookShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');

export class T extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        tileLink: PropTypes.string,
        linkId: PropTypes.string,
        createSuite: PropTypes.bool,
        checkChangeFunc: PropTypes.func,
        suiteIds: PropTypes.array,
        question: PropTypes.object.isRequired,
    }

    componentWillMount() {
        this.state = {
            checked: this.props.isChecked,
            alreadyRecommended: false,
        };

        this.onCheckChange = this.onCheckChange.bind(this);
        this.onRecommendClick = this.onRecommendClick.bind(this);
    }

    onCheckChange() {
        this.setState({
            checked: !this.state.checked,
        });
        this.props.checkChangeFunc(this.props.name);
    }

    onRecommendClick() {
        recommendToFollowers(this.props.account.username, this.props.question.id)
            .then(response => {
                return response.json();
            }).then(json => {
                this.setState({
                    alreadyRecommended: true,
                })
            });
    }

    render() {
        const {
            name,
            description,
        } = this.props;
        const suiteIds = this.props.suiteIds;
        var isChecked = false;

        if (typeof suiteIds !== 'undefined' && suiteIds.indexOf(this.props.name) !== -1) {
            isChecked = true;
        } else {
            isChecked = false;
        }
        return (
            <div className={this.props.type === "BIG" ? 'big' : 'small'}>
                <h5 className='boxText'>{name}</h5>
                {this.props.createSuite ? <input className='suiteCheck' type='checkbox' checked={isChecked} onChange={this.onCheckChange}/> : null}
                <h6 className='boxText'>{description}</h6>
                <div className='shareLink'>
                    <FacebookShareButton
                        url={this.props.tileLink ? this.props.tileLink : `http://localhost:8080/suite/${this.props.linkId}`}
                        quote={this.props.tileLink ? "I like this question from Interview-Central" : "Check out my suite on Interview-Central!"}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </div>
                {this.state.alreadyRecommended || !this.props.tileLink ? <div  /> :
                    <div className="recommendLink" onClick={this.onRecommendClick}>Recommend</div>}
                <div className='link'>
                    {this.props.linkId ? <Link className='hyperlink' to={this.props.linkId}>More Info</Link> : <div />}
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
    };
};

const Tile = connect(
    mapStateToProps,
    mapDispatchToProps,
) (T);

export default Tile;
