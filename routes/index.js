
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: "Put the 'tea' in VAT" });
};