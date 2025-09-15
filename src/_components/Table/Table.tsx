import React, { useEffect, useMemo, useRef, useState } from "react";
import { tableCss } from "./Table.styles";
import { flexRender, type Table } from "@tanstack/react-table";
import { Interpolation, Theme } from "@emotion/react";

const DEFAULT_COLUMN_WIDTH = 100;

interface AppTableProps<RowData> {
  table: Table<RowData>;
  cssStyle?: Interpolation<Theme>;
  showFooter?: boolean;
}

const AppTable = ({ table, cssStyle = "", showFooter }: AppTableProps<any>) => {
  return (
    <div css={[tableCss.container, cssStyle]}>
      <div css={[tableCss.wrapper]} className="custom-scrollbar-not-hide">
        <table css={tableCss.table}>
          <thead css={tableCss.header}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const width = header.getSize()
                    ? header.getSize()
                    : DEFAULT_COLUMN_WIDTH;

                  return (
                    <th
                      key={header.id}
                      style={{ width: `${width}px` }}
                      css={tableCss.headerCell}
                    >
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                css={index !== table.getRowCount() - 1 && tableCss.row}
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td key={cell.id} css={tableCss.cell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {showFooter && (
            <tfoot css={tableCss.footer}>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => {
                    const width = header.getSize()
                      ? header.getSize()
                      : DEFAULT_COLUMN_WIDTH;

                    return (
                      <th
                        key={header.id}
                        style={{ width: `${width}px` }}
                        css={tableCss.cell}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default AppTable;
