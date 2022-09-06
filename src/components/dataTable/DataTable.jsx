import React, {useEffect, useState} from 'react'
import "./dataTable.scss";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Notification from '../notification/Notification';
import ConfirmDialog from '../confirmdialog/ConfirmDialog';
import { useAuth } from '../../contexts/AuthContext';

const columns = [
  { field: 'id', headerName: 'Project name', width: 130 },
  // { field: 'root', headerName: 'Root', width: 130 },
];


export default function DataTable({rows}) {
  const {currentUser, deleteDocInCollection} = useAuth();
  const [notify, setNotify] = useState({isOpen: false, message: "", type: "success"});
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle: "", });
  const [projects, setProjects] = useState(rows);

  async function deleteProject(projectId){
      setConfirmDialog({...confirmDialog, isOpen: false});
      try{
        await(deleteDocInCollection(currentUser.uid, projectId));
      }catch{
        setNotify({
          isOpen: true,
          message: "There was an error deleting your project",
          type: "error"
        });
        return;
      }
      let newRows = rows.filter(x => x.id !== projectId);
      setProjects(newRows);
      setNotify({
        isOpen: true,
        message: `Successfully deleted project ${projectId}`,
        type: "success"
      });
  }

  // actions column with fields such as view, delete, get root TODO: get root
  const actionColumn = [{field: "action", headerName: "Action", width: 200, renderCell:(cellValues)=>{
      return (
          <div className="cellAction">

              {/* View */}
              <Link to={`/projects/${cellValues.id}`} style={{textDecoration:"none"}}><div className="viewButton">View</div></Link>

              {/* Delete */}
              <div className="deleteButton"
               onClick={()=>{
                 setConfirmDialog({
                   isOpen: true,
                   title: `Are you sure you want to delete ${cellValues.id}?`,
                   subTitle: "You can't undo this operation",
                   onConfirm: () => {deleteProject(cellValues.id)}
                })}}>
                Delete
              </div>

              {/* Get Root */}
          </div>
      )
  }}]
  return (
    <div className='dataTable'>
      <div className="dataTableTitle">
        My Projects
        <Link to="/projects/new" style={{textDecoration: "none"}} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        rows={projects}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        className='dataGrid'
      />
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  )
}
