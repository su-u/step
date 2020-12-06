import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import '../css/App.scss';
import { entry } from '../../src/index';

export const App: React.FC = () => {

  console.log('a');
  entry('1 |> int -> a');

  return (
    <>
      <AceEditor
        mode="javascript"
        theme="monokai"
        className="editor"
        value="const test = 1;"
        name="editor"
        fontSize="20px"
        tabSize={2}
        setOptions={{
        }}
        width="50%"
      />
    </>
  );
};
