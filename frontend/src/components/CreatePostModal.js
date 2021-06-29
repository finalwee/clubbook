import { Modal, Form, Input } from "antd";

const CreatePostModal = ({ visible, onCreate,
    onCancel, displayStatus }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Create a new post"
            okText="Create" cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    console.log(values);
                    onCreate(values);
                }).catch((e) => { if(e.values.name === undefined)displayStatus({
                    type: "error",
                    msg: "Please enter!",
                  }) });
            }}>
            <Form form={form} layout="vertical"
                name="form_in_modal">
                <Form.Item
                    name="Title" label="Title"
                    rules={[{
                        required: true,
                        message: "Error: Please enter the title of the post!",
                    },]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="Content" label="Content"
                    rules={[{
                        required: true,
                        message: "Error: Please enter the content of the post!",
                    },]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default CreatePostModal;
