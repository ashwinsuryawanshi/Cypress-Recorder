import * as React from 'react';
import { ControlAction } from "../../constants";
import { Recording } from '../../types';

export interface TableProps {
    recordings: Recording[],
    toggleInfoDisplay: (test: any) => void,
    handleDelete: (id: any) => void,
    toggleEditDisplay: (test: any) => void,
    setAction: (action: ControlAction) => void
}

export default ({ toggleInfoDisplay, toggleEditDisplay, handleDelete, setAction, recordings }: TableProps) => {
    const handleRowClick = (id): void => {
        const test = recordings.find(function (record) {
            return record.id === id;
          });
        toggleInfoDisplay(test);
    };

    const handleEdit = (id): void => {
        setAction(ControlAction.EDIT);
        const test = recordings.find(function (record) {
            return record.id === id;
          });
        toggleEditDisplay(test);
    };

    const getTableRow = (recording, index) => {
        return (<tr key={index} className="highlight-row">
            <td onClick={() => handleRowClick(recording.id)}>{recording.projectName}</td>
            <td onClick={() => handleRowClick(recording.id)}>{recording.testSuiteName}</td>
            <td onClick={() => handleRowClick(recording.id)}>{recording.testCaseName}</td>
            <td className="td-center-align">
                <i className="fa fa-pencil margin-right" onClick={() => handleEdit(recording.id)} aria-hidden="true"></i>
                <i className="fa fa-play-circle margin-right" aria-hidden="true"></i>
                <i className="fa fa-trash" aria-hidden="true" onClick={() => handleDelete(recording.id)}></i>
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
