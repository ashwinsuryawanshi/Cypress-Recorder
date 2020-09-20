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
                    <td class="td-center-align">
                        <i class="fa fa-pencil margin-right" aria-hidden="true"></i>
                        <i class="fa fa-play-circle margin-right" aria-hidden="true"></i>
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </td>
                </tr>
                <tr>
                    <td>Prisma</td>
                    <td>Campaign Buy</td>
                    <td>Create Package</td>
                    <td class="td-center-align">
                        <i class="fa fa-pencil margin-right" aria-hidden="true"></i>
                        <i class="fa fa-play-circle margin-right" aria-hidden="true"></i>
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </td>
                </tr>
                <tr>
                    <td>Prisma</td>
                    <td>Campaign Order</td>
                    <td>Create Order</td>
                    <td class="td-center-align">
                        <i class="fa fa-pencil margin-right" aria-hidden="true"></i>
                        <i class="fa fa-play-circle margin-right" aria-hidden="true"></i>
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </td>
                </tr>

            </table>
        </>
    );
};
