import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import '../css/App.scss';
import { entry } from '../../src';

console.dir = () => {};
console.group = () => {};
console.groupEnd = () => {};

export const App: React.FC = () => {
  const [code, setCode] = React.useState<string>('');
  const [output, setOutput] = React.useState<Array<string>>([]);

  const onChange = React.useCallback((value) => {
    setCode(value)
  }, []);

  const chibaLangExec = React.useCallback(() => {
    setOutput([]);
    entry(code);
  }, [code])

  console.log = (obj: any) => {
    // console.info(obj);
    setOutput((prev) => [...prev, String(obj)]);
  }

  return (
    <>
      <div className="header">
        <div role="button" onClick={chibaLangExec}>Run</div>
      </div>
      <div className="container">
        <AceEditor
          mode="javascript"
          theme="monokai"
          className="editor"
          value={code}
          name="editor"
          fontSize="20px"
          tabSize={2}
          setOptions={{
          }}
          onChange={onChange}
          width="50%"
        />
        <div className="output">
          <div>
            {output.map((line) => {
              return (
                <p>{line}</p>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
};
