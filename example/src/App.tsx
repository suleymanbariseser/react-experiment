import { variant, useVariant, Experiment, Variant } from 'react-experiment';

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
      <Experiment variant={testVariant} defaultValue="A">
        <Variant name="A">
          <div>This is variant A</div>
        </Variant>
        <Variant name="B">
          <div>This is variant B</div>
        </Variant>
      </Experiment>
    </div>
  );
};

export default App;
