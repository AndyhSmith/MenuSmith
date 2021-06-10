//#################################################################################
// D E V    &   P R O D U C T I O N
//#################################################################################

var devMode = false

if (devMode) {
    var siteURL = "http://localhost:8000/"
} else {
    var siteURL = "https://menusmith.com/"
}


//#################################################################################
// I N I T
//#################################################################################

/**
 * Starts the Loading Process
 */
function init() {
    loadLocalStorage()
    hideTips()
    applySettings()
    applyColorScheme()
    viewRecipes()
    userAddFood()
    checkURLParams()
    showAllRecipes()
    document.getElementById("loading").style.display = "none"
}

//#################################################################################
// S T Y L E S
//#################################################################################
var csNormal = {
    backgroundColor: "white",
    textColor: "black",
    popUpBackgroundColor: "white",
    userInputs: "#eee",

    inCart:"blue",
    inPantry:"black",
    missing:"darkred",
    quantity:"#1bb444",
    selected: "#A2C0D9",

    none: "none",


    // N A V
    // nav-bar text color
    normalNavTextColor: "#111",
    // selected nav-bar text color
    selectedNavTextColor: "white",
    
    // Background color of nav button
    normalBackgroundColor: "forestgreen",  //"#999",
    
    // border bottom color
    normalColor: "4px solid rgba(0,0,0,0)",
    // border bottom active color
    // highlightColor: "4px solid #1bb444",
    highlightColor: "4px solid white",
    
    // button colors
    activeButton: "rgba(27,180,68, .3)",
    inactiveButton: "#eee",

    miniTutorial: "#eee"
}

var csDarkMode = {
    backgroundColor: "rgb(33,33,33)",
    textColor: "white",
    popUpBackgroundColor: "rgb(45,45,45)",
    userInputs: "rgb(53,53,53)",

    inCart:"rgb(179,199,255)",
    inPantry:"white",
    missing:"pink",
    quantity:"#1bb444",
    selected: "#A2C0D9",

    none: "none",


    // N A V
    // nav-bar text color
    normalNavTextColor: "rgb(100,100,100)",
    // selected nav-bar text color
    selectedNavTextColor: "white",
    
    // Background color of nav button
    normalBackgroundColor: "rgb(18,18,18)",
    
    // border bottom color
    normalColor: "4px solid rgba(0,0,0,0)",
    // border bottom active color
    highlightColor: "4px solid #1bb444",
    
    // button colors
    activeButton: "rgba(27,180,68, .3)",
    inactiveButton: "rgb(75,75,75)",

    miniTutorial: "rgb(50,50,50)"
}

// Sets Starting Style
var cs = csNormal
document.getElementById("background-top-bar").style.backgroundColor = cs.normalBackgroundColor

/**
 * Changes HTML Elements to Match Color Scheme
 */
function applyColorScheme() {
    document.getElementsByTagName("body")[0].style.backgroundColor = cs.backgroundColor
    document.getElementsByTagName("body")[0].style.color = cs.textColor
    document.getElementById("category").style.backgroundColor = cs.popUpBackgroundColor
    document.getElementById("share").style.backgroundColor = cs.popUpBackgroundColor
    document.getElementById("background-top-bar").style.backgroundColor = cs.normalBackgroundColor

    // Custom Recipes Warnings
    document.getElementById("custom-recipe-name-warning").style.color = cs.missing
    document.getElementById("custom-recipe-name-warning2").style.color = cs.missing
    document.getElementById("image-link-error").style.color = cs.missing

    // Input Fields
    let list = document.getElementsByTagName("input");
    for (let index in list) {
        try {
            list[index].style.backgroundColor = cs.userInputs
        } catch {

        } 
    }

    // Textarea
    list = document.getElementsByTagName("textarea");
    for (let index in list) {
        try {
            list[index].style.backgroundColor = cs.userInputs
        } catch {

        } 
    }

    // Nav Buttons
    list = document.getElementsByClassName("view-page-button");
    for (let index in list) {
        try {
            list[index].style.backgroundColor = cs.normalBackgroundColor
            list[index].style.color = cs.normalNavTextColor
        } catch {

        } 
    }
    if (previousPage == "recipes") {
        document.getElementById("view-recipe").style.color = cs.selectedNavTextColor
        document.getElementById("view-recipe").style.borderBottom = cs.highlightColor
    } else if (previousPage == "pantry") {
        document.getElementById("view-pantry").style.color = cs.selectedNavTextColor
        document.getElementById("view-pantry").style.borderBottom = cs.highlightColor
    } else if (previousPage == "shoppingList") {
        document.getElementById("view-shopping-list").style.color = cs.selectedNavTextColor
        document.getElementById("view-shopping-list").style.borderBottom = cs.highlightColor
    }



    // Buttons
    list = document.getElementsByTagName("button");
    for (let index in list) {
        try {
            list[index].style.backgroundColor = cs.inactiveButton
            list[index].style.color = cs.textColor
        } catch {

        } 
    }

    // Mini Tutorials
    list = document.getElementsByClassName("instructions");
    for (let index in list) {
        try {
            list[index].style.backgroundColor = cs.miniTutorial
            list[index].style.color = cs.textColor
        } catch {

        } 
    }
    document.getElementById("pantry-color").style.color = cs.inPantry
    document.getElementById("missing-color").style.color = cs.missing
    document.getElementById("shopping-list-color").style.color = cs.inCart

    // All & Available Buttons
    if (showType == "Available") {
        showAvailableRecipes()
    } else if (showType == "All") {
        showAllRecipes()
    } 
    
    if (!filterFavoriteRecipesBool) {
        filterFavoriteRecipesBool = false
        document.getElementById("star-filled").innerHTML = "<i class='far fa-star'></i>"
        document.getElementById("star-filled-button").style.backgroundColor = cs.inactiveButton
    } else {
        filterFavoriteRecipesBool = true;
        document.getElementById("star-filled").innerHTML = "<i class='fas fa-star'></i>"
        document.getElementById("star-filled-button").style.backgroundColor = cs.activeButton
    }

    if (filtering) {
        document.getElementById("filter-recipe-input").style.display = "inline-block"
        document.getElementById("filter-recipe-input").value = ""
        document.getElementById("show-filter").style.backgroundColor = cs.activeButton
    } else {
        document.getElementById("filter-recipe-input").style.display = "none"
        document.getElementById("show-filter").style.backgroundColor = cs.inactiveButton
    }
}

//#################################################################################
// S E T T I N G S
//#################################################################################

/**
 * Toggles Between DarkMode
 */
function darkModeSwitch() {
    if (settings.darkMode) {
        settings.darkMode = false
        cs = csNormal
    } else {
        settings.darkMode = true
        cs = csDarkMode
    }
    applyColorScheme() 
    localStorage.setItem('settings', JSON.stringify(settings));
}

/**
 * Toggles Showing Photos in Recipes and Hiding Photos
 */
function dataSaverSwitch() {
    if (settings.dataSaver) {
        settings.dataSaver = false
    } else {
        settings.dataSaver = true
    }
    localStorage.setItem('settings', JSON.stringify(settings));
}

/**
 * Applies Settings
 */
function applySettings() {
    if (settings.darkMode) {
        cs = csDarkMode
        applyColorScheme()
        document.getElementById("dark-mode-setting").checked = true;
    }

    if (settings.dataSaver) {
        document.getElementById("data-saver-setting").checked = true;
    }
}

//#################################################################################
// T O A S T S
//#################################################################################

/**
 * A Wrapper Function for Making Toasts
 * @param {string} textMessage 
 * @param {successToast} chosenOption 
 */
function toast(textMessage, chosenOption) {
    try {
        let toastCopy = chosenOption
        toastCopy.message = textMessage
        SnackBar(toastCopy)
    } catch {
        console.log("Toaster is Broken!")
    }
    
}

// Success Toast
const successToast = {
	message:"Test Message",
    timeout: 2000,
    status: "success",

};


//#################################################################################
// S O R T
//#################################################################################

/**
 * Sorts a List of Objects Alphabetically by Each Object's Name Parameter.
 * @param {{name: string}[]} _list 
 */
function sortAlphabetically(_list) {
    _list.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
}

/**
 * Used to Sort Shopping List Categories. Checks if Color Assigned Then Sort Alphabetically.
 * @param {{color: string}[]} _list 
 */
