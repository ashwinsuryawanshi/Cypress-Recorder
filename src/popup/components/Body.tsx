import * as React from 'react';
import { Block } from '../../types';
import { ControlAction, RecState } from '../../constants';

import CodeDisplay from './CodeDisplay';
import LandingBox from './LandingBox';
import Table from './Table';
import TestName from "./TestName";

export interface BodyProps {
  isValidTab: boolean,
  recStatus: RecState,
  action: ControlAction,
  setAction: (action: ControlAction) => void,
  tableRows: any,
  codeBlocks: Block[],
  destroyBlock: (index: number) => void,
  moveBlock: (dragIdx: number, dropIdx: number) => void,
  toggleInfoDisplay: () => void,
  toggleEditDisplay: (test: any) => void
}

export default ({
  recStatus,
  action,
  setAction,
  tableRows,
  codeBlocks,
  isValidTab,
  destroyBlock,
  moveBlock,
  toggleInfoDisplay,
  toggleEditDisplay
}: BodyProps) => (
    <div id="body">
      {recStatus === RecState.OFF && <Table toggleInfoDisplay={toggleInfoDisplay} toggleEditDisplay={toggleEditDisplay} setAction={setAction} tableRows={tableRows}/>}
      {recStatus !== RecState.OFF && <TestName testName={null} editable={true}/>}
      <div>
        {recStatus === RecState.OFF && <LandingBox isValidTab={isValidTab} />}
        {recStatus !== RecState.OFF && <CodeDisplay codeBlocks={codeBlocks} destroyBlock={destroyBlock} moveBlock={moveBlock} />}
      </div>
    </div>
  );
