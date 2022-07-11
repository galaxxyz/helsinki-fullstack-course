import patients from '../../data/patients';
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientByID = (id: string): PatientEntry | undefined => {
  const patient = patients.find((p) => p.id === id);
  /*if (patient)
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
    };*/
  return patient;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatientByID,
};
