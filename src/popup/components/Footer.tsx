import * as React from 'react';
import ToggleButton from './ToggleButton';
import ResetButton from './ResetButton';
import SaveButton from './SaveButton';
import RunAllButton from './RunAllButton';
import ClipboardButton from './ClipboardButton';
import { ControlAction, RecState } from '../../constants';

export interface FooterProps {
  isValidTab: boolean,
  shouldInfoDisplay: boolean
  recStatus: RecState,
  handleToggle: (action: ControlAction) => void,
  copyToClipboard: () => Promise<void>,
}

export default ({
  isValidTab,
  shouldInfoDisplay,
  recStatus,
  handleToggle,
  copyToClipboard,
}: FooterProps) => (
    <div id="footer">
      <ToggleButton recStatus={recStatus} handleToggle={handleToggle} isValidTab={isValidTab} shouldInfoDisplay={shouldInfoDisplay} />
      {recStatus === RecState.PAUSED && <SaveButton handleToggle={handleToggle} />}
      {recStatus === RecState.PAUSED && <ResetButton handleToggle={handleToggle} />}
      {recStatus !== RecState.PAUSED && !shouldInfoDisplay && <RunAllButton copyToClipboard={copyToClipboard}  />}
      {recStatus === RecState.PAUSED && <ClipboardButton copyToClipboard={copyToClipboard} />}
    </div>
  );
