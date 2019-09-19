export const getGradeValueById = (id, grades) => {
  if (id) {
    return grades.find(item => item.id == id).value;
  }
};
export const getNameById = (id, array) => {
  if (id) {
    return array.find(item => item.id == id).name;
  }
};
export const getSubjectValueById = (id, subjects) => {
  if (id) {
    return subjects.find(item => item.id == id).name;
  }
};
