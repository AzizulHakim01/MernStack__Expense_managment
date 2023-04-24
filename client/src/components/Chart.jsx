import React from 'react'
import {Progress} from 'antd'

const Chart = ({allTransections}) => { // category
    const categories = [
        'salary',
        "tip",
        "project",
        "food",
        "travel",
        "entertainment",
        "bills",
        "medical",
        "fees"
    ]


    const totalTransection = allTransections.length;
    const totalIncome = allTransections.filter(transection => transection.type === 'income')
    const totalExpense = allTransections.filter(transection => transection.type === 'expense')
    const totalIncomePercent = (totalIncome.length / totalTransection) * 100
    const totalExpensePercent = (totalExpense.length / totalTransection) * 100


    // Total turnOver
    const totalTurnover = allTransections.reduce((acc, transection) => acc + transection.amount, 0)

    const totalIncomeTurnover = allTransections.filter((transection) => transection.type === 'income').reduce((acc, transection) => acc + transection.amount, 0)

    const totalExpenseTurnover = allTransections.filter((transection) => transection.type === 'expense').reduce((acc, transection) => acc + transection.amount, 0)

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100
    const totalExpenseTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100

    return (
        <>
            <div className="row m-3">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            Total Transections : {totalTransection} </div>
                        <div className="card-body">
                            <h5>Income : {
                                totalIncome.length
                            }</h5>
                            <h5>Expense : {
                                totalExpense.length
                            }</h5>
                            <div>
                                <Progress type='circle'
                                    strokeColor={'green'}
                                    className='mx-2'
                                    percent={
                                        totalIncomePercent.toFixed(0)
                                    }/>
                                <Progress type='circle'
                                    strokeColor={'red'}
                                    className='mx-2'
                                    percent={
                                        totalExpensePercent.toFixed(0)
                                    }/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            Total Turn Over : {totalTurnover} </div>
                        <div className="card-body">
                            <h5>Income : {totalIncomeTurnover}</h5>
                            <h5>Expense : {totalExpenseTurnover}</h5>
                            <div>
                                <Progress type='circle'
                                    strokeColor={'green'}
                                    className='mx-2'
                                    percent={
                                        totalIncomeTurnoverPercent.toFixed(0)
                                    }/>
                                <Progress type='circle'
                                    strokeColor={'red'}
                                    className='mx-2'
                                    percent={
                                        totalExpenseTurnoverPercent.toFixed(0)
                                    }/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row m-3">
                <div className="col-md-6">
                    <h4>Categorywise Income</h4>
                    {
                        categories.map((category) => {
                            const amount = allTransections.filter((transection) => transection.type === 'income' && transection.category === category).reduce((acc, transection)=>acc + transection.amount, 0);
                            return (amount > 0 &&
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <h5>{category}</h5>
                                        <Progress percent={((amount/totalIncomeTurnover)* 100).toFixed(0) } />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="col-md-6">
                    <h4>Categorywise Expense</h4>
                    {
                        categories.map((category) => {
                            const amount = allTransections.filter((transection) => transection.type === 'expense' && transection.category === category).reduce((acc, transection)=>acc + transection.amount, 0);
                            return (amount > 0 &&
                                <div className="card">
                                    <div className="card-body">
                                        <h5>{category}</h5>
                                        <Progress percent={((amount/totalExpenseTurnover)* 100).toFixed(0) } />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default Chart
