import { createFeatureSelector } from "@ngrx/store";
import { User } from "src/app/models/user";

// // createFeatureSelector will select a single slice of state
export const selectUser = createFeatureSelector<User>('user');