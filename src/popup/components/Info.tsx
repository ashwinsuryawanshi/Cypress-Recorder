import * as React from 'react';
import { codeSnippet } from './../../constants';
export default () => {
  // const handleClick = (): void => {
  //   window.open('https://github.com/KabaLabs/Cypress-Recorder');
  // };

  return (
    <div id="infobox">
      <pre>
        <code>
          {codeSnippet}
        </code>
      </pre>

    </div>
  );
};
