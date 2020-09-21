import * as React from 'react';
import { ControlAction, RecState } from '../../constants';

export interface ToggleButtonProps {
  isValidTab: boolean,
  shouldInfoDisplay: boolean,
  shouldEditDisplay: boolean,
  recStatus: RecState,
  handleToggle: (action: ControlAction) => void,
}

export default ({ recStatus, handleToggle, isValidTab, shouldInfoDisplay, shouldEditDisplay }: ToggleButtonProps) => {
  const handleClick = (): void => {
    let action: ControlAction;
    if ((recStatus === RecState.OFF || recStatus === RecState.PAUSED) && !shouldInfoDisplay && !shouldEditDisplay) action = ControlAction.START;
    else if (recStatus === RecState.OFF && (shouldInfoDisplay || shouldEditDisplay)) action = ControlAction.RESET;
    else if (recStatus === RecState.ON) action = ControlAction.STOP;
    handleToggle(action);
  };

  const buttonClass: string = (!isValidTab && (recStatus === RecState.OFF || recStatus === RecState.PAUSED))
    ? 'disabled-button'
    : 'button';

  return (
    <div id="toggle-wrap">
      <button
        type="button"
        id="toggle"
        className={buttonClass}
        onClick={handleClick}
        disabled={!isValidTab && (recStatus === RecState.OFF || recStatus === RecState.PAUSED)}
      >
        {(recStatus === RecState.OFF || recStatus === RecState.PAUSED) && !isValidTab && 'Invalid Tab'}
        {recStatus === RecState.OFF && isValidTab && !shouldInfoDisplay && !shouldEditDisplay && 'Start Recording'}
        {recStatus === RecState.OFF && isValidTab && shouldInfoDisplay && 'Back'}
        {recStatus === RecState.OFF && isValidTab && shouldEditDisplay && 'Cancel'}
        {recStatus === RecState.PAUSED && isValidTab && 'Resume'}
        {recStatus === RecState.ON && 'Stop Recording'}
      </button>
    </div>
  );
};
