// src/data/schoolsAndGrades.js

export const schools = [
  { id: 1, name: "Escola Municipal ABC" },
  { id: 2, name: "Colégio Estadual XYZ" },
  { id: 3, name: "Centro Educacional WKO" },
  { id: 4, name: "Escola Particular Alfa" },
];

export const grades = [
  { id: 1, name: "Educação Infantil" },
  { id: 2, name: "1º Ano Fundamental I" },
  { id: 3, name: "2º Ano Fundamental I" },
  { id: 4, name: "3º Ano Fundamental I" },
  { id: 5, name: "4º Ano Fundamental I" },
  { id: 6, name: "5º Ano Fundamental I" },
  { id: 7, name: "6º Ano Fundamental II" },
  { id: 8, name: "7º Ano Fundamental II" },
  { id: 9, name: "8º Ano Fundamental II" },
  { id: 10, name: "9º Ano Fundamental II" },
  { id: 11, name: "1ª Série Ensino Médio" },
  { id: 12, name: "2ª Série Ensino Médio" },
  { id: 13, name: "3ª Série Ensino Médio" },
];

// Funções utilitárias para buscar
export const getSchools = () => schools;
export const getGrades = () => grades;

export const getSchoolById = (id) => schools.find(school => school.id === parseInt(id));
export const getGradeById = (id) => grades.find(grade => grade.id === parseInt(id));
