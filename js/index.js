$('html , body').ready(() => {

    //////////////////////////////////////////delete main loding interface
    search(" ").then(() => {
        $(".lodingScreen").fadeOut(700, () => {
            $("body").css("overflow", "visible");
            $(".lodingScreen").remove();
        })
    })

    ////////////////////////////////////////////side nav

    let navList = $('.nav-item li');
    navList.animate({ opacity: '0', paddingTop: '500px' });



    $('#btnToggel').click(function () {

        let offset = $('.sideNav').offset();
        let left = offset.left;
        console.log(left)
        
       
        if (left == 0) {

            document.getElementById('btnToggel').innerHTML = '<i id="openNav" class="fa-solid fa-bars fa-2x"></i>';
            $('.sideNav').addClass('close').removeClass('open');
           
            //to animate menue
            navList.animate({ opacity: '0', paddingTop: '500px' });

        } else {

            $('.sideNav').addClass('open').removeClass('close');
            
            //to animate menue to appear from button
            navList.eq([0]).animate({ opacity: '1', paddingTop: '10px' });
            navList.eq([1]).animate({ opacity: '1', paddingTop: '10px' });
            navList.eq([2]).animate({ opacity: '1', paddingTop: '10px' });
            navList.eq([3]).animate({ opacity: '1', paddingTop: '10px' });
            navList.eq([4]).animate({ opacity: '1', paddingTop: '10px' });
           
            document.getElementById('btnToggel').innerHTML = '<i id="closeNav" class="fa-solid fa-xmark fa-2x" ></i>'
            
        }
    });
    
    
    /////////////////////////////////////////////
    let rowDate = document.getElementById('rowData');

    //to make search with spacific name
    async function search(name) {

        $('.loading-container').fadeIn(200);
        
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);


        if (response.status == 200) {

            response = await response.json();

            $('.loading-container').fadeOut(500);

            showMeals(response.meals);
        }
    }
    // to display result 
    function showMeals(meals) {

        let cartoona = ``;
       


        for (let i = 0; i < meals.length; i++) {


            cartoona += `<div class="col-md-6 col-lg-3  my-3">
                            <div class="post pointer" onclick='MealsDetail(${meals[i].idMeal})'>
                                <img src="${meals[i].strMealThumb}" class="w-100 rounded" alt="${meals[i].strMeal}">
                                <div class="layer d-flex align-items-center p-2 bg-layer position-absolute rounded">
                                    <h2>
                                        ${meals[i].strMeal}
                                    </h2>
                                </div>
                            </div>
                        </div> `;

        }

        rowDate.innerHTML = cartoona;
    }

    window.MealsDetail = MealsDetail;
    
    
    //to get the details of the meal
    async function MealsDetail(id){
        
        //to delete content in page to show spacific meal
        document.getElementById('search').innerHTML = '';
        rowDate.innerHTML = '';
         

        $('.loading-container').fadeIn(100);
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);


        if (response.status == 200) {

            response = await response.json();

            $('.loading-container').fadeOut(500);

            showMealsDetail(response.meals);
        }


    }
    function showMealsDetail(meal){

        let Recipes = ``,
            ingredi= [],
            measures = [],
            iterateMeal = Object.entries(meal[0]) ,
            tags;

        
        for (const [iterator,value] of iterateMeal) {
            
            if(iterator.includes('strIngredient')&& value !=="" && value !==null ){
                ingredi.push(value);  
            }
            if(iterator.includes('strMeasure')&& value !=="" && value !==null ){
                measures.push(value);  
            }

        }


        for (let i = 0; i < ingredi.length; i++) {
            
            Recipes +=` <li class="my-3 mx-1 p-1 alert-success rounded">${measures[i]} ${ingredi[i]}</li>` 
        }
       
        console.log(meal[0].strTags)

        if(meal[0].strTags != null && meal[0].strTags != ""){
            tags = meal[0].strTags.split(',').map((e)=> `<li class="my-3 mx-1 p-1 alert-danger rounded">${e}</li>`).join(" ");
        }
        

        let cartoona =`<div class="col-md-4 my-3 mt-3 text-white text-center">
                            <img src="${meal[0].strMealThumb}" class='w-100 mt-3'>

                            <br />

                            <h2>${meal[0].strMeal}</h2>
                        </div>
                        <div class="col-md-8 text-white text-start">
                            <h2 class="my-3">Instructions</h2>

                            <p>${meal[0].strInstructions}</p>

                            <p class="my-3"><span class="fw-bold">Area :</span> ${meal[0].strArea}</p>
                            <p class="my-3"><span class="fw-bold">Category :</span> ${meal[0].strCategory}</p>
                            <h2 class="my-3">
                                Recipes :
                            </h2>
                            <ul class="list-unstyled d-flex flex-wrap">
                                ${Recipes}
                            </ul>
                            <h2 class="my-3">
                                Tags :
                            </h2>
                            <ul class="list-unstyled d-flex flex-wrap">
                                ${tags}
                            </ul>

                            <a href="${meal[0].strSource}" style="decoration:none" target="_blank"><button class="btn btn-success" >Source</button></a>
                            <a href="${meal[0].strYoutube}"  style="decoration:none" target="_blank"><button class="btn btn-danger">Youtube</button></a>
                        </div>`;

        rowDate.innerHTML = cartoona;
    }
    //to make search with spacific FirstName
    async function searchByFirstName(name) {
        $('.loading-container').fadeIn(100);

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`);


        if (response.status == 200) {

            response = await response.json();

            $('.loading-container').fadeOut(500);
            showMeals(response.meals);
        }
    }


    ///////////////
    //to load categories
    async function categories() {

        $('.loading-container').fadeIn(100);

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);


        if (response.status == 200) {

            response = await response.json();

            $('.loading-container').fadeOut(500);

            showCategories(response.categories);
        }
    }
    // to display categories
    function showCategories(arr) {

        let cartoona = ``;
        console.log(arr);


        for (let i = 0; i < arr.length; i++) {


            cartoona += `<div class="col-md-6 col-lg-3  my-3">
                            <div onclick="filterByCategory('${arr[i].strCategory}')" class="post pointer">
                                <img src="${arr[i].strCategoryThumb}" class="w-100 rounded" alt="${arr[i].strCategory}">
                                <div class="layer d-flex flex-column align-items-center justify-content-center text-center px-1 pt-3 bg-layer position-absolute rounded">
                                    <h2>
                                        ${arr[i].strCategory}
                                    </h2>
                                    <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p></p>
                                </div>
                            </div>
                        </div> `;


        }
        $("html, body").animate({ scrollTop: 0 }, 200);
        rowDate.innerHTML = cartoona;
    }
    window.filterByCategory = filterByCategory;
    //filter By Category
    async function filterByCategory(name){

        $('.loading-container').fadeIn(100);

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);

        if (response.status == 200) {

            response = await response.json();

            $('.loading-container').fadeOut(500);

            showMeals(response.meals);
        }
    }

    //////////////// 
    //to load area
    async function area() {

        $('.loading-container').fadeIn(100);

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);


        if (response.status == 200) {

            response = await response.json();

            $('.loading-container').fadeOut(500);

            showAreas(response.meals);
        }
    }
    // to display Areas
    function showAreas(arr) {

        let cartoona = ``;
       
        for (let i = 0; i < arr.length; i++) {


            cartoona += `<div class="col-md-6 col-lg-3 text-center my-3">
                            <div onclick="filterByArea('${arr[i].strArea}')" class="post pointer">
                                <i class="fa-solid fa-city city-color fa-4x"></i>
                                <h2 class="text-white">
                                    ${arr[i].strArea}
                                </h2>
                            </div>
                        </div> `;

            $("html, body").animate({ scrollTop: 0 }, 200);
        }

        rowDate.innerHTML = cartoona;
    }
    window.filterByArea = filterByArea;
    //filter By Area
    async function filterByArea(name){

        $('.loading-container').fadeIn(100);
       
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);

        if (response.status == 200) {

            response = await response.json();

            $('.loading-container').fadeOut(500);

            console.log(response);

            showMeals(response.meals);
        }
    }

    ////////////////
    //to load ingredient
    async function ingredients() {

        $('.loading-container').fadeIn(100);

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);


        if (response.status == 200) {

            response = await response.json();

            $('.loading-container').fadeOut(500);
            
            showIngredients(response.meals);
        }
    }
    // to display ingredient
    function showIngredients(arr) {

        let cartoona = ``;
                
        for (let i = 0; i < 21; i++) {
           
            cartoona += `<div class="col-md-6 col-lg-3  my-3 text-center">
                            <div onclick="filterByIngredient('${arr[i].strIngredient}')" class="post pointer" ">
                                
                                <i class="fa-solid fa-bowl-food bowl-color fa-3x"></i>
                                <h2 class="text-white py-2">
                                    ${arr[i].strIngredient}
                                </h2>
                                <p class="text-white">
                                    ${arr[i].strDescription.split(" ").slice(0,20).join(" ")}
                                </p>
                            </div>
                        </div> `;
        }
        $("html, body").animate({ scrollTop: 0 }, 200);
        rowDate.innerHTML = cartoona;
    }
    window.filterByIngredient = filterByIngredient;
    //filter By Ingredient
    async function filterByIngredient(name){

        $('.loading-container').fadeIn(100);
       
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);

        if (response.status == 200) {

            response = await response.json();

            $('.loading-container').fadeOut(500);

            console.log(response);

            showMeals(response.meals);
        }
    }

    /////////////////
    let namefocus = false,
    emailfocus = false,
    phonefocus = false,
    agefocus = false,
    passwordfocus = false,
    repasswordfocus = false;
    let inputs; 
    let alerts;
    
    function showContactUs(){

        rowDate.innerHTML = `<div class="row ms-3">
                                 <h2 class="text-center text-white mb-5">ContacUs...</h2>
                                <div class="col-md-6 mt-3">
                                    <div class="form-group ">
                                        <input class="form-control shadow-special " onkeyup="validation()" id="name" placeholder="Enter Your Name">
                                        <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
                                            Special Characters and Numbers not allowed
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mt-3">
                                    <div class="form-group">
                                        <input onkeyup="validation()" class="form-control shadow-special" id="email" placeholder="Enter Email">
                                        <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
                                            Enter valid email. *Ex: xxx@yyy.zzz
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mt-3">
                                    <div class="form-group">
                                        <input onkeyup="validation()" class="form-control shadow-special " id="phone" placeholder="Enter phone">
                                        <div class="alert mt-1 alert-danger d-none" id="phonealert" role="alert">
                                            Enter valid Phone Number
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mt-3">
                                    <div class="form-group">
                                        <input onkeyup="validation()" class="form-control shadow-special" id="age" placeholder="Enter Age">
                                        <div class="alert mt-1 alert-danger d-none" id="agealert" role="alert">
                                            Enter valid Age
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 mt-3">
                                    <div class="form-group">
                                        <input onkeyup="validation()" class="form-control shadow-special" type="password" id="password" placeholder="Enter Password">
                                        <div class="alert mt-1 alert-danger d-none" id="passwordalert" role="alert">
                                            Enter valid password *Minimum eight characters, at least one letter and one number:*
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 my-3">
                                    <div class="form-group">
                                        <input onkeyup="validation()" class="form-control shadow-special" type="password" id="rePassword" placeholder="Enter RePassword">
                                        <div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
                                            Enter valid Repassword
                                        </div>
                                    </div>
                                </div>
                                <button class="btn btn-outline-danger col-md-2 mt-5 mx-auto">Submit</button>
                            </div> `;
    inputs = $('input');
    alerts = $('.alert'); 
    
    inputs[0].addEventListener("focus", () => {
        namefocus = true
    })
    inputs[1].addEventListener("focus", () => {
        emailfocus = true
    })
    inputs[2].addEventListener("focus", () => {
        phonefocus = true
    })
    inputs[3].addEventListener("focus", () => {
        agefocus = true
    })
    inputs[4].addEventListener("focus", () => {
        passwordfocus = true
    })
    inputs[5].addEventListener("focus", () => {
        repasswordfocus = true
    })

       
    }

    window.validation = validation;
    ///////////////////////////add validate function
    
    function validation(){
        
        if(namefocus){
            
                if(inputs[0].value.match(/^[a-zA-Z_]{1,}$/)){
                    
                    inputs.eq([0]).addClass('is-valid');
                    alerts.eq([0]).addClass('d-none');
                }
                else{
                    inputs.eq([0]).removeClass('is-valid');
                    alerts.eq([0]).removeClass('d-none');

                }
        }

        /////////////////////////////////////
        
        if(emailfocus){
            if(inputs[1].value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
            
                inputs.eq([1]).addClass('is-valid');
                alerts.eq([1]).addClass('d-none');
            }
            else{
                inputs.eq([1]).removeClass('is-valid');
                alerts.eq([1]).removeClass('d-none');
    
            } 
        }

        ////////////////////////////////////
        
        if(phonefocus){
            if(inputs[2].value.match(/^(010|011|012|015)[0-9]{8}$/)){
            
                inputs.eq([2]).addClass('is-valid');
                alerts.eq([2]).addClass('d-none');
            }
            else{
                inputs.eq([2]).removeClass('is-valid');
                alerts.eq([2]).removeClass('d-none');
    
            }
        }

        ////////////////////////////////////

        if( agefocus){
            
            if(inputs[3].value.match(/^([1-9][0-9]|100)$/)){
                
                inputs.eq([3]).addClass('is-valid');
                alerts.eq([3]).addClass('d-none');
            }
            else{
                inputs.eq([3]).removeClass('is-valid');
                alerts.eq([3]).removeClass('d-none');

            }
        }

        /////////////////////////////////////

        if(passwordfocus){
            if(inputs[4].value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)){
            
                console.log('1')
                inputs.eq([4]).addClass('is-valid');
                alerts.eq([4]).addClass('d-none');
            }
            else{
                console.log('2')
                inputs.eq([4]).removeClass('is-valid');
                alerts.eq([4]).removeClass('d-none');
    
            } 
        }

        ////////////////////////////////////////
        
        if(repasswordfocus){
            if(inputs[4].value === inputs[5].value && inputs[4].value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) )
            {
                console.log('12')
                inputs.eq([5]).addClass('is-valid');
                alerts.eq([5]).addClass('d-none');
            }
            else{
                console.log('13')
                inputs.eq([5]).removeClass('is-valid');
                alerts.eq([5]).removeClass('d-none');

            }

        }

    }


    /////////////////////////////////////////////////////////////event lisner for links

    navList.click(async (e) => {
        //to delete content in page to show spacific part
        document.getElementById('search').innerHTML = '';
        rowDate.innerHTML = '';

        // to colse nav after choose
        document.getElementById('btnToggel').innerHTML = '<i id="openNav" class="fa-solid fa-bars fa-2x"></i>';
        $('.sideNav').addClass('close').removeClass('open');
        navList.animate({ opacity: '0', paddingTop: '500px' })
        


        //to catch the affectted elment
        let element = $(e.target).attr('data-link');


        console.log(element)
        if (element == 'search') {

            document.getElementById('search').innerHTML = `<div class="col-md-6 mx-auto">
                                                                <input type="text" id='searchByName' class="form-control mx-auto bg-transparnt border-0 border-bottom  text-white rounded-0" placeholder="Search By Name">
                                                            </div >
                                                            <div class="col-md-6 mx-auto">
                                                                <input type="text"  id='searchByFirst' class="form-control  bg-transparnt border-0 border-bottom  text-white rounded-0" placeholder="Search By First Letter... "  maxlength="1">
                                                            </div>`;

            $('#searchByName').keyup(function (e) {

                search(e.target.value);

            });
            $('#searchByFirst').keyup(function (e) {
                searchByFirstName(e.target.value);
            });

        }
        else if (element == 'categories') {

            categories();

        }
        else if (element == 'area') {
            area();

        } else if (element == 'ingredients') {
            ingredients();

        } else {
            showContactUs()
        }
    })
})
