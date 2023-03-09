import { createReducer, on } from "@ngrx/store";
import { EmployeeCurrentWorkAuthorizationStatusRecord } from "src/app/models/work-authorization-status";
import { EmployeeWorkAuthorizationStatusRecordsActions } from "../actions/employee-work-authorization-status-records.action";


export const initialState: EmployeeCurrentWorkAuthorizationStatusRecord[] = [];

export const employeeWorkAuthorizationStatusRecordsReducer = createReducer(
    initialState,
    on(
        EmployeeWorkAuthorizationStatusRecordsActions.retrieveRecordList,
        (state, { statusRecords }) => statusRecords
    ),
    on(
        EmployeeWorkAuthorizationStatusRecordsActions.rejectDocument,
        (state, { employeeId, newStatus }) => state.map(employee => {
            if (employee.employeeId === employeeId) {
                return {
                    ...employee,
                    workAuthorizationStatus: newStatus,
                };
            }
            return employee;
        }),
    ),
    on(
        EmployeeWorkAuthorizationStatusRecordsActions.approveDocument,
        (state, { employeeId, newStatus }) => state.map(employee => {
            if (employee.employeeId === employeeId) {
                return {
                    ...employee,
                    workAuthorizationStatus: newStatus
                };
            }
            return employee;
        }),
    ),
);