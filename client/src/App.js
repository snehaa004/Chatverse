
import { GoogleOAuthProvider } from '@react-oauth/google';

import Messenger from './components/Messenger';
import AccountProvider from './context/AccountProvider';

import socket from './socket';

// Example: register user
socket.emit('addUser', currentUser);

// Example: send message
socket.emit('sendMessage', {
  senderId: userId,
  receiverId: otherUserId,
  text: message,
});

// Example: set preferred language
socket.emit('setLanguage', {
  userId: userId,
  language: 'en',
});


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
