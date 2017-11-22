import React, { Component } from 'react';
import { connect } from 'react-redux';
import Suite from './Suite';

export class SuiteCont extends Component {

    componentWillMount() {

    }

    render() {
        return (
            <div>
                <Suite />
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {

    };
};

const mapDispatchToProps = function(dispatch) {
    return {

    };
};

const SuiteContainer = connect(
    mapStateToProps, 
    mapDispatchToProps,    
) (SuiteCont);

export default SuiteContainer;