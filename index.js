
let costArray=[5.50,7.25,6.80,9.50,3.25];
let quanArray=[0,0,0,0,0,0];


function caculate_costs(){

    for(let i=0; i<5;i++) {



        $("input[name='cost']").index(i).css('border', '5px solid blue');

        $("input[name='cost']").index(i).innerText="(quanArray[i]*costArray[i])" ;     
        
    }
    
    
}





    for(let i=0; i<5;i++){

        console.log(i);

        $('select[name=quan'+i.toString()+']').change(function (e){

            if(this.value==5){
                $('*').css('border', '5px solid blue');
            }
          //  quanArray.at(i)=this.value;

            quanArray[i]=this.value;
            caculate_costs();
            console.log(quanArray);

        })

    }
   
    

    


