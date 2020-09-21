import * as React from 'react';
import {codeSnippet, ControlAction} from './../../constants';
import TestName from "./TestName";

export interface EditTestProps {
    test: any
}

export default ({test}: EditTestProps) => (
    <div id="infobox">
        <TestName testName={test.case} editable={false}/>
        <pre>
        <code>
          {codeSnippet}
        </code>
      </pre>
    </div>
);
