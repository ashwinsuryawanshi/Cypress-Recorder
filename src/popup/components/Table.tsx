import * as React from 'react';

// export interface InfoButtonProps {
//     toggleInfoDisplay: () => void,
//     shouldInfoDisplay: boolean,
// }

export default () => {
    // const handleClick = (): void => {
    //     toggleInfoDisplay();
    // };
    return (
        <>
            {/*<button type="button" className="button" onClick={handleClick}>*/}
            {/*    {shouldInfoDisplay ? 'Recording Menu' : 'Info'}*/}
            {/*</button>*/}
            <table id="tests-recorder">
                <tr>
                    <th>Test Name</th>
                    <th></th>
                    <th></th>
                    <th>Last Run</th>
                </tr>
                <tr>
                    <td>Open Flighting Panel</td>
                    <td><button type={"button"} className="small-button">Edit</button></td>
                    <td><button type={"button"} className="small-button">Run</button></td>
                    <td>Success</td>
                </tr>
                <tr>
                    <td>Close Flighting Panel</td>
                    <td><button type={"button"} className="small-button">Edit</button></td>
                    <td><button type={"button"} className="small-button">Run</button></td>
                    <td>Fail</td>
                </tr>
                <tr>
                    <td>Edit Flighting table</td>
                    <td><button type={"button"} className="small-button">Edit</button></td>
                    <td><button type={"button"} className="small-button">Run</button></td>
                    <td>Success</td>
                </tr>
            </table>
        </>
    );
};
