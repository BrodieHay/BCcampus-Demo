import React from 'react';

export default function TransferableCourse(props) {
  return (
    <div className="course-card">
      <button>{props.body}</button>
    </div>
  );
}
