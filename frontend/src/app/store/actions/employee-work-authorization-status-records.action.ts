import { createActionGroup, props } from '@ngrx/store';
import { EmployeeWorkAuthorizationStatusRecord, WorkAuthorizationStatus } from 'src/app/models/work-authorization-status';


export const EmployeeWorkAuthorizationStatusRecordsActions = createActionGroup({
    source: 'Employee Work Authorization Status Records',
    events: {
        'Retrieve Record List': props<{ statusRecords: EmployeeWorkAuthorizationStatusRecord[] }>(),
        'Send Notification': props<{ employeeId: string }>(),
        'Reject Document': props<{
            employeeId: string, newStatus: WorkAuthorizationStatus
        }>(),
        'Approve Document': props<{ employeeId: string, newStatus: WorkAuthorizationStatus }>(),
    },
});