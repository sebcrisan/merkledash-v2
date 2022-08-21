import React, { useContext, useEffect, useState } from 'react'
import {auth, createUser, loginUser, sendPwResetMail, updateMail, updatePw, db, addToCollection, createCollection, updateDoc, document, getDocument,
     getDocuments, deleteDocument, verifyEmail, applyAction, reauth } from '../firebase' 

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    // signup function with email and password
    function signup(email, password){
        return createUser(auth, email, password);
    };

    // email verification after signup
    function verifyMail(user){
        return verifyEmail(user);
    }

    // handle email verification after user clicked link
    function handleVerifyEmail(actionCode){
        return applyAction(auth, actionCode);
    }

    // login function with email and password
    function login(email, password){
        return loginUser(auth, email, password);
    }

    // logout function
    function logout(){
        return auth.signOut();
    }

    // reset password
    function resetPassword(email) {
        return sendPwResetMail(auth, email);
    }

    // update email
    function updateEmail(email){
        return updateMail(currentUser, email);
    }

    // update password
    function updatePassword(password){
       return updatePw(currentUser, password);
    }

    // create collection if not exists and create doc within collection, auto generated ID
    function addDocAutoId(collection, doc){
        return addToCollection(createCollection(db, collection), doc);
    }

    // updates a document within a collection, create collection + doc if not exists, specified ID
    function addDocWithName(collection, docName, doc){
        return updateDoc(document(db, collection, docName), doc); 
    }

    // get document snapshot from a given collection and doc name, run .exists() on returned object to check if doc exists
    function getDocSnap(collection, docName){
        const docRef = document(db, collection, docName);
        return getDocument(docRef);
    }

    // retrieve all docs in collection
    function getAllDocs(collection){
        return getDocuments(createCollection(db, collection));
    }

    // delete document in collection
    function deleteDocInCollection(collection, docName){
        const docRef = document(db, collection, docName);
        return deleteDocument(docRef);
    }

    // reauth with credentials, used for password verification etc
    function reauthWithCreds(user, credential){
        return reauth(user, credential);
    }

    // when firebase detects user change, change user in state and then unsubscribe to the listener (make sure component only renders once by using useEffect)
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    // expose methods to children within context
    const value = {
        currentUser,
        signup,
        verifyMail,
        handleVerifyEmail,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        addDocAutoId,
        addDocWithName,
        getDocSnap,
        getAllDocs,
        deleteDocInCollection,
        reauthWithCreds
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
