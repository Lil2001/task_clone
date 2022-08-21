import React, { useState, useMemo } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Draggable from "react-draggable";



const Dashboard = () => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [childrenEditor, setChildrenEditor] = useState([{ children: '' }])
  const [currentList, setCurrentList] = useState(null)
  const [id, setId] = useState(0)

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const dragStartHandler = (e, value) => {
    setCurrentList(value)

  }
  const dragLeaveHandler = () => {

  }

  const dragEndHandler = (e) => {
    e.target.style.background = 'white'

  }
  const dragOverHandler = (e) => {
    e.preventDefault()
    e.target.style.background = 'aqua'
  }

  const dropHandler = (e, value) => {
    e.preventDefault()
    setChildrenEditor(childrenEditor.map((c) => {
      console.log(c.id);
      // if(c.id === value.id){
      //   return {...c, childrenEditor}
      // }
      // if(c.id === childrenEditor.id){
      //   return c
      // }
    }))
  }

  const handleChildrenEditorAdd = () => {
    setChildrenEditor([...childrenEditor, { children: '' }]);
  }

  function dragOver(ev) {
    ev.preventDefault();
  }

  function drop(ev) {
    const droppedItem = ev.dataTransfer.getData("drag-item");
    if (droppedItem) {
      childrenEditor.onItemDropped(droppedItem);
    }
  }



  return (
    <div className="whiteDiv">
      <div className="nav">
        <h2 className="mb-1 ml-4">Profile</h2>
        <div>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
        </div>
        <div className="buttons-div">
          <Link to="/update-profile" className="btn btn-primary w-20 mt-1">
            Update Profile
          </Link>
          <div className="w-20 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="main">
        <div className="edit-text-div">
          <Button onClick={handleChildrenEditorAdd} className="btn btn-primary w-20 mt-1" >
            +
          </Button>
        </div>
        <ul className="characters" >
          {childrenEditor.map((value, index, id) => {
            return (
              <Draggable>
                <li
                  onDragOver={dragOver} onDrop={drop}
                  key={index}
                  className='text-editor children'>
                  <Slate editor={editor} value={initialValue} >
                    <Editable placeholder="Enter some plain text..." />
                  </Slate>
                </li>
              </Draggable>

            );
          })}

        </ul>

      </div>
    </div>
  )
}
const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable plain text' },
    ],
  },
]

export default Dashboard