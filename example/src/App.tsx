import { variant, useVariant } from 'react-experiment';

const testVariant = variant('test');

const App = () => {
  const [value, setValue] = useVariant(testVariant);

  return (
    <div>
      <div>
        Set variant =
        <div>
          <button onClick={() => setValue('A')}>A</button>
          <button onClick={() => setValue('B')}>B</button>
        </div>
      </div>
      {value === 'A' ? (
        <div>This is variant A</div>
      ) : value === 'B' ? (
        <div>This is variant B</div>
      ) : (
        <div>There is no variant setted</div>
      )}
    </div>
  );
};

export default App
