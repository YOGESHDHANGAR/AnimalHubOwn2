import {
  ALL_ANIMAL_FAIL,
  ALL_ANIMAL_REQUEST,
  ALL_ANIMAL_SUCCESS,
  LOAD_MORE_ANIMAL_REQUEST,
  LOAD_MORE_ANIMAL_SUCCESS,
  LOAD_MORE_ANIMAL_FAIL,
  ADMIN_ANIMAL_REQUEST,
  ADMIN_ANIMAL_SUCCESS,
  ADMIN_ANIMAL_FAIL,
  NEW_ANIMAL_REQUEST,
  NEW_ANIMAL_SUCCESS,
  NEW_ANIMAL_FAIL,
  NEW_ANIMAL_RESET,
  UPDATE_ANIMAL_REQUEST,
  UPDATE_ANIMAL_SUCCESS,
  UPDATE_ANIMAL_FAIL,
  UPDATE_ANIMAL_RESET,
  DELETE_ANIMAL_REQUEST,
  DELETE_ANIMAL_SUCCESS,
  DELETE_ANIMAL_FAIL,
  DELETE_ANIMAL_RESET,
  ANIMAL_DETAILS_REQUEST,
  ANIMAL_DETAILS_FAIL,
  ANIMAL_DETAILS_SUCCESS,
  QUERIES,
  CLEAR_ERRORS,
} from "../constants/animalConstants";

export const queriesReducer = (
  state = {
    queries: {
      milk: undefined,
      category: undefined,
      radius: undefined,
      rate: undefined,
      breedArr: undefined,
    },
  },
  action
) => {
  switch (action.type) {
    case QUERIES:
      return {
        queries: action.queries,
      };
    default:
      return state;
  }
};

export const animalsReducer = (state = { animals: [] }, action) => {
  switch (action.type) {
    case ALL_ANIMAL_REQUEST:
    case ADMIN_ANIMAL_REQUEST:
      return {
        loading: true,
        animals: [],
      };
    case LOAD_MORE_ANIMAL_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case ALL_ANIMAL_SUCCESS:
      return {
        loading: false,
        animals: action.payload.animals,
        animalsCount: action.payload.totalAnimals,
      };
    case LOAD_MORE_ANIMAL_SUCCESS:
      const newAnimalArr = action.payload.animals;
      const { animals } = state;
      return {
        ...state,
        loading: false,
        animals: [...animals, ...newAnimalArr],
      };

    case ADMIN_ANIMAL_SUCCESS:
      return {
        loading: false,
        adminAnimalsInfo: action.payload,
      };
    case ALL_ANIMAL_FAIL:
    case ADMIN_ANIMAL_FAIL:
    case LOAD_MORE_ANIMAL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newAnimalReducer = (state = { animal: {} }, action) => {
  switch (action.type) {
    case NEW_ANIMAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_ANIMAL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        animal: action.payload.animal,
      };
    case NEW_ANIMAL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_ANIMAL_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const animalReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ANIMAL_REQUEST:
    case UPDATE_ANIMAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ANIMAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ANIMAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_ANIMAL_FAIL:
    case UPDATE_ANIMAL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ANIMAL_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_ANIMAL_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const animalDetailsReducer = (state = { animal: {} }, action) => {
  switch (action.type) {
    case ANIMAL_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ANIMAL_DETAILS_SUCCESS:
      return {
        loading: false,
        animal: action.payload,
      };
    case ANIMAL_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
