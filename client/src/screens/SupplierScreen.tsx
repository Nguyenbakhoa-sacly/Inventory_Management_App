import { Button, Typography } from "antd";
import Table, { ColumnProps } from "antd/es/table"
import { useState } from "react";
import { BsFilterSquare } from "react-icons/bs";
import { ToogleSupplier } from "../modals";
import { SupplierModel } from "../types/supplier.type";

const { Title } = Typography
const SupplierScreen = () => {
  const columns: ColumnProps<SupplierModel>[] = [];
  const [isVisibleModalAddNew, setIsVisibleModalAddNew] = useState<boolean>(false);
  //21:10 / 1:40:10
  return (
    <div>
      <Table
        dataSource={[]}
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
        )
        }
      />
      <ToogleSupplier
        visible={isVisibleModalAddNew}
        onClose={() => setIsVisibleModalAddNew(false)}
        onAddNew={(val) => console.log(val)}
      />
    </div>
  )
}

export default SupplierScreen