$(function() {
  let menu = $('#menu').find('li');
  let money=$('#pay').find('.cash');
  let pay=$('#payment');
  
  menu.click(function() {
    orderList($(this))
  })

  function orderList(p) {
    let pName = p.find('.p_name').text();
    let pPrice = p.find('.p_price').text().replace(',','').slice(0,-1);
    let all_count=$('#all_count').text();
    let paySum=$('#pay_sum').text().replace(',','')
    $('#pay_sum').text(thousand(Number(paySum)+ Number(pPrice)));
    $('#all_count').text(Number(all_count)+1);
    printBill(pName, pPrice)
  }

  var arr= new Array()
  function printBill(name, price) {
    let count=1;
    let insertTr='';
    
    if(arr.includes(name)){
      let place=arr.indexOf(name,0);
      let c=$('.order_list').eq(place).find('div').find('p').text();
      $('.order_list').eq(place).find('div').find('p').text(Number(c)+1)
    }else{
      arr[arr.length]=name
      insertTr += '<li class="order_list">';
      insertTr += '<p class="order_name">' + name + '</p>';
      insertTr += '<div class="order_count"><button type="button" class="count_up">+</button><p>'+`${count}`+'</p><button type="button" class="count_down">-</button></div>';
      insertTr += '<p class="order_price">' + thousand(price) +'원</p>';
      insertTr += '<button class="del_btn"></button>'
      insertTr += '</li>';
      $('#order_ul').append(insertTr);
    }
  }

  $(document).on('click','.count_up',function(){
    let num=$(this).next().text()
    $(this).next().text(Number(num)+1)
    let allCo=$('#all_count').text()
    $('#all_count').text(Number(allCo)+1)
    let price=$(this).parent().next().text().replace(',','').slice(0,-1);
    let Sum=$('#pay_sum').text().replace(',','')
    $('#pay_sum').text(thousand(Number(Sum)+Number(price)));
  })
  $(document).on('click','.count_down',function(){
    let num=$(this).prev().text()
    if(num>1){
      $(this).prev().text(Number(num)-1);
      let allCo=$('#all_count').text()
      $('#all_count').text(Number(allCo)-1)
      let price=$(this).parent().next().text().replace(',','').slice(0,-1);
      let Sum=$('#pay_sum').text().replace(',','')
      $('#pay_sum').text(thousand(Number(Sum)-Number(price)));
    }
  })
  $(document).on('click','.del_btn',function(){
    $(this).parent('li').remove()
    let count=$(this).prev().prev().children('p').text()
    let allCo=$('#all_count').text()
    $('#all_count').text(Number(allCo)-Number(count))
    let price=$(this).prev().text().replace(',','').slice(0,-1);
    let P=Number(count)*Number(price);
    let Sum=$('#pay_sum').text().replace(',','')
    $('#pay_sum').text(thousand(Number(Sum)-Number(P)));

    let del_name=$(this).prev().prev().prev().text();
    for(let i = 0; i < arr.length; i++) {
      if(arr[i] === del_name)  {
        arr.splice(i, 1);
        i--;
      }
    }
  })

  $('#order_btn').on('click',function(){
    if($('#all_count').text()==0){
      alert('메뉴를 선택하세요.')
    }else{
      $('section').css('display','block')
    }
    console.log($('#all_count').text())
  })
  
  $('#reset_btn').on('click',function(){
    window.location.reload()
  })

  $('#close').on('click',function(){
    $('section').css('display','none')
    $('#last_one').css('zIndex','7')
  })
  $('.lo_btn').on('click',function(){
    $(this).parent().css('zIndex','5')
  })
  $('.lt_btn').on('click',function(){
    alert('결제가 완료되었습니다.')
    window.location.reload()
  })

  function thousand(i){
    i=i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return i
  }
})