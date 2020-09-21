import * as React from 'react';
import { Block, Recording } from '../../types';
import { RecState, ControlAction } from '../../constants';

import CodeDisplay from './CodeDisplay';
import LandingBox from './LandingBox';
import Table from './Table';
import TestName from "./TestName";

export interface BodyProps {
  isValidTab: boolean,
  recStatus: RecState,
  recordings: Recording[],
  action: ControlAction,
  setAction: (action: ControlAction) => void,
  codeBlocks: Block[],
  destroyBlock: (index: number) => void,
  moveBlock: (dragIdx: number, dropIdx: number) => void,
  toggleInfoDisplay: () => void,
  handleDelete: (id: any) => void,
  toggleEditDisplay: (test: any) => void
}

export default ({
  recStatus,
  recordings,
  setAction,
  codeBlocks,
  isValidTab,
  destroyBlock,
  moveBlock,
  toggleInfoDisplay,
  toggleEditDisplay,
  handleDelete
}: BodyProps) => (
    <div id="body">
      {recStatus === RecState.OFF && <Table toggleInfoDisplay={toggleInfoDisplay} toggleEditDisplay={toggleEditDisplay} handleDelete={handleDelete} setAction={setAction} recordings={recordings}/>}
      {recStatus !== RecState.OFF && <TestName testName={null} editable={true}/>}
      <div>
        {recStatus === RecState.OFF && <LandingBox isValidTab={isValidTab} />}
        {recStatus !== RecState.OFF && <CodeDisplay codeBlocks={codeBlocks} destroyBlock={destroyBlock} moveBlock={moveBlock} />}
      </div>
    </div>
  );
