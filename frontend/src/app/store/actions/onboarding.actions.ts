import { Action } from '@ngrx/store';
import { Onboarding } from '../../models/onboarding.model';

export enum OnboardingActionTypes {
    AddOnboarding = '[Onboarding] Add Onboarding',
    RemoveOnboarding = '[Onboarding] Remove Onboarding'
}

export class AddOnboarding implements Action {
    readonly type = OnboardingActionTypes.AddOnboarding;

    constructor(public payload: { onboarding: Onboarding }) { }
}

export class RemoveOnboarding implements Action {
    readonly type = OnboardingActionTypes.RemoveOnboarding;

    constructor(public payload: { id: string }) { }
}

export type OnboardingActions = AddOnboarding | RemoveOnboarding;
