import React from "react";
import Note from "./Note";
import { Button } from "@material-ui/core";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const NoteWrapper = styled.div`
  max-width: calc(100% - 20px);
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;

const NoteFeed = ({notes}) => {
  return (
    <div>
      {notes.map(note => (
        <NoteWrapper key={note.id}>
          <Note note={note}/>
          <Link to={`note/${note.id}`} style={{ float:'right',marginRight:'5%' }}>Permalink</Link>
        </NoteWrapper>
      ))}
      <Button variant="outlined" style={{ marginTop:'10' }}>Click me!</Button>
    </div>
  )
}

export default NoteFeed;