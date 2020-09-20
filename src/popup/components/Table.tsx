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
                    <th>Project</th>
                    <th>Module</th>
                    <th>Case</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td>Prisma</td>
                    <td>Campaign Buy</td>
                    <td>Create Placement</td>
                    <td className="td-center-align">
                        <i className="fa fa-pencil margin-right" aria-hidden="true"></i>
                        <i className="fa fa-play-circle margin-right" aria-hidden="true"></i>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </td>
                </tr>
                <tr>
                    <td>Prisma</td>
                    <td>Campaign Buy</td>
                    <td>Create Package</td>
                    <td className="td-center-align">
                        <i className="fa fa-pencil margin-right" aria-hidden="true"></i>
                        <i className="fa fa-play-circle margin-right" aria-hidden="true"></i>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </td>
                </tr>
                <tr>
                    <td>Prisma</td>
                    <td>Campaign Order</td>
                    <td>Create Order</td>
                    <td className="td-center-align">
                        <i className="fa fa-pencil margin-right" aria-hidden="true"></i>
                        <i className="fa fa-play-circle margin-right" aria-hidden="true"></i>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </td>
                </tr>

            </table>
        </>
    );
};
