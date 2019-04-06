import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    getAllData,
    setAction,
    delAction
} from '../../actions/getAllData';
import App from '../../components/App/App';


class AppContainer extends React.Component {
    static propTypes = {
        getAllData: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const { time } = this.props;
        const isDay = (Object.keys(time).length !== 0 && time.data[time.data.length - 1].action === 'woke_up') || false;

        this.state = {
            isDay
        };
    }

    componentDidMount() {
        this.props.getAllData();
    }

    handleClick = (action) => {
        if (action === 'woke_up') {
            this.setState({
                isDay: true
            });
        }

        if (action === 'goto_sleep') {
            this.setState({
                isDay: false
            });
        }

        this.props.setAction(action);
    };

    delAction = (id, index) => {
        this.props.delAction(id, index);
    };

    render() {
        const { time } = this.props;
        const { isDay } = this.state;

        return (
            <App
                time={time}
                isDay={isDay}
                handleClick={this.handleClick}
                delAction={this.delAction}
            />
        );
    }
}

const mapStateToProps = ({ time }) => {
    return {
        time
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllData: () => {
            dispatch(getAllData());
        },
        setAction: (action) => {
            dispatch(setAction(action));
        },
        delAction: (id, index) => {
            dispatch(delAction(id, index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
