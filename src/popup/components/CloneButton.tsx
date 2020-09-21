import * as React from 'react';
import { ControlAction } from '../../constants';

export interface CloneButtonProps {
    handleToggle: (action: ControlAction) => void,
}

export default ({ handleToggle }: CloneButtonProps) => (
    <div id="clone-wrap">
        <button
            type="button"
            id="clone"
            className="button"
            onClick={() => handleToggle(ControlAction.CLONE)}
        >
            Clone
    </button>
    </div>
);
