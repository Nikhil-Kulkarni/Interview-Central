import React, { Component } from 'react';
import { connect } from 'react-redux';
import Suite from './Suite';
import { getSuite } from './state/suites/suitesActions';

export class SuiteCont extends Component {

    componentWillMount() {
        this.state = {
            suite: {},
        }
    }

    componentDidMount() {
        this.setSuite();        
    }

    setSuite() {
        getSuite(this.props.match.params.suiteId)
            .then(response => {
                return response.json();
            }).then(json => {
                this.setState({suite: json});
            });
    }

    render() {

        return (
            <div>
                <Suite suite={this.state.suite}/>
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
    };
};

const SuiteContainer = connect(
    mapStateToProps, 
    mapDispatchToProps,    
) (SuiteCont);

export default SuiteContainer;