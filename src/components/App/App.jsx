import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Preloader from '../Preloader/Preloader';
import css from './App.styl';

const App = (props) => {
    const { times } = props;
    const sleepToday = [];

    function formatTime(time) {
        return time.toString().replace(/^(\d)$/, '0$1');
    }

    function isoDateToDate(date) {
        const convertedDate = new Date(date);
        const seconds = formatTime(convertedDate.getSeconds());
        const minutes = formatTime(convertedDate.getMinutes());
        const hours = formatTime(convertedDate.getHours());

        return `${(convertedDate.getMonth() + 1)}-${convertedDate.getDate()} ${hours}:${minutes}:${seconds}`;
    }

    function msToTime(ms) {
        const minutes = parseInt((ms / (1000 * 60 )) % 60);
        const hours = parseInt((ms / (1000 * 60 * 60)) % 24);

        return `(${hours} ч ${minutes} м)`;
    }

    function renderTimes() {
        return (
            <div>
                {
                    times.data.map((item, index) => {
                        const action = item.action === 'woke_up' && 'Проснулась' ||
                            item.action === 'goto_sleep' && 'Уснула' ||
                            item.action === 'to_poop' && 'Покакала';
                        let differ;
                        const timesToday = new Date(item.createdAt).getDate();
                        const today = new Date().getDate();

                        if (item.action === 'woke_up') {
                            const goToSleep = times.data[index].createdAt;
                            let wokeUp;

                            for (let i = index; i < times.data.length; i--) {
                                if (times.data[i].action === 'goto_sleep') {
                                    wokeUp = times.data[i].createdAt;
                                    break;
                                }
                            }
                            differ = new Date(goToSleep).getTime() - new Date(wokeUp).getTime();
                            today === timesToday && sleepToday.push(differ);
                        }

                        return (
                            today === timesToday &&
                            <div
                                key={index}
                                className={css.table__row}
                            >
                                <div className={css.table__cell}>
                                    {isoDateToDate(item.createdAt)}
                                </div>
                                <div className={css.table__cell}>
                                    {action}
                                    {
                                        item.action === 'woke_up' &&
                                        <div>
                                            {` Сон ${msToTime(differ)}`}
                                        </div>
                                    }
                                </div>
                                <div
                                    className={[css.table__cell, css.table__cell_btn_delete].join(' ')}
                                    onClick={() => props.delAction(item._id, index)}
                                >
                                    X
                                </div>
                            </div>
                        );
                    })
                }
                <div className={css.today}>
                    Спала сегодня {msToTime(sleepToday.length > 1 && sleepToday.reduce((prev, next) => prev + next))}
                </div>
            </div>
        );
    }

    return (
        <div
            className={classNames(css.root, {
                [css.root_type_day]: props.isDay,
                [css.root_type_night]: !props.isDay
            })}
        >
            <div className={css.saveTime}>
                <div className={css.saveTime__btns}>
                    <div
                        data-action='woke_up'
                        className={[css.saveTime__btn, css.saveTime__wokeup].join(' ')}
                        onClick={() => props.handleClick('woke_up')}
                    >
                        Проснулась
                    </div>
                    <div
                        data-action='goto_sleep'
                        className={[css.saveTime__btn, css.saveTime__gotosleep].join(' ')}
                        onClick={() => props.handleClick('goto_sleep')}
                    >
                        Уснула
                    </div>
                    <div
                        data-action='to_poop'
                        className={[css.saveTime__btn, css.saveTime__topoop].join(' ')}
                        onClick={() => props.handleClick('to_poop')}
                    >
                        Покакала
                    </div>
                    <div className={css.table}>
                        {renderTimes()}
                    </div>
                </div>
            </div>
        </div>
    );
};

App.propTypes = {
    times: PropTypes.object.isRequired
};

export default Preloader('times')(App);
