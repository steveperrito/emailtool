$(function(){
    $('div.input-group-addon').popover();
});

$(function(){
   var subButton = $('.submit');
   var textArea = $('.textInput');
   var codeText = $('.codeCopyText');
   var codeEl = $('.codeCopy');
   var sampleDiv = $('.sampleDiv');
   var divWidth = $('.divWidth');

   textArea.val("* This will be bold *\n\nhttp://www.ThisWillBeLinked.com\n\nDon't forget about paragraphs.\nThose are important too.\n\nHow about adding an image:\n\nimgTaghttp://www.imaginebroward.org/Friday%20Emails/email-clip-art.png\n\nGood luck,\n\nSteve Perry\n\nP.S. A highlighted P.S. can draw\nthe eye and get the message across...");

   subButton.click(function(e){
       e.preventDefault();
       codeText.text('');
       sampleDiv.empty();
       var urlRegEx = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
       var threePlusBrks = /(\n\n\n+)/g;
       var textToSplit = textArea.val().replace(threePlusBrks, '\n\n');
       var paragraphs = textToSplit.split('\n\n');
       var width_inline = (divWidth.val() < 200)?'400': divWidth.val();
       var imgTag = '<img src="';
       var TagClose = '/>';
       var p = '<p style="font-family: Arial, Helvetica, sans-serif; line-height: 25px; width:'+width_inline+'px">';
       var p2 = "</p>";
       var htmlparagraphs = paragraphs.map(function(x){
           var strg = "<strong>";
           var strg2 = "</strong>";
           var a = '<a href="';
           var a2 ='</a>';
           var regex =/\n/g;
           var brkOrSpc =($('.brkCheck').is(':checked'))?'<br />':' ';
           var alteredX = x.replace(regex, brkOrSpc);

           if(alteredX.substring(0,6) === 'imgTag')
           return p.concat(imgTag + alteredX.substring(6) + '"' +' ' + 'width="' + '320' + '"' + ' ' + TagClose, p2);

           else if(alteredX.match(urlRegEx) != null)
           return p.concat(alteredX.replace(urlRegEx, a + alteredX.match(urlRegEx)[0]+'">'+' '+alteredX.match(urlRegEx)[0]+a2),p2);

           else if(alteredX.substring(0,1) == '*' && alteredX.substring((x.length-1),(x.length)) == '*')
           return p.concat(strg,alteredX,strg2,p2);

           else return p.concat(alteredX, p2);
       });

       var htmlparagraphs = ($('.yellowCheck').is(':checked'))?findPS(htmlparagraphs):htmlparagraphs;

       var codeCopy = htmlparagraphs.reduce(function(previousValue, currentValue){
           return previousValue + currentValue;
       });

       var emailWrap1 = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head><body><div style="width:'+width_inline+'px;">';
       var emailWrap2 = '</div></body></html>';

       codeText.text(emailWrap1 + codeCopy + emailWrap2);
       sampleDiv.append(codeCopy);

       if(codeEl.is(':visible')){
           return 0
       }  else {
           codeEl.fadeIn(500);
           sampleDiv.delay(500).fadeIn(500);
       }
   });

   function findPS(ary){
       var openDiv = '<div style="border:2px dashed #3B5323; padding-left: 10px; background: #ffff00; font-family: Arial, Helvetica, sans-serif; line-height: 25px; width:400px">';
       var closeDiv = '</div>';
       var indexBefore = 0;
       ary.forEach(function(x){
           if(/(P.S.)/.test(x)){
               indexBefore = ary.indexOf(x);
           }
       });
       if(indexBefore > 0){
           ary.splice(indexBefore, 0, openDiv);
           ary.push(closeDiv);
       }
       return ary;
   }
});