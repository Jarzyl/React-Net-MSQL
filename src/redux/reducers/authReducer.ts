// redux/authReducer.ts

const initialState = {
    user: null, 
    redirectPath: '', // Nowa zmienna
  };
  
  const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'REDIRECT':
        return { ...state, redirectPath: action.payload };
      default:
        return state;
    }
  };
  
  export default authReducer;
  