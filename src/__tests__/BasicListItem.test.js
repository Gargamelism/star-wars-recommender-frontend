import renderer from "react-test-renderer";
import BasicListItem from "../components/BasicListItem";

test("renders BasicListItem", () => {
  const tree = renderer
    .create(<BasicListItem name="123" />)
    .toJSON();
    
    expect(tree).toMatchSnapshot();  
});
