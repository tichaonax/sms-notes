import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import { MasterDetail, ToastMessage } from 'components';
import { MasterContainer, DetailContainer } from 'containers';
import { useAppSelector, useLocalStorage } from 'hooks/hooks';
import { Item, loadSampleSmsNotes, selectSmsNotes, store } from 'state';
import { systemNotes } from 'state/system/systemNotes';
import { mediaQueries } from 'utils';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(loadSampleSmsNotes(systemNotes));

export interface ToastControl {
  onNotify: (message: string) => void,
  onNotifySuccess: (message: string) => void,
  onNotifyError: (message: string) => void
}
export interface AppProps{
  items: Item[],
}
export const App:React.FC<AppProps> = ()  => {

  const isMd = useMediaQuery({query: mediaQueries.md});

  const { items } = useAppSelector(selectSmsNotes());
  const [smsNotesStorage, setSmsNotesStorage] = useLocalStorage("smsNotes", items);

  const [theme, setTheme] = useLocalStorage("smsTheme", 'light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const { onNotify, onNotifySuccess, onNotifyError } = ToastMessage();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
      <Router>
        <Routes>
          <Route path="master/*"
            element={
              <MasterDetail
                MasterType={MasterContainer}
                masterProps={{ toggleTheme, items }}
                DetailType={DetailContainer}
                detailProps={{ toggleTheme }}
                items={items}
                setSmsNotesStorage={setSmsNotesStorage}
                smsNotesStorage={smsNotesStorage}
                onNotify={onNotify}
                onNotifySuccess={onNotifySuccess}
                onNotifyError={onNotifyError}/>
            } />
            { isMd ? (<Route path="*" element ={<Navigate to="/master/" />}/> ) :
              (<Route path="*" element ={<Navigate to="master/detail/nothing-here" />}/> )}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>
      </Router>
  );
};
