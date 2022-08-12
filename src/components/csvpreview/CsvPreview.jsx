import React from 'react'
import "./csvpreview.scss";
import { DataGrid } from '@mui/x-data-grid';

export default function CsvPreview({rows, columns}) {
  return (
    <div className='csvpreview'>
      <DataGrid
          rows={rows}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          className='dataGrid'
        />
    </div>
  )
}
