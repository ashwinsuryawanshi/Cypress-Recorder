import * as React from 'react';
import { ControlAction } from '../../constants';

export interface SaveButtonProps {
    handleToggle: (action: ControlAction) => void,
}

export default ({ handleToggle }: SaveButtonProps) => (
    <div id="save-wrap">
        <button
            type="button"
            id="save"
            className="button"
            onClick={() => handleToggle(ControlAction.SAVE)}
        >
            Save
    </button>
    </div>
);
