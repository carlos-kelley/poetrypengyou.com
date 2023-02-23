import "./TestRoute.css";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function TestRouteFunction(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'

  return (
    <div>
      <div className="testRouteBackground">
        <h2 className="testRouteHeader">
          PEE
        </h2>
      </div>
    </div>
  );
}

export default TestRouteFunction;
