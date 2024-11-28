import React, {createContext, useReducer, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT' | 'SET_TOKEN';
  payload?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {isAuthenticated: true, token: action.payload || null};
    case 'LOGOUT':
      return {isAuthenticated: false, token: null};
    case 'SET_TOKEN':
      return {...state, token: action.payload || null};
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch({type: 'LOGIN', payload: token});
      }
    };
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
