import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class CountdownProgress extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    startTimer() {
        this.timer = setTimeout(() => this.progress(5), 1000);
    }

    progress(completed) {
        if (completed > 100) {
            this.props.completeCallback();
        } else {
            this.props.incrementCallback(completed);
            const diff = 5;
            this.timer = setTimeout(() => this.progress(completed + diff), 1000);
        }
    }

    render() {
        if (this.props.timerState === 0) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.startTimer();
        }

        return (
            <div>
                <CircularProgress
                    mode="determinate"
                    value={this.props.timerState}
                    size={80}
                    thickness={8}
                />
            </div>
        );
    }
}