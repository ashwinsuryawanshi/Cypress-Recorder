import * as React from 'react';
import { Block } from '../../types';
import { ControlAction, RecState } from '../../constants';

import CodeDisplay from './CodeDisplay';
import LandingBox from './LandingBox';
import Table from './Table';

export interface BodyProps {
  isValidTab: boolean,
  recStatus: RecState,
  codeBlocks: Block[],
  destroyBlock: (index: number) => void,
  moveBlock: (dragIdx: number, dropIdx: number) => void,
  toggleInfoDisplay: () => void,
  }

export default ({
  recStatus,
  codeBlocks,
  isValidTab,
  destroyBlock,
  moveBlock,
  toggleInfoDisplay
}: BodyProps) => (
    <div id="body">
      {recStatus === RecState.OFF && <Table toggleInfoDisplay={toggleInfoDisplay} />}
      <div>
        {recStatus === RecState.OFF && <LandingBox isValidTab={isValidTab} />}
        {recStatus !== RecState.OFF && <CodeDisplay codeBlocks={codeBlocks} destroyBlock={destroyBlock} moveBlock={moveBlock} />}
      </div>
    </div>
  );
