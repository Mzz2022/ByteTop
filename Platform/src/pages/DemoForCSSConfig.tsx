// import { Card } from '@/variantcomponents/MyCards';
import { MyForm } from '@/variants/MyForm';
import { MyInput } from '@/variants/MyInput';
import { MyModal } from '@/variants/MyModals';
import { MySwitch } from '@/variants/MySwitch';
import { MyListbox } from '@/variants/MyListbox';

// Import all your components
function DemoForCSSConfig() {
  return (
    <div className="flex justify-center items-center flex-col">

      {/* <Button>Click me</Button> */}
      <hr />

      {/* <Card>
        <h2>Card Title</h2>
        <p>Some card content.</p>
      </Card> */}
      <hr />

      {/* <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel> */}
      <hr />

      {/* <MyDropdown options={['Option 1', 'Option 2', 'Option 3']} /> */}
      <hr />

      <MyForm>
        <MyInput type="text" placeholder="Enter text" />
        <button type="submit">Submit</button>
      </MyForm>
      <hr />

      <MyInput type="text" placeholder="Enter text" />
      <hr />

      <MyListbox items={[
        { value: 'Item 1' },
        { value: 'Item 2' },
        { value: 'Item 3' }
      ]} />
      <hr />

      <MyModal title="Modal Title">
        <p>Some modal content.</p>
      </MyModal>
      <hr />

      {/* <MyNotification message="This is a notification!" /> */}
      <hr />

      {/* <MyProgress progress={50} /> */}
      <hr />

      <MySwitch />
      <hr />

      {/* Add more components as needed */}
    </div>
  );
}

export default DemoForCSSConfig;
