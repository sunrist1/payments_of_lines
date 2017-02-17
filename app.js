var cheerio = require('cheerio');
var Promise = require("bluebird")
var fs = Promise.promisifyAll(require('fs'));
var request = Promise.promisifyAll(require('request'))
var path = require('path')
var data = "";


var url = "http://www.lianhanghao.com/"; 


var banks = [],
    provinces = [];

fs.readFileAsync(__dirname + "/banks.json",'utf8')
  .then(function(error){
    console.log(data)
  })
  .catch(function(err){
    console.error(err)
  });

request.getAsync(url)
  .then(function(data){
    filter_bank(data)
  })
  .catch(function(err){
    console.error(err)
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

// 获取银行列表并保存为文件
function filter_bank(html){
  var $ = cheerio.load(html)
  var banks = $("#bank option");
  var banksArr = []
  banks.each(function(item){
    var summary = $(this)
    if(summary.text().indexOf("请选择")>0){
      return;
    }
    var bank = {
      name:summary.text(),
      code:summary.attr("value")
    }
    banksArr.push(bank)
  })

  var banksJson = JSON.stringify(banksArr)
  fs.writeFile(__dirname + '/banks.json',banksJson,function(err){
    if(err){
      console.error(err)
    }else{
      console.log('write banks json success')
    }
  })
}
// 获取省份列表并保存为文件
function filter_area(html){
  var $ = cheerio.load(html)
  var provinces = $("#province option");
  var provincesArr = []
  provinces.each(function(item){
    var summary = $(this)
    if(summary.text().indexOf("请选择")>0){
      return;
    }
    var province = {
      name:summary.text(),
      code:summary.attr("value")
    }
    provincesArr.push(province)
  })

  var provincesJson = JSON.stringify(provincesArr)

  provincesArr.each(function(item){
    http.request(url+"index.php/Index/Ajax?id="+item.code,function(res){
      res.setEncoding("utf8")
    })
  })
  /*fs.writeFile(__dirname + '/provinces.json',provincesJson,function(err){
    if(err){
      console.error(err)
    }else{
      console.log('write provinces json success')
    }
  })*/
}

function getCitys(provinces){

}
