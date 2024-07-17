import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import Institutions from './components/institution';
import Subjects from './components/subject';
import CourseNumbers from './components/courseNumber';
import TransferableCourse from './components/transferableCourse';
import {
  getInstitutionsApi,
  getSubjectsApi,
  getCourseNumbersApi,
  getTransferableCoursesApi,
} from './api/bctcswsAPI';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function App() {
  const [institutions, setInstitutions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [courseNumbers, setCourseNumbers] = useState([]);
  const [transferableCourses, setTransferableCourses] = useState([]);
  const [resetInstitutionKey, setResetInstitutionKey] = useState(false);
  const [resetSubjectKey, setResetSubjectKey] = useState(false);
  const [resetCourseNumberKey, setResetCourseNumberKey] = useState(false);
  const [formData, setFormData] = useState({
    institution: null,
    subject: null,
    courseNumber: null,
  });

  const handleInstitutionChange = (event, value) => {
    setFormData({ institution: value });

    setResetSubjectKey((prev) => !prev);
    setResetCourseNumberKey((prev) => !prev);
    if (value) {
      getSubjects(value.Id);
    }
  };

  const handleSubjectChange = (event, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      subject: value,
    }));

    setResetCourseNumberKey((prev) => !prev);
    if (value) {
      getCourseNumbers(value.InstitutionId, value.Code);
    }
  };

  const handleCourseNumberChange = (event, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      courseNumber: value,
    }));

    if (value) {
      getTransferableCourses(
        value.InstitutionId,
        value.SubjectCode,
        value.Number
      );
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    getInstitutions();
  }, []);

  const getInstitutions = async () => {
    await getInstitutionsApi().then((data) => setInstitutions(data));
  };

  const getSubjects = async (institutionId) => {
    await getSubjectsApi(institutionId).then((data) => setSubjects(data));
  };

  const getCourseNumbers = async (institutionId, subjectCode) => {
    await getCourseNumbersApi(institutionId, subjectCode).then((data) =>
      setCourseNumbers(data)
    );
  };

  const getTransferableCourses = async (
    institutionId,
    subjectCode,
    courseNumber
  ) => {
    await getTransferableCoursesApi(
      institutionId,
      subjectCode,
      courseNumber
    ).then((data) => {
      data.filter((data) => {
        data.Detail.toLowerCase().trim() != 'no credit';
      });
      //Uncomment if you don't want credit values displayed, but it does mess with some data (more work would be required)
      //data.map((data) => {data.Detail = data.Detail.split('(')[0]});
      if (data.length <= 0) {
        data = [
          { Detail: 'Sorry, there are no transferable courses on record' },
        ];
      }
      setTransferableCourses(data);
    });
  };

  const resetForm = () => {
    setFormData({
      institution: null,
      subject: null,
      courseNumber: null,
    });

    setResetInstitutionKey((prev) => !prev);
    setResetSubjectKey((prev) => !prev);
    setResetCourseNumberKey((prev) => !prev);
    setTransferableCourses(null);
  };

  return (
    <main>
      <Grid container spacing={2} columns={16}>
        <Grid item>
          <Institutions
            resetKey={resetInstitutionKey}
            institutions={institutions}
            handleInstitutionChange={handleInstitutionChange}
          />
        </Grid>
        <Grid item>
          <Subjects
            resetKey={resetSubjectKey}
            subjects={subjects}
            formData={formData}
            handleSubjectChange={handleSubjectChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CourseNumbers
            resetKey={resetCourseNumberKey}
            courseNumbers={courseNumbers}
            formData={formData}
            handleCourseNumberChange={handleCourseNumberChange}
          />
        </Grid>
        <Grid item>
          <Button variant="text" color="secondary" onClick={resetForm}>
            <ReplayIcon />
            Reset
          </Button>
        </Grid>
      </Grid>


      <br />
      <section className="course-container">
        <Typography variant="h6" gutterBottom>
          Transfers To
        </Typography>
        <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start">
          {transferableCourses?.map((transferableCourse) => (
            <Grid item>
              <TransferableCourse
                key={transferableCourse.Id}
                id={transferableCourse.Id}
                title={transferableCourse.RcvrInstitutionCode}
                body={transferableCourse.Detail}
              />
            </Grid>
          ))}
        </Grid>
      </section>
      <br />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
