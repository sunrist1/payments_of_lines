var http = require('http');
var url = "http://www.lianhanghao.com/"; 
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path')
var data = "";

var banks = [],
    provinces = [];

fs.readFile(__dirname + "/banks.json",{flag:'r+',encoding:'utf8'},function(err,data){
  if(err){
    console.error(err)
    return;
  }
// console.log(data)
  banks = JSON.parse(data)

  console.log(banks[0])
})

var req = http.request(url,function(res){
  res.setEncoding("utf8")

  res.on('data',function(chunk){
    data += chunk
  })

  res.on("end",function(){
    // filter_html(data)
    // filter_bank(data)
    // filter_province(data)
  })
})

function filter_html(html){
  var $ = cheerio.load(html)
  var questions = $(".auto tr");
  questions.each(function(item){
    var summary = $(this)
    var a = summary.find('td:nth-of-type(1)').text()
    console.log(a)
  })
}

// // 获取银行列表并保存为文件
// function filter_bank(html){
//   var $ = cheerio.load(html)
//   var banks = $("#bank option");
//   var banksArr = []
//   banks.each(function(item){
//     var summary = $(this)
//     if(summary.text().indexOf("请选择")>0){
//       return;
//     }
//     var bank = {
//       name:summary.text(),
//       code:summary.attr("value")
//     }
//     banksArr.push(bank)
//   })

//   var banksJson = JSON.stringify(banksArr)
//   fs.writeFile(__dirname + '/banks.json',banksJson,function(err){
//     if(err){
//       console.error(err)
//     }else{
//       console.log('write banks json success')
//     }
//   })
// }
// // 获取省份列表并保存为文件
// function filter_province(html){
//   var $ = cheerio.load(html)
//   var provinces = $("#province option");
//   var provincesArr = []
//   provinces.each(function(item){
//     var summary = $(this)
//     if(summary.text().indexOf("请选择")>0){
//       return;
//     }
//     var province = {
//       name:summary.text(),
//       code:summary.attr("value")
//     }
//     provincesArr.push(filter_province)
//   })

//   var provincesJson = JSON.stringify(provincesArr)
//   fs.writeFile(__dirname + '/provinces.json',provincesJson,function(err){
//     if(err){
//       console.error(err)
//     }else{
//       console.log('write provinces json success')
//     }
//   })
// }

req.end()