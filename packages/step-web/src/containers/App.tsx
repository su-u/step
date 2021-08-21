import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import '../css/App.scss';
import { entry } from '@step-lang/step-core/dist';

console.dir = () => {};
console.group = () => {};
console.groupEnd = () => {};
console.info = () => {};

export const App: React.FC = () => {
  const [code, setCode] = React.useState<string>('');
  const [output, setOutput] = React.useState<Array<string>>([]);
  const [execError, setExecError] = React.useState<Array<string>>([]);

  const onChange = React.useCallback((value) => {
    setCode(value);
  }, []);

  const chibaLangExec = React.useCallback(() => {
    setOutput([]);
    setExecError([]);
    entry(code);
  }, [code]);

  console.log = (obj: any) => {
    setOutput((prev) => [...prev, String(obj)]);
  };

  console.error = (obj: any) => {
    setExecError((prev) => [...prev, String(obj)]);
  };

  return (
    <>
      <div className="header">
        <div role="button" onClick={chibaLangExec}>
          Run
        </div>
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
          setOptions={{}}
          onChange={onChange}
          width="50%"
        />
        <div className="output">
          <div>
            {execError.length === 0 &&
              output.map((line, i) => {
                return <p key={i}>{line}</p>;
              })}
            {execError.length >= 1 &&
              execError.map((line, i) => {
                return (
                  <p className="error" key={i}>
                    {line}
                  </p>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
