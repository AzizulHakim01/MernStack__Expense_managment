import React, {useState, useEffect} from 'react'
import {
    Form,
    Input,
    Modal,
    Select,
    Table,
    message,
    DatePicker
} from 'antd'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import moment from "moment"
import Spinner from '../components/Spinner'
import {UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import Chart from '../components/Chart'




const {RangePicker} = DatePicker


const HomePage = () => {
    const [selectedDate, setSelectedDate] = useState([])
    const [loading, setLoading] = useState(false)
    const [allTransections, setAllTransections] = useState([])
    const [frequency, setFrequency] = useState("7")
    const [type, setType] = useState('all')
    const [viewData, setViewData] = useState('table')
    const [editable, setEditable] = useState(null)

    

    // table data
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text)=><span>{moment(text).format('DD-MM-YYYY')}</span>
        },
        {
            title: 'Amount',
            dataIndex: 'amount'
        },
        {
            title: 'Type',
            dataIndex: 'type'
        },
        {
            title: 'Category',
            dataIndex: 'category'
        }, {
            title: 'Reference',
            dataIndex: 'reference'
        }, {
            title: 'Actions',
            render: (text, record) => {
                <div>
                    <EditOutlined onClick={()=>{
                        setEditable(record) 
                        setShowModal(true)
                    }
                    } className='mx-2'/>
                    <DeleteOutlined className='mx-2'/>
                </div>
            }
        },
    ]


    useEffect(() => {

        const getAllTransections = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('auth'))
                setLoading(true);
                const res = await axios.post('http://localhost:8080/api/v1/transections/get-transection', {
                    userId: user._id,
                    frequency,
                    selectedDate,
                    type
                })
                setLoading(false)
                setAllTransections(res.data)
            } catch (error) {
                setLoading(false)
                message.error("issue with transections")
            }
        };
        getAllTransections()
    }, [frequency, selectedDate, type])


    // handle Submit form
    const handleSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('auth'))
            setLoading(true);
            if(editable){
                await axios.post('http://localhost:8080/api/v1/transections/edit-transection', {
                    payload:{
                        ...values,
                        userId: user._id
                    },
                    transectionId: editable._id,
            })
            setLoading(false)
            message.success('Transection Updated Successfully')
            } else{
                await axios.post('http://localhost:8080/api/v1/transections/add-transection', {
                ...values,
                userId: user._id
            })
            setLoading(false)
            message.success('Transection Added Successfully')
        }
        setShowModal(false)
            setEditable(null)
        } catch (error) {
            setLoading(false)
            message.error("Failed to add transection")
        }
    }

    const [showModal, setShowModal] = useState(false)
    return (
        <Layout> {
            loading && <Spinner/>
        }
            <div className="filters">
                <div>
                    <h6>Select Frequency</h6>
                    <Select style={
                            {width: "100%"}
                        }
                        value={setFrequency}
                        onChange={
                            (values) => setFrequency(values)
                    }>
                        <Select.Option value="7">
                            Last 1 week
                        </Select.Option>
                        <Select.Option value="30">
                            Last 1 Month
                        </Select.Option>
                        <Select.Option value="365">
                            Last 1 Year
                        </Select.Option>
                        <Select.Option value="custom">
                            Custom
                        </Select.Option>
                    </Select>
                    {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)}/>}
                </div>
                <div>
                    <h6>Select Type</h6>
                    <Select style={
                            {width: "100%"}
                        }
                        value={setType}
                        onChange={
                            (values) => setType(values)
                    }>
                        <Select.Option value="all">
                            All
                        </Select.Option>
                        <Select.Option value="income">
                            Income 
                        </Select.Option>
                        <Select.Option value="expense">
                            Expense
                        </Select.Option>
                    </Select>
                    {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)}/>}
                </div>
                <div>
                        <UnorderedListOutlined onClick={()=>setViewData('table')}  className={`mx-2 ${viewData === 'table' ?'active__icon':'inactive__icon'}`}/>
                    
                        <AreaChartOutlined onClick={()=>setViewData('charts')}  className={`mx-2 ${viewData === 'charts' ?'active__icon':'inactive__icon'}`}/>
                    </div>
                <div>
                    
                    <button className='btn btn-primary'
                        onClick={
                            () => setShowModal(true)
                    }>Add new</button>
                </div>
                
            </div>
            <div className="content">
                {viewData === 'table' ? <Table columns={columns}
                    dataSource={allTransections}/>: <Chart allTransections={allTransections}/>}
            </div>
            <Modal title={editable? 'Edit Transaction':'Add Transection'}
                open={showModal}
                onCancel={
                    () => setShowModal(false)
                }
                footer={false}>
                <Form layout='vertical'
                    onFinish={handleSubmit} initialValues={editable}>
                    <Form.Item label="Amonut"
                        name={"amount"}>
                        <Input type='text'/>
                    </Form.Item>
                    <Form.Item label="Type"
                        name={"type"}>
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category"
                        name={"category"}>
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="tip">Tip</Select.Option>
                            <Select.Option value="project">Project</Select.Option>
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="travel">Travel</Select.Option>
                            <Select.Option value="entertainment">Entertainment</Select.Option>
                            <Select.Option value="bills">Bills</Select.Option>
                            <Select.Option value="medical">Medical</Select.Option>
                            <Select.Option value="fees">Fees</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date"
                        name={"date"}>
                        <Input type='date'/>
                    </Form.Item>
                    <Form.Item label="Reference"
                        name={"reference"}>
                        <Input type='text'/>
                    </Form.Item>
                    <Form.Item label="Description"
                        name={"description"}>
                        <Input type='text'/>
                    </Form.Item>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className='btn btn-primary'>Save</button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    )
}

export default HomePage
