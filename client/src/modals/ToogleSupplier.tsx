import { Avatar, Button, Form, Input, message, Modal, Select } from 'antd'
import { useRef, useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { upLoadFile } from '../utils/uploadFIle'
import { replacename } from '../utils/replaceName'
import handleAPI from '../apis/HandleAPI'
import { SupplierModel } from '../types/supplier.type'

interface Props {
  visible: boolean
  onClose: () => void
  onAddNew: (val: SupplierModel) => void
  supplier?: SupplierModel
}

const ToogleSupplier = ({ visible, onClose, onAddNew, supplier }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTaking, setIsTaking] = useState<boolean>();
  const [file, setFile] = useState<any>();
  const inputRef = useRef<any>();
  const [form] = Form.useForm();

  const addNewSupplier = async (val: any) => {
    setIsLoading(true)
    const data: any = {}
    for (const i in val) {
      data[i] = val[i] ?? ''
    }
    data.price = val.price ? parseInt(data.price) : 0
    data.isTaking = isTaking ? 1 : 0
    if (file) {
      data.photoUrl = await upLoadFile(file)
    }
    data.slug = replacename(val.name)
    try {
      const res: any = await handleAPI('/add-supplier', data, 'post')
      if (res) {
        message.success(res.message)
        onAddNew(res.data)
        handleClose()
      }
    } catch (e: any) {
      message.error(e.message)
    } finally {
      setIsLoading(false)
    }
  }
  const handleClose = () => {
    form.resetFields();
    onClose();
  }
  return (
    <>
      <Modal
        closable={!isLoading}
        open={visible}
        onClose={handleClose}
        onCancel={handleClose}
        onOk={() => form.submit()}
        okButtonProps={{
          loading: isLoading
        }}
        title="Add Supplier"
        okText="Add Supplier"
        cancelText="Discard"
      >
        <Form
          disabled={isLoading}
          onFinish={addNewSupplier}
          layout='horizontal' form={form}
          size='large'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <div hidden>
            <input
              ref={inputRef}
              accept='image/*'
              type="file"
              id='inpfile'
              onChange={(val: any) => setFile(val.target.files[0])} />
          </div>
          <div className='flex justify-center items-center mb-3'>
            <label htmlFor='inpfile'>
              {
                file ? (
                  <Avatar size={90}
                    src={URL.createObjectURL(file)} />
                ) : (
                  <Avatar size={90} style={{
                    background: 'white',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    borderColor: 'rgba(0, 0, 0, 0.25)',
                    borderWidth: '2px',
                    borderStyle: 'dashed',
                  }}>
                    <BiUser fill='#3333' size={60} />
                  </Avatar>
                )
              }
            </label>
            <div className=''>
              <p className='text-center text-slate-500'>Drag image here</p>
              <p className='text-center text-slate-500 pt-1'>Or</p>
              <Button
                onClick={() => inputRef.current.click()}
                style={{
                  paddingTop: '0'
                }} type='link'>Browse image</Button>
            </div>
          </div>
          <Form.Item name={'name'}
            rules={[{
              required: true,
              message: 'Please input supplier name!',
            }]} label='Supplier name'>
            <Input placeholder='Enter supplier name' allowClear />
          </Form.Item>
          <Form.Item name={'product'} label='Product'>
            <Input placeholder='Enter product' allowClear />
          </Form.Item>
          <Form.Item name={'categories'} label='Category'>
            <Select options={[]} placeholder='Select product category' />
          </Form.Item>
          <Form.Item name={'price'} label='Buying Price'>
            <Input placeholder='Enter buying price' type='number' allowClear />
          </Form.Item>
          <Form.Item name={'contact'} label='Contact Number'>
            <Input placeholder='Enter supplier contact number' allowClear />
          </Form.Item>
          <Form.Item label='Type'>
            <div className='mb-3'>
              <Button
                size='middle'
                onClick={() => setIsTaking(false)}
                type={isTaking === false ? 'primary' : 'default'}>Not taking return</Button>
            </div>
            <Button
              size='middle'
              onClick={() => setIsTaking(true)}
              type={isTaking ? 'primary' : 'default'}>Taking return</Button>
          </Form.Item>
        </Form>
      </Modal >
    </>
  )
}

export default ToogleSupplier