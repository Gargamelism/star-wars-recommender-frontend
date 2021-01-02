import renderer from "react-test-renderer";
import BasicListItem from "../components/BasicListItem";
import List from "../components/List";

test("renders List", () => {
  const tree = renderer
    .create(<List filterVal="" listItem={BasicListItem} items={[{name: "123"}, {name: "345"}]} emptyListMsg="empty!" />)
    .toJSON();
    
    expect(tree).toMatchSnapshot();  
});
