import {
  Experiment,
  ExperimentProvider,
  Variant,
  useVariant,
} from 'react-experiment';

const Box: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      style={{
        border: '1px solid #000',
        padding: '10px',
        marginBottom: '10px',
      }}
    >
      {children}
    </div>
  );
};

const LikeVariant = () => {
  const [value, setValue] = useVariant('like');

  return (
    <Box>
      <button onClick={() => setValue('A')}>A</button>
      <button onClick={() => setValue('B')}>B</button>
      <Experiment name="like" defaultValue="A">
        <Variant name="A">
          <p>User has variant A for Likes</p>
        </Variant>
        <Variant name="B">
          <p>User has variant B for Likes</p>
        </Variant>
      </Experiment>
    </Box>
  );
};

const TestVariant = () => {
  const [value, setValue] = useVariant('test');

  return (
    <Box>
      <button onClick={() => setValue('A')}>A</button>
      <button onClick={() => setValue('B')}>B</button>
      <Experiment name="test" defaultValue="B">
        <Variant name="A">
          <p>User has variant A for Tests</p>
        </Variant>
        <Variant name="B">
          <p>User has variant B for Tests</p>
        </Variant>
      </Experiment>
    </Box>
  );
};

const App = () => {
  return (
    <div>
      <LikeVariant />
      <TestVariant />
      <LikeVariant />
    </div>
  );
};

export default () => (
  <ExperimentProvider>
    <App />
  </ExperimentProvider>
);
