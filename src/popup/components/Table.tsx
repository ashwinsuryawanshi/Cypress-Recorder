import * as React from 'react';

export interface TableProps {
    toggleInfoDisplay: () => void,
    //   shouldInfoDisplay: boolean,
}

export default ({ toggleInfoDisplay }: TableProps) => {
    const handleRowClick = (id): void => {
        toggleInfoDisplay(id);
    };
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
                    <tr className="highlight-row">
                        <td onClick={handleRowClick}>Prisma</td>
                        <td onClick={handleRowClick}>Campaign Buy</td>
                        <td onClick={handleRowClick}>Create Placement</td>
                        <td className="td-center-align">
                            <i className="fa fa-pencil margin-right" aria-hidden="true"></i>
                            <i className="fa fa-play-circle margin-right" aria-hidden="true"></i>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </td>
                    </tr>
                    <tr className="highlight-row">
                        <td onClick={handleRowClick}>Prisma</td>
                        <td onClick={handleRowClick}>Campaign Buy</td>
                        <td onClick={handleRowClick}>Create Package</td>
                        <td className="td-center-align">
                            <i className="fa fa-pencil margin-right" aria-hidden="true"></i>
                            <i className="fa fa-play-circle margin-right" aria-hidden="true"></i>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </td>
                    </tr>
                    <tr className="highlight-row">
                        <td onClick={handleRowClick}>Prisma</td>
                        <td onClick={handleRowClick}>Campaign Order</td>
                        <td onClick={handleRowClick}>Create Order</td>
                        <td className="td-center-align">
                            <i className="fa fa-pencil margin-right" aria-hidden="true"></i>
                            <i className="fa fa-play-circle margin-right" aria-hidden="true"></i>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};
