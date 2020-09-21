import * as React from 'react';
import { Block, Recording } from '../../types';
import { RecState } from '../../constants';

import CodeDisplay from './CodeDisplay';
import LandingBox from './LandingBox';
import Table from './Table';

export interface BodyProps {
  isValidTab: boolean,
  recStatus: RecState,
  recordings: Recording[],
  codeBlocks: Block[],
  destroyBlock: (index: number) => void,
  moveBlock: (dragIdx: number, dropIdx: number) => void,
  toggleInfoDisplay: () => void,
  }

export default ({
  recStatus,
  recordings,
  codeBlocks,
  isValidTab,
  destroyBlock,
  moveBlock,
  toggleInfoDisplay
}: BodyProps) => (
    <div id="body">
      {recStatus === RecState.OFF && <Table recordings={recordings} toggleInfoDisplay={toggleInfoDisplay} />}
      <div>
        {recStatus === RecState.OFF && <LandingBox isValidTab={isValidTab} />}
        {recStatus !== RecState.OFF && <CodeDisplay codeBlocks={codeBlocks} destroyBlock={destroyBlock} moveBlock={moveBlock} />}
      </div>
    </div>
  );
