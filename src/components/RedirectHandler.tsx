// // components/RedirectHandler.tsx
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store.ts';
// import { setRedirectPath } from '../redux/authSlice.ts';

// const RedirectHandler = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const redirectPath = useSelector((state: RootState) => state.auth.redirectPath);

//   useEffect(() => {
//     if (redirectPath) {
//       navigate(redirectPath);
//       dispatch(setRedirectPath(''));  // Resetujemy ścieżkę przekierowania po przekierowaniu
//     }
//   }, [redirectPath, navigate, dispatch]);

//   return null;
// };

// export default RedirectHandler;
