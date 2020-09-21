import * as React from 'react';
import { codeSnippet } from './../../constants';
import TestName from "./TestName";
export default () => {
  // const handleClick = (): void => {
  //   window.open('https://github.com/KabaLabs/Cypress-Recorder');
  // };

  return (
      <div id="infobox">
          <TestName testName={'sample code'} editable={false}/>
          <pre>
        <code>
          {codeSnippet}
        </code>
      </pre>

      </div>
  );
};
