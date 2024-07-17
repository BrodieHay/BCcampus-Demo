import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

export default function Subjects(props) {
  return (
    <Autocomplete
      disablePortal
      sx={{ width: 300 }}
      key={props.resetKey}
      disabled={!props.formData.institution?.Id}
      options={props.subjects}
      getOptionLabel={(option) =>
        option?.Code + ' - ' + (option.Title != null ? option.Title : '')
      }
      renderInput={(params) => <TextField {...params} label="Subject" />}
      onChange={props.handleSubjectChange}
    />
  );
}
