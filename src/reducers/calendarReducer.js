import { types } from "../types/types";

// {
//   id: 342342342432,
//   title: "cumpleaños del jefe",
//   start: moment().toDate(),
//   end: moment().add(2, "hours").toDate(),
//   notes: "Comprar el pastel",
//   user: {
//     _id: "123",
//     name: "Fernando",
//   },
// },

const initialState = {
  event: [],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.eventAddNew:
      return {
        ...state,
        event: [...state.event, action.payload],
      };
    case types.eventClearActive:
      return {
        ...state,
        activeEvent: null,
      };
    case types.eventUpdate:
      return {
        ...state,
        event: state.event.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case types.eventDeleted:
      return {
        ...state,
        event: state.event.filter((e) => e.id !== state.activeEvent.id),
        activeEvent: null,
      };
    case types.eventLoated:
      return {
        ...state,
        event: [...action.payload],
      };
    case types.eventLogout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
