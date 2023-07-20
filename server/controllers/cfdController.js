const Usd = require('../models/UsdModel');
const Cfd = require('../models/CfdModel');
// const sendEmail = require("../utils/sendEmail");
const moment = require('moment');

var balance = 0;
var currentrate = {};

const userbalanceusd = async (req, res, next) => {
  try{
    usds = await Usd.find({user_id: res.user._id});
    let total = 0.00;
    if (usds.length == 0){
      total = 0.00;
    }else{
      usds.map(usd => {
        if(usd.credit == true){
          total = parseFloat(total) + parseFloat(usd.amount);
        }else{
          total = parseFloat(total) - parseFloat(usd.amount);
        }
      });
    }
    total = parseFloat(total).toFixed(2)
    balance = parseFloat(total);

  }catch (error){
    next(error);
  }
}


exports.cfdAdd = async (req, res, next) => {
const { amount } = req.body;
  await userbalanceusd(req, res, next);
  todaydate = await Date.now();

  if (amount <= 50.00){
    return next(new ErrorResponse("Amount should be greater than 50 USD", 400));
  }

  if (amount > balance){
        return next(new ErrorResponse("You have insuffencient balance!", 400));
  }
  await Cfd.create({
    user_id: res.user._id, amount: amount, roi: 0.0, isReleased: false, withdrawals: 0, percent: 2, isActive: true, created_at: todaydate, updated_at: todaydate
  });

  let query = await Cfd.findOne({user_id: res.user._id}).limit(1).sort({$natural:-1});

  await Usd.create({
    user_id: res.user._id, amount: amount, credit: false, detail: `Debited for your INO Funds ECP investment. Contract id [${query._id}]`
  });

  return res.status(200).json({success: true, contract: query._id});

};

function datediff(date1, date2) {

   var udate1 = new Date(date1);
   var udate2 = new Date(date2);
   const diffTime = Math.abs(udate1 - udate2);
   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
   return diffDays;

}




exports.cfdcreditglobal = async (req, res, next) => {
  let date2 = new Date();
  let udatetoday = new Date();
  const date = require('date-and-time')
  const cfds = await Cfd.find({isActive: true, isReleased: false});
    for (cfd of cfds) {

       let date1 = cfd.updated_at;
       date1 = moment(date1).format('MM/DD/YYYY');
       date2 = moment(date2).format('MM/DD/YYYY');

       diffrence = datediff(date1, date2);

      if(diffrence >= 31){
        if(cfd.withdrawals < 11){
          const tomultiply = cfd.percent / 100;
          const addable = parseFloat(cfd.amount) + parseFloat(cfd.roi);
          const amounttogive = tomultiply * addable;
          const roi = parseFloat(cfd.roi) + parseFloat(amounttogive);
          const withdrawals = cfd.withdrawals + 1;
          await Cfd.updateOne({_id: cfd._id}, {$set: {roi: roi, withdrawals: withdrawals, updated_at: udatetoday}});
        }else{
          const tomultiply = cfd.percent / 100;
          const addable = parseFloat(cfd.amount) + parseFloat(cfd.roi);
          const amounttogive = tomultiply * addable;
          const roi = parseFloat(cfd.roi) + parseFloat(amounttogive);
          const withdrawals = parseFloat(cfd.withdrawals) + 1;
          await Cfd.updateOne({_id: cfd._id}, {$set: {roi: roi, withdrawals: withdrawals, isReleased: true, isActive: false, updated_at: udatetoday}});
          await Usd.create({
            user_id: cfd.user_id, amount: cfd.amount, credit: true, detail: `Released INO Fund ECP is credited of Contract Id [${cfd._id}].`
          });
          await Usd.create({
            user_id: cfd.user_id, amount: roi, credit: true, detail: `Released INO Fund ECP (ROI) is credited of Contract Id [${cfd._id}].`
          });
        }
      }
    }

    return console.log(`Cfds updated successfully at: ${udatetoday}`);
}

exports.cfdHistorys = async (req, res, next) => {
  cfds = await Cfd.find({user_id: res.user._id}).sort( {"created_at": -1} );
  let newcfds = [];
  for (cfd of cfds) {
    let data = {
        _id: cfd._id,
        user_id: cfd.user_id,
        amount: parseFloat(cfd.amount),
        roi: parseFloat(cfd.roi),
        withdrawals: parseFloat(cfd.withdrawals),
        isReleased: cfd.isReleased,
        percent: cfd.percent,
        isActive: cfd.isActive,
        created_at: cfd.created_at,
        updated_at: cfd.updated_at
    };
    newcfds.push(data);
  }

  res.status(200).json({ status: "success", newcfds});
}
