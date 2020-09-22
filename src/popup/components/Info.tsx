import * as React from 'react';
import TestName from "./TestName";
export default ({testInfo}) => {
  // const handleClick = (): void => {
  //   window.open('https://github.com/KabaLabs/Cypress-Recorder');
  // };

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
