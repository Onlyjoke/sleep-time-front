import React from 'react';
import css from './InputTime.styl';

const InputTime = (props) => {
    return (
        <>
            {
                props.isChanging ?
                    <div>
                        <input
                            type='text'
                            className={css.input}
                            value={props.time}
                            onChange={(e) => props.handleTimeChange(e)}
                        />
                        <div
                            onClick={() => props.saveChangedTime()}
                            className={css.btnSave}
                        >
                            Save
                        </div>
                    </div>
                    :
                    <div
                        onDoubleClick={props.handleDblClickChange}
                    >
                        {props.time}
                    </div>
            }
        </>
    );
};

export default InputTime;