function sortColor(_list) {
    let textA = null
    let textB = null
    _list.sort(function(a, b) {
        if (a.color) {
            textA = a.color.toUpperCase();
        } else {
            textA = "grey"
        }

        if (b.color) {
            textB = b.color.toUpperCase();
        } else {
            textB = "grey"
        }
        
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
}

/**
 * Pinned Recipes are Put First
 * @param {{name: string}[]} _list 
 */
function sortPinned(_list) {
    _list.sort(function(a, b) {
        let test1 = pinnedRecipes.includes(a.name)
        if (test1) {
            return -1
        } 
        return 1
    });
}


//#################################################################################
// L O C A L   S T O R A G E 
//#################################################################################


var pantry = []
if (!localStorage.pantry) {
    localStorage.pantry = []
}

var shoppingList = []
if (!localStorage.shoppingList) {
    localStorage.shoppingList = []
}

var recipeFavorites = []
if (!localStorage.recipeFavorites) {
    localStorage.recipeFavorites = []
}

var pinnedRecipes = []
if (!localStorage.pinnedRecipes) {
    localStorage.pinnedRecipes = []
}

var customIngredients = []
if (!localStorage.customIngredients) {
    localStorage.customIngredients = []
}

var customRecipes = []
if (!localStorage.customRecipes) {
    localStorage.customRecipes = []
}

var hiddenTips = []
if (!localStorage.hiddenTips) {
    localStorage.hiddenTips = []
}

var settings = {
    darkMode: false,
    dataSaver: false,
}
if (!localStorage.settings) {
    localStorage.settings = JSON.stringify({
        darkMode: false,
        dataSaver: false
    })
}


/**
 * Retrieves Data From LocalStorage
 */
function loadLocalStorage() {
    // Load Panty
    let localStorageContent = localStorage.getItem('pantry')
    if (localStorageContent != '') {
        pantry = JSON.parse(localStorageContent)
    }
    else {
        // Initial Pantry
        pantry = [
            // {"name":"ground beef","quantity":1},
            // {"name":"baking powder","quantity":1},
            // {"name":"butter","quantity":1},
            // {"name":"egg","quantity":4},
            // {"name":"flour","quantity":1},
            // {"name":"milk","quantity":1},
            // {"name":"oil","quantity":1},
            // {"name":"salt","quantity":1},
            // {"name":"sugar","quantity":1}
        ]
    }

    // Load  Shopping List
    let localShoppingListStorage = localStorage.getItem('shoppingList')
    if (localShoppingListStorage != '') {
        shoppingList = JSON.parse(localShoppingListStorage)
    }
    else {
        // Initial Shopping List
        shoppingList = [
            // {"name":"carrots","quantity":1},
            // {"name":"onion","quantity":1},
            // {"name":"rice","quantity":1}
        ]
    }

    // Opening Tutorial
    let localStorageFirstTime = localStorage.getItem('firstTime')
    if (localStorageFirstTime != '') {
        if (localStorageFirstTime == "true") {
            skipTutorial()
        }
        else {
            loadStartPage()
        }
    }

    // Recipes Marked as Favorite: ["Crepes (fancy)", "Autumn Soup"]
    let recipeFavoriteLocalData = localStorage.getItem('recipeFavorites')
    recipeFavorites = []
    if (recipeFavoriteLocalData != '') {
        recipeFavorites = JSON.parse(recipeFavoriteLocalData)
    }

    // Pinned Recipes
    let pinnedRecipesLocalData = localStorage.getItem('pinnedRecipes')
    pinnedRecipes = []
    if (pinnedRecipesLocalData != '') {
        pinnedRecipes = JSON.parse(pinnedRecipesLocalData)
    }


    // Custom Ingredients
    let customIngredientsLocalData = localStorage.getItem('customIngredients') 
    if (customIngredientsLocalData != '') {
        customIngredients = JSON.parse(customIngredientsLocalData)
        ingredients = ingredients.concat(customIngredients)
    }

    // Custom Recipes
    let customRecipesLocalData = localStorage.getItem('customRecipes') 
    if (customRecipesLocalData != '') {
        customRecipes = JSON.parse(customRecipesLocalData)
        recipes = recipes.concat(customRecipes)
    }

    // Hidden Tips
    let hiddenTipsLocalData = localStorage.getItem('hiddenTips') 
    if (hiddenTipsLocalData != '') {
        hiddenTips = JSON.parse(hiddenTipsLocalData)
    }
    

    // Load Settings
    // localStorage.setItem('settings', JSON.stringify({}));
    let settingsLocalData = localStorage.getItem('settings') 
    if (settingsLocalData != '') {
        settings = JSON.parse(settingsLocalData)
    }
}

/**
 * Clears LocalStorage, Prompts User for Confirmation
 */
function clearLocalSavedData() {
    if (confirm('Are you sure you want to clear all your data? This will reset the website and you will loose all your custom data including your custom recipes.')) {
        localStorage.clear();
        location.reload();
    } 
}



//#################################################################################
// S A V E   F I L E S
//#################################################################################

/**
 * Downloads A File
 * @param {string} filename 
 * @param {string} text 
 * Not Written By Me
 */
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  /**
   * Downloads All Custom Data
   */
function exportAllCustomData() {
    let customDataObject = {
        cR: customRecipes,
        cI: customIngredients,
        sL: shoppingList,
        p: pantry,
    }
    download("menusmith.backup", JSON.stringify(customDataObject));
}

//#################################################################################
// U R L   P A R A M S
//#################################################################################

/**
 * Checks URL Params for: 
 * 
 * - Shopping List: "sl"
 * - Recipe: "r"
 */
function checkURLParams() {
    let params = new URLSearchParams(location.search);
    //Shopping List
    let sl = params.get("sl")
    if (sl != null) {
        processURLShoppingList(sl)
    }

    // Recipe
    let r = params.get("r")
    if (r != null) {
        processURLRecipe(r)
    }

    // Clear URL Params
    window.history.replaceState({}, document.title, "/" + ""); 
}

/**
 * Process Shared Shopping List
 * @param {string} sl 
 */
function processURLShoppingList(sl) {
    alert("Importing Shopping List. Make sure you do not have Menu Smith open in another tab.")
    sl = numbersToIngredients(JSON.parse(parseWebSafeString("[" + sl + "]"))) 
    for (let i in sl) {
        if (i % 2) {
            let newIngredient = {
                name:sl[i-1],
                quantity:sl[i],
                color:"imported"
            }
            if(checkIfIngredientExists(newIngredient.name) == -1) {
                addCustomIngredient(newIngredient.name)
            }
            shoppingList.push(newIngredient)
        }
    }
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));    
    viewShoppingList()
    toast("Loaded Shopping List", successToast);
}

/**
 * Process Shared Shopping List
 * @param {*} r 
 */
function processURLRecipe(r) {
    alert("Importing recipe. Make sure you do not have Menu Smith open in another tab.")
    skipTutorial()
    let aString = parseWebSafeString(r)
    let newRecipe = JSON.parse(aString)
    addAndValidateCustomRecipe(newRecipe)
}

/**
 * Parses a Link Safe String Into Original Version
 * @param {string} r 
 * @returns Parsed Values
 */
function parseWebSafeString(r) {
    r = r.replace(/a~/g, " ")
    r = r.replace(/b~/g, ",")
    r = r.replace(/c~/g, "\"")
    r = r.replace(/d~/g, "{")
    r = r.replace(/e~/g, "}")
    r = r.replace(/f~/g, "[")
    r = r.replace(/g~/g, "]")
    r = r.replace(/h~/g, ":")
    r = r.replace(/i~/g, "/")
    r = r.replace(/j~/g, "\'")
    r = r.replace(/k~/g, "?")
    r = r.replace(/l~/g, "&")
    r = r.replace(/m~/g, "#")
    r = r.replace(/n~/g, "!")
    r = r.replace(/o~/g, "@")
    r = r.replace(/p~/g, "$")
    r = r.replace(/q~/g, "%")
    r = r.replace(/r~/g, "^")
    r = r.replace(/s~/g, "*")
    r = r.replace(/t~/g, "(")
    r = r.replace(/u~/g, ")")
    r = r.replace(/v~/g, "+")
    r = r.replace(/w~/g, "=")
    r = r.replace(/x~/g, "<")
    r = r.replace(/y~/g, ">")
    r = r.replace(/z~/g, "|")
    r = r.replace(/A~/g, ";")

    r = r.replace(/Z~/g, "~")
    return r
}

/**
 * Converts an Unsafe String Into a Link Safe String
 * @param {string} str 
 * @returns 
 */
