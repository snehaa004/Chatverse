
import { GoogleOAuthProvider } from '@react-oauth/google';

import Messenger from './components/Messenger';
import AccountProvider from './context/AccountProvider';

import { useEffect } from 'react';


function App() {
  

    const clientId = '283638567881-4452ape54hl20nihrtsg9i88r9gufqv9.apps.googleusercontent.com';

    return (
      <GoogleOAuthProvider clientId={clientId}>
        <AccountProvider>
          <Messenger />
        </AccountProvider>
      </GoogleOAuthProvider>
    );
  }

export default App;
