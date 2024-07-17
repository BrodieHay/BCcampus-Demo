const handleError = (error) => ({ error });

const baseUrl = `https://bctcsws.test.bayleaf.com/api/v1.2/agreementws`;

const getInstitutionsApi = async () => {
  try {
    let response = await fetch(`${baseUrl}/GetInstitutions`);

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getSubjectsApi = async (institutionId) => {
  try {
    let response = await fetch(
      `${baseUrl}/GetSubjects?institutionId=${institutionId}`
    );

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getCourseNumbersApi = async (institutionId, subjectCode) => {
  try {
    let response = await fetch(
      `${baseUrl}/GetSendingCourses?institutionId=${institutionId}&subjectCode=${subjectCode}`
    );

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getTransferableCoursesApi = async (
  institutionId,
  subjectCode,
  courseNumber
) => {
  try {
    let response = await fetch(
      `${baseUrl}/SearchFrom?sender=${institutionId}&subjectCode=${subjectCode}&courseNumber=${courseNumber}`
    );

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  getInstitutionsApi,
  getSubjectsApi,
  getCourseNumbersApi,
  getTransferableCoursesApi,
};
