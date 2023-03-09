import { createActionGroup, props } from '@ngrx/store';
import { EmployeeCurrentWorkAuthorizationStatusRecord, CurrentWorkAuthorizationStatus } from 'src/app/models/work-authorization-status';


export const EmployeeWorkAuthorizationStatusRecordsActions = createActionGroup({
    source: 'Employee Work Authorization Status Records',
    events: {
        'Retrieve Record List': props<{ statusRecords: EmployeeCurrentWorkAuthorizationStatusRecord[] }>(),
        'Send Notification': props<{ employeeId: string }>(),
        'Reject Document': props<{
            employeeId: string, newStatus: CurrentWorkAuthorizationStatus
        }>(),
        'Approve Document': props<{ employeeId: string, newStatus: CurrentWorkAuthorizationStatus }>(),
    },
});