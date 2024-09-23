import { Button, message, Modal, Space, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { CiEdit, CiSquareRemove } from "react-icons/ci";
import handleAPI from "../apis/HandleAPI";
import { TableComponent } from "../components";
import { ToogleSupplier } from "../modals";
import { SupplierModel } from "../types/supplier.type";

const { Text } = Typography
const { confirm } = Modal
const SupplierScreen = () => {
  const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<SupplierModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [totalPages, setTotalPages] = useState<number>(10)
  const [supplierSelected, setSupplierSelected] = useState<SupplierModel>()
  const columns: ColumnProps<SupplierModel>[] = [
    {
      title: '#',
      dataIndex: '_id',
      align: 'center',
      render: (id: string, record: SupplierModel, index: number) =>
        (page - 1) * pageSize + index + 1,
    },
    {
      key: 'name',
      title: 'Supplier Name',
      dataIndex: 'name',
    },
    {
      key: 'product',
      title: 'Supplier product',
      dataIndex: 'product',
      ellipsis: true
    },
    {
      key: 'categories',
      title: 'Categories',
      dataIndex: 'categories',
    },
    {
      key: 'contact',
      title: 'Contact Number',
      dataIndex: 'contact',
      ellipsis: true
    },
    {
      key: 'price',
      title: 'Supplier price',
      dataIndex: 'price',
    },
    {
      key: 'email',
      title: 'Supplier email',
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
      dataIndex: 'active',
      render: (num) => num ?? '-'
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
  }, [page, pageSize])

  const getSupplier = async () => {
    setIsLoading(true)
    try {
      const res = await handleAPI(`/suppliers?page=${page}&pageSize=${pageSize}`);
      res.data && setSuppliers(res.data.supplier)
      setTotalPages(res.data.totalPage)
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

  const onAddNew = () => {
    setIsVisibleModalAddNew(true)
  }
  return (
    <div>
      <TableComponent
        loading={isLoading}
        records={suppliers}
        columns={columns}
        onAddNew={onAddNew}
        onPageChange={(val) => {
          setPage(val.page)
          setPageSize(val.pageSize)
        }}
        scrollHeight={'calc(100vh - 330px)'}
        total={totalPages}
        title={'Supplier'}
      />
      <ToogleSupplier
        visible={isVisibleModalAddNew}
        loadingDataUpdate={() =>
          supplierSelected && getSupplier()
        }
        onClose={() => {
          setSupplierSelected(undefined)
          setIsVisibleModalAddNew(false)
        }}
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