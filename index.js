let costArray = [5.50, 7.25, 6.80, 9.50, 3.25];
let quanArray = [0, 0, 0, 0, 0, 0];
let total_cost=0;
let tax=0;
let final_cost=0;

let first_name, last_name,street,city,phone;



function caculate_costs() {
    total_cost=0;
    tax=0;
    final_cost=0;
    for (let i = 0; i < 5; i++) {
        let cost=(quanArray[i] * costArray[i]);
        $("td input[name='cost']").eq(i).val(cost.toFixed(2));
        total_cost=total_cost+cost
    }
    
    tax=(total_cost*0.0625);
    final_cost=(total_cost+tax);
    
    $("input[id=subtotal]").val(total_cost.toFixed(2));
    $("input[id=tax]").val(tax.toFixed(2));
    $("input[id=total]").val(final_cost.toFixed(2));

}

function validate(){
    
    if(last_name==null){
        $("input[name=lname]").css('border', '5px solid red');
    }
    if(city==null){
        $("input[name=city]").css('border', '5px solid red');
    }
    if(street==null){
        $("input[name=street]").css('border', '5px solid red');
    }
    if(phone==null){
        $("input[name=phone]").css('border', '5px solid red');
    }
    if (!(phone.length !== 7 && phone.length !== 10)){
        alert("oyu fushed ");
    }
}
    

for (let i = 0; i < 5; i++) {

    console.log(i);

    $('select[name=quan' + i.toString() + ']').change(function (e) {

        if (this.value == 5) {
            $('*').css('border', '5px solid blue');
        }
        //  quanArray.at(i)=this.value;

        quanArray[i] = this.value;
        caculate_costs();
        console.log(quanArray);

    });
    
    $("input[type=button]").click(function (e){
        validate();
    });

}
   
    

    


