import * as React from 'react';
import {ControlAction} from "../../constants";

export interface TableProps {
    toggleInfoDisplay: () => void,
    toggleEditDisplay: (test: any) => void,
    setAction: (action: ControlAction) => void,
    tableRows: any
}

export default ({ toggleInfoDisplay, toggleEditDisplay, setAction, tableRows }: TableProps) => {
    const handleRowClick = (id): void => {
        toggleInfoDisplay();
    };

    const handleEdit = (id): void => {
        setAction(ControlAction.EDIT);
        const test = tableRows[id];
        toggleEditDisplay(test);
    };

    const trs = tableRows.map(function (row: any) {
        return (<tr className="highlight-row">
            <td onClick={handleRowClick}>{row.project}</td>
            <td onClick={handleRowClick}>{row.module}</td>
            <td onClick={handleRowClick}>{row.case}</td>
            <td className="td-center-align">
                <i className="fa fa-pencil margin-right" onClick={() => handleEdit(row.id)} aria-hidden="true"></i>
                <i className="fa fa-play-circle margin-right" aria-hidden="true"></i>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </td>
        </tr>)
    });

    return (
        <>
            {/*<button type="button" className="button" onClick={handleClick}>*/}
            {/*    {shouldInfoDisplay ? 'Recording Menu' : 'Info'}*/}
            {/*</button>*/}
            <table id="tests-recorder">
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Module</th>
                        <th>Case</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {trs}
                </tbody>
            </table>
        </>
    );
};
