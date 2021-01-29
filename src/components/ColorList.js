import React, { useState } from "react";
import axios from "axios";
import EditMenu from "./EditMenu"
import { useHistory, useParams } from 'react-router-dom'
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getColors}) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const { id } = useParams();
  const {push} = useHistory()

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(
          colors.map((item) => {
            if(item.id === res.data.id){
              return res.data
            } else {
              return item
            }
          })
        )
        setEditing(false)
      })
      .catch(err => {
        console.log(err)
      })
  };


  const deleteColor = (color) => {
    axios 
      .delete(`http://localhost:5000/api/colors/${id}`)
      .then(res => {
        getColors()
        push("/")
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href =  '/';
  };

  return (
    <div className="colors-wrap">
      <button onClick = {logout}>Logout</button>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.