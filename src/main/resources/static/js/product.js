$(document).ready(function(){

    $("#update").hide();
    assignDataToTable();
    $('#tab1').addClass('active');

     var formatter = new Intl.NumberFormat('vi-VI', {
              style: 'currency',
              currency: 'vnd',
      });
    //DOM TABLE
    function assignDataToTable() {
        $.ajax({
          type:"GET",
          contentType: "application/json",
          url:"http://localhost:8080/user/api/products",
          success: function(data) {
            var products = JSON.parse(JSON.stringify(data));
            dom(products);
            },
          error: function(err) {
            console.log(err);
            }
        });
    }
    // END DOM TABLE

    function dom(products){
        $("#products-table").empty();
        if(products.length > 0){
            for (var i in products) {
                $("#products-table").
                append("<tr> \
                            <td>" +  products[i].productId + "</td> \
                            <td>" +  products[i].productName + "</td> \
                            <td>" +  formatNumber(products[i].quantity) + "</td> \
                            <td>" +  formatter.format(products[i].price) + "</td> \
                            <td>" +  products[i].dateAdded + "</td> \
                            <td>" +  products[i].measureWord + "</td> \
                            <td><button id='delete' class='btn btn-link'> \ <i class='fas fa-trash-alt'></i> \ </button> \ </td> \
                            <td><button id='edit' class='btn btn-link'> \ <i class='far fa-edit'></i> \ </button> \ </td> \
                        </tr>");
             }
        }else{
            $("#products-table").
                append("<tr> \
                   <td colspan ='8'><h4 style='color:red'> Table is empty!</h4></td> \
               </tr>");
        }
    }

    // FORMAT NUMBER
    function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    //END FORMAT NUMBER

    // FUNCTION SAVE DATA
    $("#save").click(function() {
        //var dateAdded =  new Date().toISOString().slice(0,19);
        var jsonVar = {
            productId: $("#productId").val(),
            productName: $("#productName").val(),
            quantity: $("#quantity").val(),
            price: $("#price").val(),
            measureWord: $("#measureWord").val()
        };
        $.ajax({
            type:"POST",
            url:"http://localhost:8080/user/api/products",
            data: JSON.stringify(jsonVar),
            contentType: "application/json",
            success: function(data){
                assignDataToTable();
                clearData();
                $.notify("Insert product " + jsonVar.productId + " success!", "success");
                console.log(data);
            },
            error: function(err) {
                var errMes = JSON.parse(JSON.stringify(err.responseJSON));
                validated(errMes);
                console.log(err);
            }
        });

    });
    // END FUNCTION SAVE DATA

    $("#reset").click(function() {
        clearData();
    });

      //CLEAR DATA
      function clearData(){
        $("#update").hide();
        $("#save").show();
        $('#productId').prop('readonly', false);
        $("#productId").val("");
        $("#productName").val("");
        $("#quantity").val("");
        $("#price").val("");

        $('#quantity').css('background', 'transparent');
        $('#price').css('background', 'transparent');
        $('#productName').css('background', 'transparent');
        $('#productId').css('background', 'transparent');
      } //END CLEAR DATA

      //DELETE PRODUCT
      $('table').on('click', 'button[id="delete"]', function(e){
         var productId = $(this).closest('tr').children('td:first').text();
         var name = $(this).closest('tr').children('td:nth-child(2)').text();

         var r = confirm("Confirm delete product " + name + " !");
         if(r){
             $.ajax({
                  type:"DELETE",
                  url:"http://localhost:8080/user/api/products/" + productId,
                  success: function(data){
                      assignDataToTable();
                      $.notify("Delete product " + productId + " success!", "success");
                  },
                  error: function(err) {
                      console.log(err);
                       var errMes = JSON.parse(JSON.stringify(err.responseJSON));
                       $.notify(errMes.message, "error");
                  }
              });
          }else{
            return false;
          }
      });

      //UPDATE PRODUCT
      $('table').on('click','button[id="edit"]',function(e){
        var productId = $(this).closest('tr').children('td:first').text();
        // get data
        $.ajax({
            type:"GET",
            url:"http://localhost:8080/user/api/products/" + productId,
            success: function(data){
                $('#productId').prop('readonly', true);
                $('#productId').css('background','#eee')
                $("#update").show();
                $("#save").hide();

                var product = JSON.parse(JSON.stringify(data));
                $('#productId').val(product.productId);
                $('#productName').val(product.productName);
                $('#quantity').val(product.quantity);
                $('#price').val(product.price);
                $('#measureWord').val(product.measureWord);
            },
            error: function(err){
               console.log(err);
               var errMes = JSON.parse(JSON.stringify(err.responseJSON));
               $.notify(errMes.message, "error");
            }
        });
      });

   // edit data
    $('#update').on('click', function(){
        var productId = $("#productId").val();
        var jsonVar = {
            productName: $("#productName").val(),
            quantity: $("#quantity").val(),
            price: $("#price").val(),
            measureWord: $("#measureWord").val()
        };

        $.ajax({
            type: "PUT",
            data: JSON.stringify(jsonVar),
            contentType: "application/json",
            url:"http://localhost:8080/user/api/products/" + productId,
            success: function(data){
                $.notify("Update product " + productId + " success!", "success");
                assignDataToTable();
                clearData();
            },
            error: function(err){
                console.log(err);
                 var errMes = JSON.parse(JSON.stringify(err.responseJSON));
                 if(err.status == 404){
                    if(errMes.message != null){
                       $.notify(errMes.message, "error");
                       $('#productId').focus();
                       $('#productId').css('background', 'yellow');
                    }else{
                       $('#productId').css('background', 'transparent');
                    }
                 }
                  if(err.status == 400){
                     validated(errMes);
                  }
            }
        });
    });

      function validated(err){
         if(err.price != null){
             $.notify(err.price, "error");
             $('#price').focus();
             $('#price').css('background', 'yellow');
         }else{
              $('#price').css('background', 'transparent');
         }
         if(err.quantity != null){
            $.notify(err.quantity, "error");
            $('#quantity').focus();
            $('#quantity').css('background', 'yellow');
         }else{
            $('#quantity').css('background', 'transparent');
         }
         if(err.productName != null){
            $.notify(err.productName, "error");
            $('#productName').focus();
            $('#productName').css('background', 'yellow');
         }else{
            $('#productName').css('background', 'transparent');
         }
         if(err.productId != null){
             $.notify(err.productId, "error");
             $('#productId').focus();
             $('#productId').css('background', 'yellow');
          }else{
             $('#productId').css('background', 'transparent');
          }

      }

   $("#btn-search").click(function() {
         var tk = $('#tk').val();
         $.ajax({
             type:"GET",
             url:"http://localhost:8080/user/api/products?tk=" + tk,
             success: function(data){
                 var products = JSON.parse(JSON.stringify(data));
                 dom(products);
             },
             error: function(err) {
                console.log(err);
             }
         });

     });
});