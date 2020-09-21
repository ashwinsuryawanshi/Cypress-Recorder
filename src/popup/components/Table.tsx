import * as React from 'react';
import { Recording } from '../../types';

export interface TableProps { toggleInfoDisplay: () => void, recordings: Recording[] }

export default ({ toggleInfoDisplay, recordings }: TableProps) => {
    const handleRowClick = (id): void => {
        toggleInfoDisplay();
    };

    const getTableRow = (recording, index) => {
        return (<tr key={index} className="highlight-row">
            <td onClick={handleRowClick}>{recording.projectName}</td>
            <td onClick={handleRowClick}>{recording.testSuiteName}</td>
            <td onClick={handleRowClick}>{recording.testCaseName}</td>
            <td className="td-center-align">
                <i className="fa fa-pencil margin-right" aria-hidden="true"></i>
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
