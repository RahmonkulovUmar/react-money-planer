const IncomeSchema = require("../models/incomeModel")
const { param } = require("../routes/transactions")

exports.addIncome = async (req,res) => {

const {title, amount, category, description, date} = req.body

const income = IncomeSchema({
    title,
    amount, 
    category,
    description,
    date
})

try {
    if(!title ||  !category || !description || !date){
        return res.status(400).json({message: 'FAILE'})
    }
    await income.save()
    res.status(200).json({message: 'Income Added well FINALLY!!!!!!'})
} catch (error) {   
    res.status(200).json({message: 'Server Erorr!'})
    console.log(error)
} 

}

exports.getIncomes = async (req,res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch(erorr) {
        res.status(200).json({message: 'Server Erorr!'})
    }
}

exports.deleteIncome = async(req,res) => {
        const {id} = req.params;
        IncomeSchema.findByIdAndDelete(id)

        .then((income) => {
            res.status(200).json({message: 'Income deleted well FINALLY!!!!!!'})
        })
        .catch ((err)=> {
            res.status(500).json({message: 'Server Erorr!'})
    })
}