function convertToWebSafeString(str) {
    str = str.replace(/~/g, "Z~")

    str = str.replace(/ /g, "a~")
    str = str.replace(/,/g, "b~")
    str = str.replace(/"/g, "c~")
    str = str.replace(/{/g, "d~")
    str = str.replace(/}/g, "e~")
    str = str.replace(/\[/g, "f~")
    str = str.replace(/\]/g, "g~")
    str = str.replace(/:/g, "h~")
    str = str.replace(/\//g, "i~")
    str = str.replace(/'/g, "j~")
    str = str.replace(/\?/g, "k~")
    str = str.replace(/&/g, "l~")
    str = str.replace(/#/g, "m~")
    str = str.replace(/!/g, "n~")
    str = str.replace(/@/g, "o~")
    str = str.replace(/\$/g, "p~")
    str = str.replace(/%/g, "q~")
    str = str.replace(/\^/g, "r~")
    str = str.replace(/\*/g, "s~")
    str = str.replace(/\(/g, "t~")
    str = str.replace(/\)/g, "u~")
    str = str.replace(/\+/g, "v~")
    str = str.replace(/=/g, "w~")
    str = str.replace(/</g, "x~")
    str = str.replace(/>/g, "y~")
    str = str.replace(/\|/g, "z~")
    str = str.replace(/;/g, "A~")
    str = str.replace(/[^a-zA-Z0-9-._~]/g, "")
    return str
}

// Testing Web Safe Font Conversion
// console.log(convertToWebSafeString("bad ~hello World! 2021 !@#$%^&*()_+-={}[]:;<>,.|/"))
// console.log(parseWebSafeString(convertToWebSafeString("bad ~hello World! 2021 !@#$%^&*()_+-={}[]:;<>,.|/")))
// console.log("bad ~hello World! 2021 !@#$%^&*()_+-={}[]:;<>,.|/")

//#################################################################################
// I N G R E D I E N T   A D D E R
//#################################################################################

// pantry || shoppingList
var ingredientWhere = "pantry"

/**
 * Add an Ingredient Directly to Shopping List or Pantry
 */
function userAddFood() { 
    // Get Input
    userInput = document.getElementById("add-food").value.toLowerCase()

    // Set Title
    if (ingredientWhere == "pantry") {
        document.getElementById("add-ingredient-title").innerHTML = "<span class='go-back' onclick='goToPreviousPage()'><i class='fas fa-arrow-left back-arrow' ></i> Add Ingredient to Pantry (" + ingredients.length + ")</span>"
    } else if (ingredientWhere == "shoppingList") {
        document.getElementById("add-ingredient-title").innerHTML = "<span class='go-back' onclick='goToPreviousPage()'><i class='fas fa-arrow-left back-arrow' onclick='goToPreviousPage()'></i> Add Ingredient to Shopping List (" + ingredients.length + ")</span>"
    }
    

    ingredientSearchResults = ""
    let counter = 0
    for (i in ingredients) { 
        // If Match
        if ((userInput == ingredients[i].name.substring(0, userInput.length)) && (counter <= 400)) { // if input matches start of ingredient
            ingredientSearchResults += "<div class='ingredient' onclick='"
            if (ingredientWhere == "pantry") {
                ingredientSearchResults += "addToPantry"
            } else if (ingredientWhere == "shoppingList") {
                ingredientSearchResults += "addToShoppingListExtra"
            }
            
            ingredientSearchResults += "(" + i + ")'><span>" + ingredients[i].name 
            let foundInLocation = false
            let locationCount = 0

            if (ingredientWhere == "pantry") {
                for (p in pantry) { // add quantity form pantry
                    if(pantry[p].name == ingredients[i].name) {
                        foundInLocation = true
                        locationCount = pantry[p].quantity
                        break;
                    }
                }
            } else if (ingredientWhere == "shoppingList") {
                for (p in shoppingList) { // add quantity form pantry
                    if(shoppingList[p].name == ingredients[i].name) {
                        foundInLocation = true
                        locationCount = shoppingList[p].quantity
                        break;
                    }
                }
            }
            
            if (foundInLocation) {
                ingredientSearchResults += "<span style='color:" + cs.quantity + "; font-weight: bold;'>" + " x " + locationCount + "</span></span></div>"; 
            }
            ingredientSearchResults += "</div>";
            counter += 1;
        }
    }
    
    // No Results => Add Custom Ingredient Button
    if (ingredientSearchResults == '') {
        ingredientSearchResults += '<button id="add-custom-ingredient-button" onclick="'
        if (ingredientWhere == "pantry") {
            ingredientSearchResults += 'customIngredientToPantry()'
        } else if (ingredientWhere == "shoppingList") {
            ingredientSearchResults += 'customIngredientToShoppingList()'
        }
        ingredientSearchResults += '">Add as Custom Ingredient</button>'      
    }

    document.getElementById("ingredient-search-results").innerHTML = ingredientSearchResults;
}

/**
 * Adds a Custom Ingredient To Pantry
 * Called From Ingredient Search userAddFood().
 */
function customIngredientToPantry() {
    let customIngredientName = document.getElementById("add-food").value
    addCustomIngredient(customIngredientName)
    addToPantry(getIngredientID(customIngredientName))
    toast(customIngredientName + " Added", successToast);
}

/**
 * Adds a Custom Ingredient To Shopping List
 * Called From Ingredient Search userAddFood().
 */
function customIngredientToShoppingList() {
    let customIngredientName = document.getElementById("add-food").value.toLowerCase()
    addCustomIngredient(customIngredientName)
    addToShoppingListExtra(getIngredientID(customIngredientName))
    toast(customIngredientName + " Added", successToast);
}

/**
 * Clears Ingredient Adder Search
 */
function clearIngredientSearch() {
    document.getElementById("add-food").value = ""
    userAddFood()
}


//#################################################################################
// I N G R E D I E N T S
//#################################################################################

/**
 * Adds a Custom Ingredient
 * @param {string} customIngredientName 
 */
function addCustomIngredient(customIngredientName) {
    customIngredientName = customIngredientName.toLowerCase()
    if (checkIfIngredientExists(customIngredientName) == -1) {
        newIngredient = {name:customIngredientName}
        customIngredients.push(newIngredient)
        ingredients.push(newIngredient)
        localStorage.setItem('customIngredients', JSON.stringify(customIngredients));
    }
}

/**
 * Given Ingredient Name Return IngredientID
 * @param {string} _name 
 * @returns 
 */
function getIngredientID(_name) {
    for (let index in ingredients) {
        if (ingredients[index].name == _name) {
            return index
        }
    }
    return -1
}

 /**
  * Check if Ingredient Exists
  * @param {string} ingredientName 
  * @returns Not Found: -1, Found: Index {int}
  */
function checkIfIngredientExists(ingredientName) {
    for (let index in ingredients) {
        if (ingredientName == ingredients[index].name) {
            return index;
        }
    }
    return -1;
}

//#################################################################################
//#################################################################################
//#################################################################################
// S H O P P I N G   L I S T   
//#################################################################################
//#################################################################################
//#################################################################################

//#################################################################################
// S H O P P I N G   L I S T   C A T E G O R Y   D O M 
//#################################################################################

var ingredientIDSelectedDot = null;
/**
 * Shows Ingredient Category DOM
 * @param {int} ingredientIndex 
 */
function clickedACategoryDot(ingredientIndex) {
    ingredientIDSelectedDot = ingredientIndex;

    document.getElementById("category").style.display = "inline";
    document.getElementById("dim-background").style.display = "inline";
    document.getElementById("category-header").innerHTML = ingredients[ingredientIDSelectedDot].name;

    // Check If Pinned
    for (let index in shoppingList) {
        if (shoppingList[index].name == ingredients[ingredientIDSelectedDot].name) {
            if(shoppingList[index].pin) {
                if (shoppingList[index].pin == "t") {
                    document.getElementById("ingredient-pin").checked = true;
                } else {
                    document.getElementById("ingredient-pin").checked = false;
                }
            } else {
                document.getElementById("ingredient-pin").checked = false;
            }
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            break;
        }
    }
}

var userSelectedColor = null;
/**
 * Sets Color of Ingredient 
 * @param {string} chosen_color 
 */
function selectColor(chosen_color) {
    userSelectedColor = chosen_color;
    // set color of shopping list item
    for (let aIngredient in shoppingList) {
        if (shoppingList[aIngredient].name == ingredients[ingredientIDSelectedDot].name) {
            shoppingList[aIngredient].color = chosen_color
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            break;
        }
    }
    closeCategory();
}

/**
 * Pin an Ingredient to Shopping List
 */
function pinToShoppingListSwitch() {
    // pin shopping list items
    for (let aIngredient in shoppingList) {
        if (shoppingList[aIngredient].name == ingredients[ingredientIDSelectedDot].name) {
            if (shoppingList[aIngredient].pin) {
                if (shoppingList[aIngredient].pin == "f") {
                    shoppingList[aIngredient].pin = "t"
                } else {
                    shoppingList[aIngredient].pin = "f"
                }       
            } else {
                shoppingList[aIngredient].pin = "t"
            } 
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            break
        }
    }
    updateShoppingListDOM()
}

/**
 * Closes Category DOM
 */
function closeCategory() {
    document.getElementById("category").style.display = "none";
    document.getElementById("dim-background").style.display = "none";
    updateShoppingListDOM()
}

//#################################################################################
// S H O P P I N G   L I S T   H E L P E R S
//#################################################################################

/**
 * Check if Ingredient in Shopping List
 * @param {string} itemName 
 * @returns Ingredient Index | false
 */
function checkIfInShoppingList(itemName) {
    for (let index in shoppingList) { // check if in shoppingList
        if (itemName == shoppingList[index].name) {
            return index
        }
    }
    return false
}


/**
 * Remove Ingredient From ShoppingList Using Shopping List ID
 * @param {int} itemID 
 */
function removeFromShoppingList(itemID) {
    let itemName = shoppingList[itemID].name
    if (shoppingList[itemID].quantity <= 1) {
        shoppingList.splice(itemID, 1)
    }
    else {
        shoppingList[itemID].quantity -= 1;
    }
    
    updateShoppingListDOM()
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    toast(itemName + " Removed", successToast)
}


/**
 * Remove From Shopping List With Name
 * @param {string} ingredientName 
 */
function removeFromShoppingListByName(ingredientName) {
    let shoppingListID = checkIfInShoppingList(ingredientName)

    if (shoppingList[shoppingListID].quantity == 1) {
        shoppingList.splice(shoppingListID, 1)
    }
    else {
        shoppingList[shoppingListID].quantity -= 1;
    }

    selectRecipeDOM(currentRecipe)
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

/**
 * Empty Shopping List With User Confirmation
 */
function emptyShoppingList() {
    if (confirm('Are you sure you want to remove everything from your shopping list?')) {
        shoppingList = []
        updateShoppingListDOM()
    }  
}

/**
 * Move Entire Shopping List to Pantry
 */
function shoppingListToPantry() {
    // Add To Pantry
    for (let i in shoppingList) {
        let ingredientID = getIngredientID(shoppingList[i].name)
        
        if (shoppingList[i].quantity) { 
            for (let step = 0; step < shoppingList[i].quantity; step++) {
                addToPantry(ingredientID)
            }
        }
    }

    // Remove From Shopping List
    for (let i = 0; i < shoppingList.length; i++) {
        // Check if pinned
        if (shoppingList[i].pin) {
            if (shoppingList[i].pin == "f") {
                shoppingList.splice(i, 1)  
                i -= 1
            }
        } else {
            shoppingList.splice(i, 1) 
            i -= 1
        }
    }
 
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    localStorage.setItem('pantry', JSON.stringify(pantry));
    updateShoppingListDOM()
    toast("Shopping List Moved to Pantry", successToast);
}

/**
 * Moves an Ingredient from the Shopping List to the Pantry
 * @param {int} shoppingListID 
 */
 function ingredientFromShoppingListToPantry(shoppingListID) {
    for (let z = 0; z < shoppingList[shoppingListID].quantity; z++) {
        addToPantry(getIngredientID(shoppingList[shoppingListID].name))
    }

    // Check if pinned
    if (shoppingList[shoppingListID].pin) {
        if (shoppingList[shoppingListID].pin == "f") {
            shoppingList.splice(shoppingListID, 1)  
        }
    } else {
        shoppingList.splice(shoppingListID, 1)  
    }
      
    updateShoppingListDOM() 
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    localStorage.setItem('pantry', JSON.stringify(pantry));
    toast(shoppingList[shoppingListID].name + " Added to Pantry", successToast)
}


/**
 * Add an Ingredient to Shopping List With IngredientID
 * @param {int} ingredientID 
 */
function addToShoppingListExtra(ingredientID) {
    addToShoppingList(ingredientID)
    updateShoppingListDOM()
    userAddFood()
}

function addToShoppingListFromRecipe(ingredientID) {
    addToShoppingList(ingredientID)
    selectRecipeDOM(currentRecipe)
}

function addToShoppingList(ingredientID) {
    itemToAdd = ingredients[ingredientID]

    // If Exists Add Quantity
    let itemFound = false;
    for (i in shoppingList) { 
        if (itemToAdd.name == shoppingList[i].name) {
            shoppingList[i].quantity += 1
            itemFound = true;
            break;
        }
    }

    // If Doesn't Exist Add New Item to Shopping List
    if (!itemFound) {
        itemToAdd.quantity = 1
        shoppingList.push(itemToAdd)
    }

    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    localStorage.setItem('pantry', JSON.stringify(pantry));
}

//#################################################################################
// S H O P P I N G   L I S T   D O M 
//#################################################################################

/**
 * Update Shopping List DOM
 */
function updateShoppingListDOM() {
    
    sortAlphabetically(shoppingList);
    sortColor(shoppingList);

    let shoppingListItemCounter = 0;
    let shoppingListContents = "";
    
    for (let i in shoppingList) {
        shoppingListContents += "<div class='ingredient' tabindex='0'><span>" 
        
        // Is Pinned
        if (shoppingList[i].pin) {
            if (shoppingList[i].pin == "t") {
                shoppingListContents += "<i class='fas fa-thumbtack recipe-pin'></i>"
            }
        }
        
        // Name & Quantity
        shoppingListContents += shoppingList[i].name + " <span style='color:" + cs.quantity + "; font-weight: bold;'>"
        shoppingListItemCounter += shoppingList[i].quantity
        if (shoppingList[i].quantity > 1) {
            
            shoppingListContents += "<span style='white-space: nowrap;'>x " + shoppingList[i].quantity + "</span>"  
        }
        shoppingListContents += "</span></span><br>";
 
        // Function Buttons
        shoppingListContents += "<span style='display:flex;flex-direction: row;align-items: center;justify-content: center; min-width: 140px;'>"
        shoppingListContents += "<span class='add-subtract' ><span onclick='addToShoppingListExtra(" + getIngredientID(shoppingList[i].name) + ")'><i class='fas fa-plus a-option'></i></span>"
        shoppingListContents += "<span onclick='removeFromShoppingList(" + i + ")'><i class='fas fa-minus a-option'></i></span>"
        shoppingListContents += "<span onclick='ingredientFromShoppingListToPantry(" + i + ")'><i class='fas fa-carrot a-option'></i></span></span><div class='a-dot c-"
        
        // Category Color
        if (shoppingList[i].color) {
            shoppingListContents += shoppingList[i].color
        } else {
            shoppingListContents += "grey";
        }
        shoppingListContents += "' onclick='clickedACategoryDot(" + getIngredientID(shoppingList[i].name) + ")'></div></span></div>";
    }

    // Shopping Cart Footer
    if (shoppingList.length == 0) {
        shoppingListContents = "You have nothing in your shopping List.";
    } else {
        shoppingListContents += "<button onclick='emptyShoppingList()'>Delete Contents</button>";
    }

    // Apply DOM
    document.getElementById("shopping-list-title").innerHTML = "Shopping List (" + shoppingListItemCounter + ")";
    document.getElementById("shopping-list-contents").innerHTML = shoppingListContents;
    
}

//#################################################################################
//#################################################################################
//#################################################################################
// P A N T R Y  
//#################################################################################
//#################################################################################
//#################################################################################

//#################################################################################
// P A N T R Y   H E L P E R S
//#################################################################################

/**
 * Check if Ingredient in Pantry
 * @param {string} itemName 
 * @returns Ingredient Index | false
 */
function checkIfInPantry(itemName) {
    for (let index in pantry) { // check if in pantry
        if (itemName == pantry[index].name) {
            return index;
        }
    }
    return false
}

/**
 * Remove an Ingredient From Pantry With PantryID
 * @param {int} pantryID 
 */
function removeFromPantry(pantryID) {
    if (pantry[pantryID].quantity == 1) {
        pantry.splice(pantryID, 1)
    }
    else {
        pantry[pantryID].quantity -= 1;
    }
    updatePantryDOM()
    localStorage.setItem('pantry', JSON.stringify(pantry));
}

/**
 * Remove an Ingredient From Pantry With PantryID
 * @param {string} inagredientName 
 */
function removeFromPantryByName(inagredientName) {
    let itemPantryID = checkIfInPantry(inagredientName)
    if (pantry[itemPantryID].quantity == 1) {
        pantry.splice(itemPantryID, 1)
    }
    else {
        pantry[itemPantryID].quantity -= 1;
    }
    selectRecipeDOM(currentRecipe)
    localStorage.setItem('pantry', JSON.stringify(pantry));
}

/**
 * Empty Pantry If User Confirms
 */
function emptyPantry() {
    if (confirm('Are you sure that you want to remove everything from your pantry?')) {
        pantry = []
        updatePantryDOM()
    } 
}

/**
 * Add Ingredient to Pantry Using IngredientID
 * @param {*} ingredientID 
 */
function addToPantry(ingredientID) {
    itemToAdd = ingredients[ingredientID]
    
    let itemFound = false;
    for (i in pantry) { 
        if (itemToAdd.name == pantry[i].name) {
            pantry[i].quantity += 1
            itemFound = true;
            break;
        }
    }
    if (!itemFound) {
        itemToAdd.quantity = 1
        pantry.push(itemToAdd)
    }
    sortAlphabetically(pantry)
    updatePantryDOM()
    userAddFood()
}



//#################################################################################
// P A N T R Y   D O M 
//#################################################################################

/**
 * Update the Pantry DOM
 */
function updatePantryDOM() {
    let pantryItemCounter = 0
    
    pantryContents = ""
    for (let i in pantry) {
        pantryContents += "<div class='ingredient' tabindex='0'><span>" + pantry[i].name + " <span style='color:" + cs.quantity + "; font-weight: bold;'>"
        pantryItemCounter += pantry[i].quantity
        if (pantry[i].quantity > 1) {
            pantryContents += "x " + pantry[i].quantity  
        }
        pantryContents += "</span></span>";
        pantryContents += "<span class='add-subtract'><span onclick='addToPantry(" + getIngredientID(pantry[i].name) + ")'><i class='fas fa-plus a-option'></i></span><span onclick='removeFromPantry(" + i + ")'><i class='fas fa-minus a-option'></i></span></span></div>"
    }

    if (pantry.length == 0) {
        pantryContents = "You have nothing in your pantry."
    } else {
        pantryContents += "<button onclick='emptyPantry()'>Delete Contents</button>"
    }
    document.getElementById("pantry-contents").innerHTML = pantryContents;
    document.getElementById("pantry-title").innerHTML = "Pantry (" + pantryItemCounter + ")"
    localStorage.setItem('pantry', JSON.stringify(pantry));
}

//#################################################################################
//#################################################################################
//#################################################################################
// R E C I P E    L I S T
//#################################################################################
//#################################################################################
//#################################################################################

//#################################################################################
// R E C I P E   L I S T   D O M
//#################################################################################

// Available | All
var showType = "Available";

/**
 * Update Recipe List DOM
 */
function updateRecipeListDOM() {
    let availableRecipes = ""
    let userFilter = null
    let totalRecipeCount = 0
    let availableRecipeCount = 0
    sortAlphabetically(recipes)
    sortPinned(recipes)

    let filterWords = []
    if (filtering) {
        userFilter = document.getElementById("filter-recipe-input").value.toLowerCase()
        filterWords = userFilter.split(' ')
        filterWords.sort(function(a, b){
            return b.length - a.length;
        });
    }
    
    
    for (let r in recipes) { 
        // Filter Favorites
        let filterFavorites = true
        if (filterFavoriteRecipesBool) {
            if (!recipeFavorites.includes(recipes[parseInt(r)].name)) {
                filterFavorites = false
            }
        }


        let recipeIngredients = recipes[r].ingredients
        let missingIngredient = false;
        for (let i in recipeIngredients) { // check if recipe ingredient in pantry       
            let ingredientFound = false;
            for (p in pantry) {
                if (recipeIngredients[i] == pantry[p].name) {      
                    ingredientFound = true;
                    break;
                }
            }
            if (ingredientFound == false) {
                missingIngredient = true;
                break;
            }
        }

        let matchesFilter = true
        // check if recipe equals filter
        if (filtering && ((userFilter != "") || (filterWords.length > 0))) {
            let listOfAllFilterables = [] 
            for (tag in recipes[r].tags) { // tags
                listOfAllFilterables.push(recipes[r].tags[tag])
            }
            listOfAllFilterables = listOfAllFilterables.concat(recipes[r].name.split(" ")) // title
            for (aIngredient in recipes[r].ingredients){
                listOfAllFilterables.push(recipes[r].ingredients[aIngredient])
            }


            matchesFilter = true
            for (i_2 in filterWords) {
                let copyList = listOfAllFilterables
                for (searchableWordIndex in copyList) { // trim list
                    copyList[searchableWordIndex] = copyList[searchableWordIndex].toLowerCase()
                    copyList[searchableWordIndex] = copyList[searchableWordIndex].substring(0, filterWords[i_2].length)
                }
                let checkIfFound = copyList.includes(filterWords[i_2])
                if(!checkIfFound) {
                    matchesFilter = false
                }
            } 
        }


        // all ingredients
        totalRecipeCount += 1
        if (!missingIngredient && matchesFilter && filterFavorites) {
            availableRecipes += "<div class='ingredient' onclick='selectRecipeDOM(" + r + ")'><span>" 
            
            // pin 
            if (pinnedRecipes.includes(recipes[parseInt(r)].name)) {
                availableRecipes += " <i class='fas fa-thumbtack recipe-pin'></i> "
            }
            availableRecipes += recipes[r].name 
            // favorite
            if (recipeFavorites.includes(recipes[parseInt(r)].name)) {
                availableRecipes += " <i class='fas fa-star'></i>"
            }
            
            availableRecipes += "</span></div>"
            availableRecipeCount += 1
        } 
        else if ((showType == "All") && matchesFilter && filterFavorites) {
            availableRecipes += "<div class='ingredient' onclick='selectRecipeDOM(" + r + ")' style='color:" + cs.missing + ";'><span>"
            
            // pin 
            if (pinnedRecipes.includes(recipes[parseInt(r)].name)) {
                availableRecipes += " <i class='fas fa-thumbtack recipe-pin'></i> "
            }
            availableRecipes += recipes[r].name 
            // favorite
            if (recipeFavorites.includes(recipes[parseInt(r)].name)) {
                availableRecipes += " <i class='fas fa-star'></i>"
            }
            
            availableRecipes += "</span></div>"
        }
    }

    if (availableRecipeCount == 0) {
        availableRecipes += "<div class='ingredient'> No available recipes. Please add to your pantry. </div>"      
    }

    if ((availableRecipeCount == 0) && (showType != "All")) {
        availableRecipes += "<div class='ingredient'> Select 'All' to see unavailable recipes. </div>"      
    }
    
    document.getElementById("recipe-results").innerHTML = availableRecipes;
    document.getElementById("recipe-title").innerHTML = "Recipes (" + availableRecipeCount + "/" + totalRecipeCount + ")";
}

//#################################################################################
// R E C I P E   L I S T   H E L P E R
//#################################################################################

/**
 * Clears Recipe List Search Bar
 */
 function clearMainSearch() {
    document.getElementById("filter-recipe-input").value = ""
    updateRecipeListDOM()
}

//#################################################################################
//#################################################################################
//#################################################################################
// S E L E C T E D   R E C I P E S
//#################################################################################
//#################################################################################
//#################################################################################

//#################################################################################
// S E L E C T E D   R E C I P E S   H E L P E R 
//#################################################################################

function addRemoveRecipeFromFavorites(recipeID) {
    let recipeName = recipes[recipeID].name
    let index = recipeFavorites.indexOf(recipeName);
    if (index > -1) { // if favorite
        recipeFavorites.splice(index, 1)
    } else { // if not favorite
        recipeFavorites.push(recipes[recipeID].name)
    }
    localStorage.setItem('recipeFavorites', JSON.stringify(recipeFavorites));
    selectRecipeDOM(recipeID)
    if (index > -1) { // if favorite
        toast("Removed Favorite", successToast)
    } else { // if not favorite
        toast("Added Favorite", successToast)
    }
    

}

function addRemoveRecipeFromPinnedRecipes(recipeID) {
    let recipeName = recipes[recipeID].name
    let index = pinnedRecipes.indexOf(recipeName);
    if (index > -1) { // if favorite
        pinnedRecipes.splice(index, 1)
    } else { // if not favorite
        pinnedRecipes.push(recipes[recipeID].name)
    }
    localStorage.setItem('pinnedRecipes', JSON.stringify(pinnedRecipes));
    selectRecipeDOM(recipeID)
    if (index > -1) { // if favorite
        toast("Unpinned", successToast)
    } else { // if not favorite
        toast("Pinned", successToast)
    }
}

function deleteRecipe() {
    if (confirm('Are you sure you want to delete this custom recipe?')) {
        let customIndex = customRecipes.indexOf(recipes[currentRecipe])
        customRecipes.splice(customIndex, 1);
        recipes.splice(currentRecipe, 1);
        localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
        viewRecipes()
        toast("Deleted Custom Recipe", successToast)
    }
}

function fullscreenImage(theIndex) {
    // document.getElementById("background-darken").style.display = "block"
    document.getElementById("selected-image").style.display = "flex"
    
    document.getElementById("selected-image").innerHTML = "<img class='big-image' src='" + recipes[currentRecipe].image[theIndex] + "'>";
}

function closeBigImageBackground() {
    document.getElementById("selected-image").style.display = "none"
}

function searchByTag(searchedTag) {
    if (filtering == false) {
        filterRecipes()
    }
    
    filtering = true;
    document.getElementById("show-filter").style.backgroundColor = cs.activeButton
    document.getElementById("filter-recipe-input").style.display = "inline-block"
    document.getElementById("filter-recipe-input").value = searchedTag
    viewRecipes()
}

function addMissingIngredientsToShoppingCart() {
    for (missingItem in missingIngredients) {
        ingredientID = missingIngredients[missingItem]
        itemToAdd = ingredients[ingredientID]
        let itemFound = false;
        for (i_1 in shoppingList) { // check if item already in pantry
            if (itemToAdd.name == shoppingList[i_1].name) {
                shoppingList[i_1].quantity += 1
                itemFound = true;
                break;
            }
        }
        if (!itemFound) {
            itemToAdd.quantity = 1
            shoppingList.push(itemToAdd)
        }
    }
    selectRecipeDOM(currentRecipe)
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    toast("Missing Ingredients Added", successToast)
}

//#################################################################################
// S E L E C T E D   R E C I P E S   D O M 
//#################################################################################

let currentRecipe = 0
let missingIngredients = []
function selectRecipeDOM(recipeID) {
    currentRecipe = recipeID
    document.getElementById("container-recipe-instructions").style.display = "block"
    document.getElementById("container-recipes").style.display = "none"

    // Title
    recipeBackButton = "<i class='fas fa-arrow-left back-arrow' onclick='viewRecipes()'></i> "
    recipeTitle = recipes[recipeID].name
    recipeFavorite =  " <i class='far fa-star icon-button' onclick='addRemoveRecipeFromFavorites(" + recipeID + ")'></i>"
    if (recipeFavorites.includes(recipeTitle)) {
        recipeFavorite =  " <i class='fas fa-star icon-button' onclick='addRemoveRecipeFromFavorites(" + recipeID + ")'></i>"
    }
    let shareOption = " <i class='fas fa-share-square icon-button' onclick='shareRecipe()'></i>"

    // add pin
    let pinnedRecipeDOM = "<i class='fas fa-thumbtack pin-icon icon-button' onclick='addRemoveRecipeFromPinnedRecipes(" + recipeID + ")'></i>"
    if (pinnedRecipes.includes(recipeTitle)) {
        pinnedRecipeDOM = "<i class='fas fa-thumbtack pin-icon-active icon-button' onclick='addRemoveRecipeFromPinnedRecipes(" + recipeID + ")'></i>"
    }
    document.getElementById("recipe-selected-title").innerHTML = "<span class='go-back' onclick='viewRecipes()'>" + recipeBackButton + recipeTitle + "</span>" + recipeFavorite + pinnedRecipeDOM + shareOption


    // Recipe Source
    document.getElementById("recipe-source").style.display = "none"
    if (recipes[recipeID].source) {
        document.getElementById("recipe-source").style.display = "block"
        document.getElementById("recipe-source").innerHTML = "<i style='font-size: 14px;'>Source: " + recipes[recipeID].source + "</i>"
        
    }


    // Recipe Image
    
    document.getElementById("recipe-image").style.display = "none"
    if (recipes[recipeID].image) {
        document.getElementById("recipe-image").style.display = "block"

        let builtContents = ""
        if (!settings.dataSaver) {
            for (let srcLink in recipes[recipeID].image) {
                builtContents += "<img class='recipe-img' onclick='fullscreenImage(" + srcLink + ")' src='" + recipes[recipeID].image[srcLink] + "'>"
            }
        } else {
            builtContents = "<div style='opacity:.6;font-size: 12px;width: 100%;text-align:center;'><i>Switch off DataSaver to see images.</i></div>"
        }
        document.getElementById("recipe-image").innerHTML = builtContents
        
    }


    // Required Ingredients
    document.getElementById("recipe-selected-ingredients-title").innerHTML = ""
    if (recipes[recipeID].ingredients) {
        if (recipes[recipeID].ingredients.length > 0) {
            document.getElementById("recipe-selected-ingredients-title").innerHTML = "Required Ingredients:";
        }
    }

    missingIngredients = []
    let recipeIngredients = ""
    for (i in recipes[recipeID].ingredients) {

        let itemName = recipes[recipeID].ingredients[i]
        
        let inPantry = checkIfInPantry(itemName)
        let inShoppingList = false;
        if (!inPantry) {
            inShoppingList = checkIfInShoppingList(itemName)
        }

        if (!inPantry) { // get item id if missing.
            itemID = getIngredientID(itemName)
        }

        recipeIngredients += "<div class='ingredient'"
        if (inPantry) {
            recipeIngredients += 'style="color:' + cs.inPantry + ';" onclick="removeFromPantryByName(\'' + itemName + '\')">'
        } else if (inShoppingList) {
            recipeIngredients += 'style="color:' + cs.inCart + ';" onclick="removeFromShoppingListByName(\'' + itemName + '\')">' 
        } else {
            recipeIngredients += "style='color:" + cs.missing + ";'  onclick='addToShoppingListFromRecipe(" + itemID + ")'>"
            missingIngredients.push(itemID)
        }


        if (recipes[recipeID].pre) { // add pre
            recipeIngredients += recipes[recipeID].pre[i] + " "
        }
        
        recipeIngredients += recipes[recipeID].ingredients[i]  
        if (inPantry) {
            recipeIngredients += "<span>In Pantry</span>"
        } else if (inShoppingList) {
            recipeIngredients += "<span>On Shopping List</span>"
        } else {
            recipeIngredients += "<span>Missing</span>"
            // missingIngredients.push(itemID) 
        }
        recipeIngredients += "</div>"
    }
    
    if (missingIngredients.length > 0) { // Add all missing ingredients button
        recipeIngredients = "<button onclick='addMissingIngredientsToShoppingCart()'>Add Missing Ingredients to Shopping List</button>" + recipeIngredients
    }
    document.getElementById("recipe-selected-ingredients").innerHTML = recipeIngredients;

    // Instructions
    document.getElementById("recipe-selected-instructions-title").innerHTML = "";
    document.getElementById("recipe-selected-instructions").innerHTML = "";
    if (recipes[recipeID].instructions) {
        document.getElementById("recipe-selected-instructions-title").innerHTML = "Instructions:";
        document.getElementById("recipe-selected-instructions").innerHTML = recipes[recipeID].instructions;
    }
    

    // Optional Ingredients
    let recipeOptional = ""
    let recipeOptionalTitle = ""
    if (recipes[recipeID].optional) {
        recipeOptionalTitle = "Optional:";
        for (i in recipes[recipeID].optional) {

            let itemName = recipes[recipeID].optional[i]
            let inPantry = checkIfInPantry(itemName)
            let inShoppingList = false;
            if (!inPantry) {
                inShoppingList = checkIfInShoppingList(itemName)
            }

            if (!inPantry) { // get item id if missing.
                itemID = getIngredientID(itemName)
            }

            recipeOptional += "<div class='ingredient'"

            if (inPantry) {
                recipeOptional += 'style="color:' + cs.inPantry + ';" onclick="removeFromPantryByName(\'' + itemName + '\')">'
            } else if (inShoppingList) {
                recipeOptional += 'style="color:' + cs.inCart + ';" onclick="removeFromShoppingListByName(\'' + itemName + '\')">' 
            } else {
                recipeOptional += "style='color:" + cs.missing + ";'  onclick='addToShoppingListFromRecipe(" + itemID + ")'>"
            }

            recipeOptional += recipes[recipeID].optional[i] 
            if (inPantry) {
                recipeOptional += "<span>In Pantry</span>"
            } else if (inShoppingList) {
                recipeOptional += "<span>On Shopping List</span>"
            } else {
                recipeOptional += "<span>Missing</span>"
                // missingIngredients.push(itemID) // Add optional ingredients to shopping cart
            }

            recipeOptional += "</div>"
        }
    } 
    document.getElementById("recipe-selected-ingredients-optional-title").innerHTML = ""
    if (recipes[recipeID].optional) {
        if (recipes[recipeID].optional.length > 0) {
            document.getElementById("recipe-selected-ingredients-optional-title").innerHTML = recipeOptionalTitle;
        }
    }
    document.getElementById("recipe-selected-ingredients-optional").innerHTML = recipeOptional;

    // Tags
    let recipeTagTitle = ""
    let recipeTags = ""
    if (recipes[recipeID].tags) {
        if(recipes[recipeID].tags.length > 0) {
            recipeTagTitle = "Tags:"
            for (i in recipes[recipeID].tags) {
                recipeTags += '<span class="tag" onclick="searchByTag(\'' + recipes[recipeID].tags[i] + '\')">' 
                // 'style="color:' + cs.inPantry + ';" onclick="removeFromPantryByName(\'' + itemName + '\')">'
                recipeTags += recipes[recipeID].tags[i] + "</span>"
            }
        }
    }
    document.getElementById("recipe-selected-tags-title").innerHTML = ""
    if (recipes[recipeID].tags) {
        if (recipes[recipeID].tags.length > 0) {
            document.getElementById("recipe-selected-tags-title").innerHTML = recipeTagTitle;
        }
    }
    document.getElementById("recipe-selected-tags").innerHTML = recipeTags;

    // Delete button if custom recipe
    let recipeIsCustom = false
    for (let aCustomRecipe in customRecipes) {
        if (recipes[recipeID].name == customRecipes[aCustomRecipe].name) {
            recipeIsCustom = true
            break
        }
    }
    document.getElementById("delete-recipe").style.display = "none";
    if (recipeIsCustom) {
        document.getElementById("delete-recipe").style.display = "block";
    }
   
}


//#################################################################################
//#################################################################################
//#################################################################################
// C U S T O M   R E C I P E 
//#################################################################################
//#################################################################################
//#################################################################################


function addCustomRecipe() {
    customSourceInput = document.getElementById("custom-source-input").value
    customRecipeName = document.getElementById("custom-name-input").value

    customIngredients = customApprovedIngredients
    customInstructions = document.getElementById("custom-instructions-input").value
    let _tags = document.getElementById("custom-recipe-tags").value.toLowerCase().split(' ')
    for (let i = 0; i < _tags.length; i++) {
        if (_tags[i] == "") {
            _tags.splice(i, 1)
            i -= 1;
        }
    }

    let newRecipe = {
        name: customRecipeName,
        ingredients: customIngredients,
        pre: customApprovedIngredientPrefix,
        instructions: customInstructions,
        source: customSourceInput,
        tags: _tags,
        optional: customApprovedIngredientsOptional,
        image: imageURLs
        
    }
    addAndValidateCustomRecipe(newRecipe)
    
    
}

function addAndValidateCustomRecipe(newRecipe) {
    let passesRequirements = true
    
    // Check for unique title
    for (let index in recipes) {
        if (recipes[index].name == newRecipe.name) {
            passesRequirements = false
            document.getElementById("custom-recipe-name-warning").innerHTML = "You already have a recipe with this name."
            break
        }
    }

    if (newRecipe.name == "") {
        passesRequirements = false
        document.getElementById("custom-recipe-name-warning").innerHTML = "Your recipe is required to have a name."
    }

    if (!passesRequirements) {
        document.getElementById("custom-recipe-name-warning2").innerHTML = "Error: See Above for Details"

    }

    if (passesRequirements) {
        customRecipes.push(newRecipe)
        recipes = recipes.concat(newRecipe)
        localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
        viewRecipes()
        selectRecipeDOM(recipes.indexOf(newRecipe))
       
        customApprovedIngredients = []
        customApprovedIngredientPrefix = []
        customApprovedIngredientsOptional = []
        imagesURLs = []
        toast("Added Custom Recipe", successToast)
    }
    
    
}

var customApprovedIngredients = []
var customApprovedIngredientPrefix = []

function addIngredientToCustomRecipe(theIndex) {
    let theIngredientName = ingredients[theIndex].name
    document.getElementById("custom-ingredients-input").value = ""
    if (!customApprovedIngredients.includes(theIngredientName)) {
        customApprovedIngredients.push(theIngredientName)
        customApprovedIngredientPrefix.push(document.getElementById("custom-ingredients-prefix").value)
        document.getElementById("custom-ingredients-prefix").value = ""
    }
    updateCustomIngredientsDOM()
}

var customApprovedIngredientsOptional = []
function addIngredientToCustomRecipeOptional(theIndex) {
    let theIngredientName = ingredients[theIndex].name
    document.getElementById("custom-ingredients-input-optional").value = ""
    if (!customApprovedIngredientsOptional.includes(theIngredientName)) {
        customApprovedIngredientsOptional.push(theIngredientName)
    }
    updateCustomIngredientsDOMOptional()
}

var imageURLs = []
function addCustomImageURL() {
    document.getElementById("image-link-error").innerHTML = ""
    if (document.getElementById("custom-image-url").value != "") {
        imageURLs.push(document.getElementById("custom-image-url").value)
        document.getElementById("custom-image-url").value = ""
        updateCustomImageURLDOM()
    } else {
        document.getElementById("image-link-error").innerHTML = "You have to enter a link to the photo."
    }
}

function updateCustomImageURLDOM() {
    let urlTags = ""
    for (let index in imageURLs) {
        urlTags += '<span class="tag filter-word" onclick="removeImageURL(\'' + imageURLs[index] + '\')">' 
        if (imageURLs[index].length > 30) {
            urlTags += imageURLs[index].substring(0,29) + "..."
        } else {
            urlTags += imageURLs[index]
        }
        urlTags += '</span>'
    }
    document.getElementById("custom-image-url-tags").innerHTML = urlTags
}

function removeImageURL(theIndex) {
    imageURLs.splice(imageURLs.indexOf(theIndex), 1)
    updateCustomImageURLDOM()
}

function addIngredientToCustomRecipeByName(theName) {

    let theIngredientName = theName
    document.getElementById("custom-ingredients-input").value = ""
    if (!customApprovedIngredients.includes(theIngredientName)) {
        customApprovedIngredients.push(theIngredientName)
        customApprovedIngredientPrefix.push(document.getElementById("custom-ingredients-prefix").value)
        document.getElementById("custom-ingredients-prefix").value = ""
    }
    updateCustomIngredientsDOM()
}

function addIngredientToCustomRecipeByNameOptional(theName) {

    let theIngredientName = theName
    document.getElementById("recipe-added-ingredients-optional").value = ""
    if (!customApprovedIngredientsOptional.includes(theIngredientName)) {
        customApprovedIngredientsOptional.push(theIngredientName)
        document.getElementById("recipe-added-ingredients-optional").value = ""
    }
    updateCustomIngredientsDOMOptional()
}


function removeCustomIngredient(theIndex){
    customApprovedIngredientPrefix.splice(customApprovedIngredients.indexOf(theIndex), 1)
    customApprovedIngredients.splice(customApprovedIngredients.indexOf(theIndex), 1)
    updateCustomIngredientsDOM()
}

function removeCustomIngredientOptional(theIndex){
    customApprovedIngredientsOptional.splice(customApprovedIngredientsOptional.indexOf(theIndex), 1)
    updateCustomIngredientsDOMOptional()
}


function updateCustomIngredientsDOM() {
    let ingredientTags = ""
    for (let index in customApprovedIngredients) {
        ingredientTags += '<span class="tag filter-word" onclick="removeCustomIngredient(\'' + customApprovedIngredients[index] + '\')">' + customApprovedIngredientPrefix[index] + " " + customApprovedIngredients[index] + '</span>'
    }
    document.getElementById("recipe-added-ingredients").innerHTML = ingredientTags
}

function updateCustomIngredientsDOMOptional() {
    let ingredientTags = ""
    for (let index in customApprovedIngredientsOptional) {
        ingredientTags += '<span class="tag filter-word" onclick="removeCustomIngredientOptional(\'' + customApprovedIngredientsOptional[index] + '\')">' +  customApprovedIngredientsOptional[index] + '</span>'
    }
    document.getElementById("recipe-added-ingredients-optional").innerHTML = ingredientTags
}

function suggestCustomIngredient() {
    let customIngredientName = document.getElementById("custom-ingredients-input").value.toLowerCase()
    
    let ingredientSearchResults = ""
    let counter = 0
    for (let i in ingredients) { 
        // If Match
        
        if (customIngredientName == ingredients[i].name.substring(0, customIngredientName.length)) { // if input matches start of ingredient
            ingredientSearchResults += "<div class='ingredient' onclick='addIngredientToCustomRecipe"
            
            ingredientSearchResults += "(" + i + ")'><span> + " + ingredients[i].name 
            ingredientSearchResults += "</div>";
            counter += 1;
        }
        if (counter == 4) {
            break;
        }
    }
    
    // if no results
    if (ingredientSearchResults == '') {
        ingredientSearchResults = '<button id="add-custom-ingredient-button" onclick="addCustomIngredientFromCustomRecipe()">Add as Custom Ingredient</button><br>'
    }

    document.getElementById("recipe-ingredients-custom-results").innerHTML = ingredientSearchResults
}

function suggestCustomIngredientOptional() {
    let customIngredientName = document.getElementById("custom-ingredients-input-optional").value.toLowerCase()
    
    let ingredientSearchResults = ""
    let counter = 0
    for (let i in ingredients) { 
        // If Match
        
        if (customIngredientName == ingredients[i].name.substring(0, customIngredientName.length)) { // if input matches start of ingredient
            ingredientSearchResults += "<div class='ingredient' onclick='addIngredientToCustomRecipeOptional"
            
            ingredientSearchResults += "(" + i + ")'><span> + " + ingredients[i].name 
            ingredientSearchResults += "</div>";
            counter += 1;
        }
        if (counter == 4) {
            break;
        }
    }
    
    // if no results
    if (ingredientSearchResults == '') {
        ingredientSearchResults = '<button id="add-custom-ingredient-button-optional" onclick="addCustomIngredientFromCustomRecipeOptional()">Add as Custom Ingredient</button><br>'
    }

    document.getElementById("recipe-ingredients-custom-results-optional").innerHTML = ingredientSearchResults
}

function addCustomIngredientFromCustomRecipe() {
    let customIngredientName = document.getElementById("custom-ingredients-input").value.toLowerCase()
    let newIngredient = {name:customIngredientName}
    customIngredients.push(newIngredient)
    ingredients.push(newIngredient)
    localStorage.setItem('customIngredients', JSON.stringify(customIngredients));
    document.getElementById("custom-ingredients-input").value = ""
    addIngredientToCustomRecipeByName(newIngredient.name)
}

function addCustomIngredientFromCustomRecipeOptional() {
    let customIngredientName = document.getElementById("custom-ingredients-input-optional").value.toLowerCase()
    let newIngredient = {name:customIngredientName}
    customIngredients.push(newIngredient)
    ingredients.push(newIngredient)
    localStorage.setItem('customIngredients', JSON.stringify(customIngredients));
    document.getElementById("custom-ingredients-input-optional").value = ""
    addIngredientToCustomRecipeByNameOptional(newIngredient.name)
}
//#################################################################################
// R E C I P E   F I L T E R
//#################################################################################
var filtering = false;
function filterRecipes() {
    filtering = !filtering
    if (filtering) {
        
        document.getElementById("filter-recipe-container").style.display = "block"
        document.getElementById("filter-recipe-input").style.display = "inline-block"
        document.getElementById("filter-recipe-input").value = ""
        document.getElementById("show-filter").style.backgroundColor = cs.activeButton
    } else {
        document.getElementById("filter-recipe-container").style.display = "none"
        document.getElementById("filter-recipe-input").style.display = "none"
        document.getElementById("show-filter").style.backgroundColor = cs.inactiveButton
    }
    updateRecipeListDOM()
    
}


var filterFavoriteRecipesBool = false
function filterFavoriteRecipes() {
    if (filterFavoriteRecipesBool) {
        filterFavoriteRecipesBool = false
        document.getElementById("star-filled").innerHTML = "<i class='far fa-star'></i>"
        document.getElementById("star-filled-button").style.backgroundColor = cs.inactiveButton
    } else {
        filterFavoriteRecipesBool = true;
        document.getElementById("star-filled").innerHTML = "<i class='fas fa-star'></i>"
        document.getElementById("star-filled-button").style.backgroundColor = cs.activeButton
    }
    viewRecipes()
}

//#################################################################################
//#################################################################################
//#################################################################################
// S H A R I N G
//#################################################################################
//#################################################################################
//#################################################################################


function copyToClipboard(id) {
    // document.querySelector("share-area").select();
    let textarea = document.getElementById("share-area");
    textarea.select();
    document.execCommand('copy');
}

function shareShoppingList() {
    let value = serializeJsonToArray(shoppingList)
    value = ingredientsToNumbers(value)
    let stringValue = JSON.stringify(value)
    stringValue = stringValue.substring(1, stringValue.length - 1)
    stringValue = convertToWebSafeString(stringValue)

    let builtURL = siteURL + "?sl=" + stringValue
    document.getElementById("share-header").innerHTML = "Share Shopping List"
    document.getElementById("share-area").value = builtURL
    document.getElementById("share").style.display = "block"
    document.getElementById("dim-background").style.display = "block"
}

function shareRecipe() {
    let stringValue = JSON.stringify(recipes[currentRecipe])
    stringValue = convertToWebSafeString(stringValue)
    
    let builtURL = siteURL + "?r=" + stringValue

    
    document.getElementById("share-header").innerHTML = "Share " + recipes[currentRecipe].name
    document.getElementById("share-area").value = builtURL
    document.getElementById("share").style.display = "block"
    document.getElementById("dim-background").style.display = "block"
}

function serializeJsonToArray(jsonArrayToSerialize) {
    let serializedArray = []
    for (let i in jsonArrayToSerialize) {
        serializedArray.push(jsonArrayToSerialize[i].name)
        serializedArray.push(jsonArrayToSerialize[i].quantity)
        // for (var key in jsonArrayToSerialize[i]) {
        //     if (jsonArrayToSerialize[i].hasOwnProperty(key)) {
        //         serializedArray.push(jsonArrayToSerialize[i][key])
        //     }
        // }
    }
    return serializedArray
}

function ingredientsToNumbers(arr) {
    for (let i in arr) {
        ingredientIndex = ingredientsIndex.indexOf(arr[i])
        if (ingredientIndex != -1) {
            arr[i] = ingredientIndex
        }
    }
    return arr
}

function numbersToIngredients(arr) {
    for (let i in arr) {
        if (i % 2 == 0) {     
            let ingredientName = ingredientsIndex[arr[i]]
            if (ingredientName != undefined) {
                arr[i] = ingredientsIndex[arr[i]]
            }
        }
    }
    return arr
}



function closeShare() {
    document.getElementById("share").style.display = "none";
    document.getElementById("dim-background").style.display = "none"
}
//#################################################################################
//#################################################################################
//#################################################################################
// T I P S
//#################################################################################
//#################################################################################
//#################################################################################

function showMiniTutorials() {
    hiddenTips = []
    localStorage.setItem('hiddenTips', JSON.stringify(hiddenTips));
    for (let i = 1; i < 9; i++) {
        document.getElementById("tip-" + i).style.display = "block"
    }
    toast("Showing Mini Tutorials", successToast)
}

function closeTip(tipID) {
    hiddenTips.push(tipID)
    document.getElementById("tip-" + tipID).style.display = "none"
    localStorage.setItem('hiddenTips', JSON.stringify(hiddenTips));
}


function hideTips() {
    for (let index in hiddenTips) {
        document.getElementById("tip-" + hiddenTips[index]).style.display = "none"
    }
}

//#################################################################################
//#################################################################################
//#################################################################################
// E X P O R T   &   I M P O R T
//#################################################################################
//#################################################################################
//#################################################################################

function exportLocalSavedData() {
    let objectToExport = {
        yourCustomRecipes:customRecipes,
        yourCustomIngredients:customIngredients,
    }

    document.getElementById("share-area").value = JSON.stringify(objectToExport)
    document.getElementById("share").style.display = "block"
    document.getElementById("dim-background").style.display = "block"
}

function importLocalSavedData() {
    document.getElementById("share-area").value = "test"
    document.getElementById("share").style.display = "block"
    document.getElementById("dim-background").style.display = "block"
}

//#################################################################################
//#################################################################################
//#################################################################################
// P A G E   C O N T R O L L E R
//#################################################################################
//#################################################################################
//#################################################################################


document.getElementById("show-available-recipes").style.backgroundColor = cs.activeButton
function showAvailableRecipes() {
    showType = "Available"
    document.getElementById("show-available-recipes").style.backgroundColor = cs.activeButton
    document.getElementById("show-all-recipes").style.backgroundColor = cs.inactiveButton
    updateRecipeListDOM() 
}

function showAllRecipes() {
    showType = "All"
    document.getElementById("show-available-recipes").style.backgroundColor = cs.inactiveButton
    document.getElementById("show-all-recipes").style.backgroundColor = cs.activeButton
    updateRecipeListDOM() 
}

function ingredientToShoppingList() {
    previousPage = currentPage
    ingredientWhere = "shoppingList";
    document.getElementById("container-add-ingredient").style.display = "block"
    document.getElementById("container-pantry").style.display = "none"
    document.getElementById("container-shopping").style.display = "none"
    document.getElementById("container-recipe-instructions").style.display = "none"
    document.getElementById("container-recipes").style.display = "none" 
    userAddFood()
}

function ingredientToPantry() {
    previousPage = currentPage
    ingredientWhere = "pantry"
    document.getElementById("container-add-ingredient").style.display = "block"
    document.getElementById("container-pantry").style.display = "none"
    document.getElementById("container-shopping").style.display = "none"
    document.getElementById("container-recipe-instructions").style.display = "none"
    document.getElementById("container-recipes").style.display = "none" 
    userAddFood()

}

function viewCustomRecipe() {
    previousPage = currentPage
    currentPage = "customRecipe"
    document.getElementById("custom-recipe-name-warning").innerHTML = ""
    document.getElementById("custom-recipe-name-warning2").innerHTML = ""


    document.getElementById("container-add-ingredient").style.display = "none"
    document.getElementById("container-pantry").style.display = "none"
    document.getElementById("container-shopping").style.display = "none"
    document.getElementById("container-recipe-instructions").style.display = "none"
    document.getElementById("container-recipes").style.display = "none" 
    document.getElementById("container-custom-recipe").style.display = "block"
    document.getElementById("container-help").style.display = "none"
}

function viewHelp() {
    previousPage = currentPage
    currentPage = "customRecipe"
    document.getElementById("container-add-ingredient").style.display = "none"
    document.getElementById("container-pantry").style.display = "none"
    document.getElementById("container-shopping").style.display = "none"
    document.getElementById("container-recipe-instructions").style.display = "none"
    document.getElementById("container-recipes").style.display = "none" 
    document.getElementById("container-custom-recipe").style.display = "none"
    document.getElementById("container-help").style.display = "block"
}

function viewPantry() {
    previousPage = currentPage
    currentPage = "pantry"
    updatePantryDOM()
    clearStyle()
    document.getElementById("container-pantry").style.display = "block"


    document.getElementById("view-pantry").style.color = cs.selectedNavTextColor
    document.getElementById("view-pantry").style.borderBottom = cs.highlightColor
}

function viewShoppingList() {
    previousPage = currentPage
    currentPage = "shoppingList"
    updateShoppingListDOM()
    clearStyle()

    document.getElementById("container-shopping").style.display = "block"
    document.getElementById("view-shopping-list").style.color = cs.selectedNavTextColor
    document.getElementById("view-shopping-list").style.borderBottom = cs.highlightColor
}

function viewRecipes() {
    previousPage = currentPage
    currentPage = "recipes"
    updateRecipeListDOM()
    clearStyle()

    document.getElementById("container-recipes").style.display = "block" 
    document.getElementById("view-recipe").style.color = cs.selectedNavTextColor
    document.getElementById("view-recipe").style.borderBottom = cs.highlightColor
}

function clearStyle() {
    document.getElementById("container-add-ingredient").style.display = "none"
    document.getElementById("container-pantry").style.display = "none"
    document.getElementById("container-shopping").style.display = "none"
    document.getElementById("container-recipe-instructions").style.display = "none"
    document.getElementById("container-recipes").style.display = "none" 
    document.getElementById("container-custom-recipe").style.display = "none"
    document.getElementById("container-help").style.display = "none"
    
    document.getElementById("view-shopping-list").style.backgroundColor = cs.normalBackgroundColor
    document.getElementById("view-pantry").style.backgroundColor = cs.normalBackgroundColor
    document.getElementById("view-recipe").style.backgroundColor = cs.normalBackgroundColor

    document.getElementById("view-shopping-list").style.color = cs.normalNavTextColor
    document.getElementById("view-pantry").style.color = cs.normalNavTextColor
    document.getElementById("view-recipe").style.color = cs.normalNavTextColor

    document.getElementById("view-shopping-list").style.borderBottom = cs.normalColor
    document.getElementById("view-pantry").style.borderBottom = cs.normalColor
    document.getElementById("view-recipe").style.borderBottom = cs.normalColor
    scroll(0,0)
    changeTip()
}

function changeTip() {
    var aTip = tips[Math.floor(Math.random() * tips.length)];
    document.getElementById("footer-tip").innerHTML = aTip.message
}


var previousPage = ""
var currentPage = ""
function goToPreviousPage() {
    currentPage = previousPage
    if (previousPage == "recipes") {
        viewRecipes()
    } else if (previousPage == "pantry") {
        viewPantry()
    } else if (previousPage == "shoppingList") {
        viewShoppingList()
    } else if (previousPage == "customRecipe") {
        viewCustomRecipe()
    }
}

function loadStartPage() {
    viewRecipes()
    document.getElementById("tutorial-start").style.display = "flex"
    document.getElementById("dim-background").style.display = "block"
}

function closePopUp() {
    document.getElementById("share").style.display = "none"
    document.getElementById("category").style.display = "none"
    document.getElementById("dim-background").style.display = "none"
    skipTutorial()
    updateShoppingListDOM()
}

//#################################################################################
//#################################################################################
//#################################################################################
// O P E N I N G   T U T O R I A L S
//#################################################################################
//#################################################################################
//#################################################################################

function skipTutorial() {
    localStorage.setItem('firstTime', "true");
    document.getElementById("tutorial-start").style.display = "none"
    document.getElementById("tutorial-step1").style.display = "none"
    document.getElementById("tutorial-step2").style.display = "none"
    document.getElementById("tutorial-step3").style.display = "none"
    document.getElementById("tutorial-step4").style.display = "none"
    document.getElementById("tutorial-step5").style.display = "none"
    document.getElementById("tutorial-step6").style.display = "none"
    document.getElementById("tutorial-step7").style.display = "none"
    document.getElementById("tutorial-step8").style.display = "none"
    document.getElementById("dim-background").style.display = "none"
}

function tutorialStep1() {
    showAllRecipes()
    document.getElementById("tutorial-start").style.display = "none"
    document.getElementById("tutorial-step1").style.display = "flex"
}

function startTutorialRecipe() { 
    document.getElementById("tutorial-step1").style.display = "none"
    document.getElementById("tutorial-step2").style.display = "flex"
}

function tutorialStep3() {
    showAvailableRecipes()
    updateRecipeListDOM() 
    document.getElementById("tutorial-step2").style.display = "none"
    document.getElementById("tutorial-step3").style.display = "flex"
}

function tutorialStep4() {
    showAllRecipes()
    selectRecipeDOM(0)
    document.getElementById("tutorial-step3").style.display = "none"
    document.getElementById("tutorial-step4").style.display = "flex"
}

function tutorialStep5() {
    viewPantry()
    document.getElementById("tutorial-step4").style.display = "none"
    document.getElementById("tutorial-step5").style.display = "flex"
}

function tutorialStep6() {
    viewShoppingList()
    document.getElementById("tutorial-step5").style.display = "none"
    document.getElementById("tutorial-step6").style.display = "flex"
}

function tutorialStep7() {
    viewRecipes()
    document.getElementById("tutorial-step6").style.display = "none"
    document.getElementById("tutorial-step7").style.display = "flex"
}

function tutorialStep8() {
    document.getElementById("tutorial-step7").style.display = "none"
    document.getElementById("tutorial-step8").style.display = "flex"
}

