import * as React from 'react';

	let manageSaveButton = (txt) => {
    	let bt = (document.getElementById('save') as HTMLInputElement);
        if(bt !== null) {
            if (txt && txt.value != '') {
                bt.disabled = false;
            }
            else {
                bt.disabled = true;
            }
        }
    };

export default ({testName, editable}) => (
    <div id="testName-wrap">
        <label>
            Test Name: <span/>
            {testName ? <input type="text" id="test-name" name="testName" placeholder={'Enter test name'} value={testName} contentEditable={editable}/> :
                <input type="text" id="test-name" name="testName" placeholder={'Enter test name'}/>
            }
        </label>
    </div>
);
