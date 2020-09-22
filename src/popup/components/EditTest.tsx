import * as React from 'react';
import TestName from "./TestName";
import CodeDisplay from "./CodeDisplay";
import {Block} from "../../types";

export interface EditTestProps {
    test: any
    codeBlocks: Block[],
    destroyBlock: (index: number) => void,
    moveBlock: (dragIdx: number, dropIdx: number) => void,
}

export default ({test, codeBlocks, destroyBlock, moveBlock}: EditTestProps) => (
    <div id="infobox">
        <TestName testName={test.testCaseName} editable={false}/>
        <pre>
        {/*<code>*/}
        {/*  {test.testScript}*/}
        {/*</code>*/}
            {<CodeDisplay codeBlocks={codeBlocks} destroyBlock={destroyBlock} moveBlock={moveBlock} />}
      </pre>
    </div>
);
