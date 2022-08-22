import {auth} from "./firebaseNode.js";

// Get project data
export const getProjectData = async (projectName) => {
    const docSnap = await getDocSnap(currentUser.uid, projectName);
    let rowData = [];
    // check if data exists
    if (docSnap.exists()) {
        let data = docSnap.data();
        // create rows
        for(let i=0; i < data.list.length; i++){
            rowData.push(data.list[i]);
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    return rowData;
}