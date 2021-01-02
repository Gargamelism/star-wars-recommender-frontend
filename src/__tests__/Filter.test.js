import renderer from "react-test-renderer";
import Filter from "../components/Filter";

test("renders Filter", () => {
  const tree = renderer
    .create(<Filter setFilterVal={(val) => (val)} placeholder="this place" />)
    .toJSON();
    
    expect(tree).toMatchSnapshot();  
});
