import { Button, message, Modal, Space, Typography } from "antd";
import Table, { ColumnProps } from "antd/es/table"
import { useEffect, useState } from "react";
import { BsFilterSquare } from "react-icons/bs";
import { ToogleSupplier } from "../modals";
import { SupplierModel } from "../types/supplier.type";
import handleAPI from "../apis/HandleAPI";
import { CiEdit, CiSquareRemove } from "react-icons/ci";

const { Title, Text } = Typography
const { confirm } = Modal
const SupplierScreen = () => {
  const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<SupplierModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [supplierSelected, setSupplierSelected] = useState<SupplierModel>()
  const columns: ColumnProps<SupplierModel>[] = [
    {
      key: 'name',
      title: 'Supplier Name',
      dataIndex: 'name',
    },
    {
      key: 'product',
      title: 'Product',
      dataIndex: 'product',
    },
    {
      key: 'contact',
      title: 'Contact Number',
      dataIndex: 'contact',
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: 'type',
      title: 'Type',
      dataIndex: 'isTaking',
      render: (isTaking) => <Text type={isTaking ? 'success' : 'danger'}>{isTaking ? `Taking return` : `Not Taking Return`}</Text>,
    },
    {
      key: 'on',
      title: 'On the way',
      dataIndex: '',
    },
    {
      key: 'buttonContainer',
      align: 'right',
      title: 'Actions',
      dataIndex: '',
      render: (item: SupplierModel) =>
        <Space>
          <Button type="text"
            onClick={() => {
              setSupplierSelected(item)
              setIsVisibleModalAddNew(true)
            }}
            icon={<CiEdit size={20}
              className="text-slate-600" />}></Button>
          <Button
            onClick={() => confirm({
              title: 'Xóa nhà cung cấp',
              content: 'Bạn có muốn xóa nhà cung cấp không?',
              onOk: () => handleDeleteSupplier(item._id),
              onCancel() { },
            })}
            type="text"
            icon={<CiSquareRemove size={20}
              className="text-slate-600" />}></Button>
        </Space >
    }
  ];

  useEffect(() => {
    getSupplier()
  }, [])

  const getSupplier = async () => {
    setIsLoading(true)
    try {
      const res = await handleAPI('/suppliers');
      res.data && setSuppliers(res.data)
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  const handleDeleteSupplier = async (id: string) => {
    // - xóa nhà cung cấp theo id
    setIsLoading(true)
    try {
      const res: any = await handleAPI(`/del-supplier?id=${id}`, undefined, 'delete');
      getSupplier()
      message.success(res.message);
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Table
        loading={isLoading}
        dataSource={suppliers}
        columns={columns}
        title={() => (
          <div className="flex justify-between">
            <div>
              <Title level={5}>Suppliers</Title>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setIsVisibleModalAddNew(true)}
                className=" font-medium" type="primary">Add Product</Button>
              <Button className=" font-medium" icon={<BsFilterSquare size={20} />}>Filters</Button>
              <Button className=" font-medium" >Download all</Button>
            </div>
          </div>
        )}

      />
      <ToogleSupplier
        visible={isVisibleModalAddNew}
        onClose={() => {
          supplierSelected && getSupplier()
          setSupplierSelected(undefined)
          setIsVisibleModalAddNew(false)
        }
        }
        // - no se luu thang vao suppliers ma ko can goi laij data
        onAddNew={(val) => setSuppliers([...suppliers, val])}
        /* - khi nguoi dung click vao icon edit thi thong tin cua nhà
         cung cap se duoc gắn vào supplier
         */
        supplier={supplierSelected}
      />
    </div>
  )
}

export default SupplierScreen