import React from 'react';
import { connect } from 'react-redux';
import { updateTime } from '../../actions/getAllData';
import InputTime from '../../components/InputTime/InputTime';

class InputTimeContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: this.props.time,
            isChanging: false
        };
    }

    handleClickChange = () => {
        this.setState({
            isChanging: true
        })
    };

    saveChangedTime = () => {
        const { time } = this.state;
        const createdAt = new Date(`2019 ${time}`).toISOString();
        const { itemId } = this.props;

        this.props.updateTime(itemId, createdAt);

        this.setState({
            isChanging: false
        })
    };

    handleTimeChange = (e) => {
        const { value } = e.target;

        this.setState({
            time: value
        })
    };

    render() {
        const {
            time,
            isChanging
        } = this.state;

        return (
            <InputTime
                time={time}
                isChanging={isChanging}
                handleClickChange={this.handleClickChange}
                saveChangedTime={this.saveChangedTime}
                handleTimeChange={this.handleTimeChange}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTime: (id, createdAt) => {
            dispatch(updateTime(id, createdAt));
        }
    };
};

export default connect(null, mapDispatchToProps)(InputTimeContainer);
