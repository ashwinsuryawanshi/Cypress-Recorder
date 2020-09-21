import * as React from 'react';
import { ControlAction } from "../../constants";
import { Recording } from '../../types';

export interface TableProps {
    recordings: Recording[],
    toggleInfoDisplay: () => void,
    toggleEditDisplay: (test: any) => void,
    setAction: (action: ControlAction) => void
}

export default ({ toggleInfoDisplay, toggleEditDisplay, setAction, recordings }: TableProps) => {
    const handleRowClick = (id): void => {
        toggleInfoDisplay();
    };

    const handleEdit = (id): void => {
        setAction(ControlAction.EDIT);
        const test = recordings[id];
        toggleEditDisplay(test);
    };

    const getTableRow = (recording, index) => {
        return (<tr key={index} className="highlight-row">
            <td onClick={handleRowClick}>{recording.projectName}</td>
            <td onClick={handleRowClick}>{recording.testSuiteName}</td>
            <td onClick={handleRowClick}>{recording.testCaseName}</td>
            <td className="td-center-align">
                <i className="fa fa-pencil margin-right" onClick={() => handleEdit(recording.id)} aria-hidden="true"></i>
                <i className="fa fa-play-circle margin-right" aria-hidden="true"></i>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </td>
        </tr>)
    };

    return (
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
                {recordings.map(getTableRow)}
            </tbody>
        </table>
    );
};
