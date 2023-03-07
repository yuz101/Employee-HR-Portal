import { Employee } from '../models/employee';

export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string;
}
