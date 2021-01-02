import renderer from "react-test-renderer";
import CheckboxCard from "../components/CheckboxCard";

test("renders CheckboxCard", () => {
  const tree = renderer
    .create(<CheckboxCard isChecked={false} name="1222" value="222" handleChecked={(val)=>(val)} />)
    .toJSON();
    
    expect(tree).toMatchSnapshot();  
});
