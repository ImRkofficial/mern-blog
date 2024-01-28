import { FileInput, Select, TextInput,Button } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const CreatePost = () => {
  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold ">
          Create A Post
        </h1>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required={true}
              id="title"
              className="flex-1"
            />
            <Select>
              <option value="uncategorized"> Select A Category</option>
              <option value="javascript">Javascript</option>
              <option value="reactjs">React Js</option>
              <option value="nextjs">Next Js</option>
            </Select>
          </div>
          <div className="flex gap-4 justify-between items-center border-4 border-teal-500 border-dotted p-3">
            <FileInput type="file" accept="images/*"/>
            <Button type="button" gradientDuoTone="purpleToBlue" size="sm" outline>
              Upload Image
            </Button>
          </div>
          <ReactQuill theme="snow" placeholder="Write something..." required className="h-72 mb-12"/>
          <Button type="submit" gradientDuoTone={"purpleToPink"}>
            Publish
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
