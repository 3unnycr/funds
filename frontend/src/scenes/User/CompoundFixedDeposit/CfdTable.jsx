import React from "react";
import {useRef, useState} from "react";
import { Table, Button, Input, Space } from 'antd';
import {CopyOutlined, SearchOutlined} from "@ant-design/icons";
import moment from "moment";
import copy from "copy-to-clipboard";
import { toast } from 'react-toastify';

const CfdTable = (props) => {
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span className={"ponin text-primary"} onClick={(e) => handleCopyText(text)} >{text} <CopyOutlined /></span>
      ) : (
        <span className={"ponin text-primary"} onClick={(e) => handleCopyText(text)} >{text} <CopyOutlined /></span>
      ),
  });

  const handleCopyText = (e) => {
    copy(e);
    toast.success("Contract Id copied: {" + e + "}", {
    toastId: "error-cfd",
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme:"colored"
    });
  }



  const columns = [
  {
    title: 'Contract Id',
    dataIndex: '_id',
    ...getColumnSearchProps('_id'),
    render: (text) => <span className={"ponin text-primary"} onClick={(e) => handleCopyText(text)} >{text} <CopyOutlined /></span>,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'ROI',
    dataIndex: 'roi',
    sorter: (a, b) => a.roi - b.roi,
  },
  {
    title: 'ROI Months',
    dataIndex: 'withdrawals',
    sorter: (a, b) => a.withdrawals - b.withdrawals,
  },
  {
    title: 'Released',
    dataIndex: 'isReleased',
    filters: [
      {text: "Released", value: true},
      {text: "Not Released", value: false}
    ],
    onFilter:(value, record) => {
      return record.isReleased === value
    },
    render : (text) => <span className={`${String(text) === "true" ? "badge bg-success p-2": "badge bg-danger p-2"}`}> {String(text) === "true" ? "Released": "Not Released"} </span>
  },
  {
    title: 'Percent Monthly',
    dataIndex: 'percent',
  },
  {
    title: 'Active',
    dataIndex: 'isActive',
    render : (text) => <span className={`${String(text) === "true" ? "badge bg-success p-2": "badge bg-danger p-2"}`}> {String(text) === "true" ? "Active": "Inactive"} </span>,
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
    render: (text) => <span>{moment(text).format('Do/MMMM/YYYY')}</span>,
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated_at',
    sorter: (a, b) => moment(a.updated_at).unix() - moment(b.updated_at).unix(),
    render: (text) => <span>{moment(text).format('Do/MMMM/YYYY')}</span>,
  }
];

  return (
    <div>
      <Table loading={props.loading} size={"small"} rowKey={"_id"} columns={columns} scroll={{ x: 1500 }} dataSource={props.data} bordered />
    </div>
  )
}

export default CfdTable;
