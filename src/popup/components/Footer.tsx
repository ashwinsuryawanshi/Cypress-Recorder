import * as React from 'react';
import ToggleButton from './ToggleButton';
import ResetButton from './ResetButton';
import SaveButton from './SaveButton';
import CloneButton from './CloneButton';
import RunAllButton from './RunAllButton';
import ClipboardButton from './ClipboardButton';
import {ControlAction, RecState} from '../../constants';

export interface FooterProps {
  isValidTab: boolean,
  shouldInfoDisplay: boolean,
  shouldEditDisplay: boolean,
  recStatus: RecState,
  action: ControlAction,
  handleToggle: (action: ControlAction) => void,
  copyToClipboard: () => Promise<void>,
}

export default ({
  isValidTab,
  shouldInfoDisplay,
  shouldEditDisplay,
  recStatus,
  action,
  handleToggle,
  copyToClipboard,
}: FooterProps) => (
    <div id="footer">
      <ToggleButton recStatus={recStatus} handleToggle={handleToggle} isValidTab={isValidTab} shouldInfoDisplay={shouldInfoDisplay} shouldEditDisplay={shouldEditDisplay} />
      {(recStatus === RecState.PAUSED || (shouldEditDisplay && action === ControlAction.EDIT)) && <SaveButton handleToggle={handleToggle} />}
      {action === ControlAction.EDIT && shouldEditDisplay && <CloneButton handleToggle={handleToggle}/>}
      {recStatus === RecState.PAUSED && <ResetButton handleToggle={handleToggle} />}
      {recStatus !== RecState.PAUSED && !shouldInfoDisplay && !shouldEditDisplay && <RunAllButton copyToClipboard={copyToClipboard}  />}
      {recStatus === RecState.PAUSED && <ClipboardButton copyToClipboard={copyToClipboard} />}
    </div>
  );
