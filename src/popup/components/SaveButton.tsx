import * as React from 'react';

export interface SaveButtonProps {
    handleSave: () => void,
}

export default ({ handleSave }: SaveButtonProps) => (
    <div id="save-wrap">
        <button
            type="button"
            id="save"
            className="button"
            onClick={() => handleSave()}
        >
            Save
    </button>
    </div>
);
