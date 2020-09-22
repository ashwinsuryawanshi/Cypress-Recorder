import * as React from 'react';
import InfoButton from './InfoButton';

export interface HeaderProps {
  toggleInfoDisplay: (test: any) => void,
  shouldInfoDisplay: boolean,
}

export default ({ shouldInfoDisplay, toggleInfoDisplay }: HeaderProps) => (
  <div id="header">
    <h1 id="title">Spree</h1>
    {/* <InfoButton shouldInfoDisplay={shouldInfoDisplay} toggleInfoDisplay={toggleInfoDisplay} /> */}
  </div>
);
