import React, { useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { MasterDetail } from 'components';
import { MasterContainer, DetailContainer } from 'containers';
import { useAppSelector, useLocalStorage } from 'hooks/hooks';
import { Item, loadSampleSmsNotes, selectSmsNotes, store } from 'state';
import { systemNotes } from 'state/system/systemNotes';
import 'antd/dist/antd.css';

store.dispatch(loadSampleSmsNotes(systemNotes));

export interface AppProps{
  items: Item[],
}
export const App:React.FC<AppProps> = ()  => {

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
              smsNotesStorage={smsNotesStorage} />
          } />
        <Route path="*" element ={<Navigate to="/master/detail/nothing-selected" />}/>
      </Routes>
    </Router>

  );
};