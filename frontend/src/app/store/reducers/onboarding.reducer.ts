import { OnboardingActionTypes, OnboardingActions } from '../actions/onboarding.actions';
import { Onboarding } from '../../models/onboarding.model';


const initialState: Onboarding[] = [];

export function onboardingReducer(state = initialState, action: OnboardingActions): Onboarding[] {
    switch (action.type) {
        case OnboardingActionTypes.AddOnboarding:
            return [...state, action.payload.onboarding];
        case OnboardingActionTypes.RemoveOnboarding:
            return state.filter(onboarding => onboarding.userID !== action.payload.id);
        default:
            return state;
    }
}
