import { Button, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { ColumnProps } from "antd/es/table";
import { BsFilterSquare } from "react-icons/bs";

interface Props {
  loading?: boolean;
  columns: ColumnProps<any>[]
  records: any[]
  onPageChange: (val: { page: number; pageSize: number }) => void
  onAddNew: () => void
  scrollHeight?: string
  total: number
  title?: string
}
const { Title } = Typography

const TableComponent = (props: Props) => {
  const { loading, records, onPageChange, onAddNew, scrollHeight, total, title, columns } = props;

  const [pageInfo, setPageInfo] = useState<{ page: number, pageSize: number }>({
    page: 1,
    pageSize: 10
  })

  useEffect(() => {
    onPageChange(pageInfo)
  }, [pageInfo])

  return (
    <>
      <Table
        pagination={{
          showSizeChanger: true,
          onShowSizeChange: (_curren, size) => {
            setPageInfo({ ...pageInfo, pageSize: size });
          },
          total: total,
          onChange: (page, _pageSize) => {
            setPageInfo({ ...pageInfo, page });
          }
        }}
        scroll={{
          y: scrollHeight ?? 'calc(100vh - 330px)'
        }}
        loading={loading}
        dataSource={records}
        columns={columns}
        title={() => (
          <div className="flex justify-between">
            <div>
              <Title level={5}>{title}</Title>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={onAddNew}
                className=" font-medium" type="primary">Add Product</Button>
              <Button className=" font-medium" icon={<BsFilterSquare size={20} />}>Filters</Button>
              <Button className=" font-medium" >Download all</Button>
            </div>
          </div>
        )}
      />
    </>
  )
}

export default TableComponent