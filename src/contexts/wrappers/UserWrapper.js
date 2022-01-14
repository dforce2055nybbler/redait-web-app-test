import React, { useEffect, useReducer, createContext } from 'react';
import axios from 'axios';

import userReducer from '../reducers/user-reducer';
import { setUser } from '../actions/user-actions';

export const UserContext = createContext();
const UserProvider = UserContext.Provider;

export const UserWrapper = ({ children }) => {
  const defaultUser = { username: 'Guest' };
  const storedUser =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null;
  const [user, dispatchUser] = useReducer(
    userReducer,
    storedUser || defaultUser
  );

  useEffect(() => {
    if (storedUser) {
      setTimeout(() => {
        axios
          .get(process.env.GATSBY_STRAPI_URL + '/users/me', {
            headers: {
              Authorization: `Bearer ${storedUser.jwt}`,
            },
          })
          .then(response => {
            dispatchUser(
              setUser({
                ...response.data,
                profileImage: storedUser.profileImage
                  ? storedUser.profileImage
                  : undefined,
                jwt: storedUser.jwt,
                onboarding: true,
              })
            );
          })
          .catch(error => {
            dispatchUser(setUser(defaultUser));
          });
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserProvider value={{ user, dispatchUser, defaultUser }}>
      {children}
    </UserProvider>
  );
};
