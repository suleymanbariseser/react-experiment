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
        marginBottom: '10px'
      }}
    >
      {children}
    </div>
  );
};
const App = () => {
  const [likeVariant, setLikeVariantValue] = useVariant('like');
  const [testVariant, setTestVariantValue] = useVariant('test');

  return (
    <div>
      <Box>
        <button onClick={() => setLikeVariantValue('A')}>A</button>
        <button onClick={() => setLikeVariantValue('B')}>B</button>
        <Experiment name="like" defaultValue="A">
          <Variant name="A">
            <p>User has variant A for Likes</p>
          </Variant>
          <Variant name="B">
            <p>User has variant B for Likes</p>
          </Variant>
        </Experiment>
      </Box>
      <Box>
        <button onClick={() => setTestVariantValue('A')}>A</button>
        <button onClick={() => setTestVariantValue('B')}>B</button>
        <Experiment name="test" defaultValue="B">
          <Variant name="A">
            <p>User has variant A for Tests</p>
          </Variant>
          <Variant name="B">
            <p>User has variant B for Tests</p>
          </Variant>
        </Experiment>
      </Box>
    </div>
  );
};

export default () => (
  <ExperimentProvider>
    <App />
  </ExperimentProvider>
);
