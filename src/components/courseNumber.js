import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function CourseNumbers(props) {
  return (
    <Autocomplete
      disablePortal
      sx={{ width: 300 }}
      key={props.resetKey}
      disabled={!props.formData.subject?.Id}
      options={props.courseNumbers}
      getOptionLabel={(option) => option.Number}
      renderInput={(params) => <TextField {...params} label="Course Number" />}
      onChange={props.handleCourseNumberChange}
    />
  );
}
