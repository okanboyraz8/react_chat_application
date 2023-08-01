import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from "./contexts/AuthContext";
import { ChatContextProvider } from './contexts/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AuthContextProvider>
	<ChatContextProvider>
		<React.StrictMode>
			<App />
	    </React.StrictMode>
	</ChatContextProvider>
  </AuthContextProvider>

);
