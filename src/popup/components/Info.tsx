import * as React from 'react';
import TestName from "./TestName";
export default ({testInfo}) => {
  return (
      <div id="infobox">
          <TestName testName={testInfo.testCaseName} editable={false}/>
          <pre>
        <code>
          {testInfo.testScript}
        </code>
      </pre>

      </div>
  );
};
