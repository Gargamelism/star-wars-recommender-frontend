import renderer from "react-test-renderer";
import Button from "../components/Button";

test("renders Button", () => {
  const tree = renderer
    .create(<Button value="123" />)
    .toJSON();
    
    expect(tree).toMatchSnapshot();  
});
