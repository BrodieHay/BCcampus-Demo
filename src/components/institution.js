import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Institutions(props) {
  return (
    <Autocomplete
      disablePortal
      key={props.resetKey}
      sx={{ width: 300 }}
      options={props.institutions}
      getOptionLabel={(option) => option.Code + ' - ' + option.Title}
      renderInput={(params) => <TextField {...params} label="Institution" />}
      onChange={props.handleInstitutionChange}
    />
  );
}
