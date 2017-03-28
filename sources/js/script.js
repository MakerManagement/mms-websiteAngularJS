/**
 * Created by thobber on 13.02.17.
 */
/** @namespace item.categories[0].category */
/** @namespace item.categories.category */
/** @namespace item.categories */

var itemArray = [];

// Function to ask API, returns JSON
function readTextFile(file, callback)
{
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if (rawFile.readyState === 4 && rawFile.status == "200")
        {
            callback(rawFile.responseText);
        }
        else
        {
            //console.log("An error has occurred:");
            console.log("Ready state: " + rawFile.readyState +  ". Status: " + rawFile.status);
        }
    };
    rawFile.send(null);
}

// Ask API for all categories
const responseCategories = "http://158.39.162.161/api/categories";
readTextFile(responseCategories, function (text)
{
    const ul_categoryList = document.getElementById("category-list");
    const category_selector = document.getElementById("category-selector");

    const data = JSON.parse(text).reverse();
    for (const item of Object.values(data))
    {
        const categories = item.category[language];
        const category_id = item._id;

        const categories_a = document.createElement("a");
        const categories_li = document.createElement("li");

        categories_a.textContent = categories;
        categories_a.setAttribute("href", "#");

        categories_li.appendChild(categories_a);
        ul_categoryList.appendChild(categories_li);

        if (typeof category_selector !== "undefined" && category_selector != null)
        {
            let option = document.createElement("option");
            option.value = category_id;
            option.innerHTML = categories;
            category_selector.appendChild(option);
        }

    }
});

// Ask API for all items
const responseItems = "http://158.39.162.161/api/items";

readTextFile(responseItems, function (text)
{
    const ul_itemList = document.getElementById("main-list");

    const data = JSON.parse(text).reverse();
    for (const item of Object.values(data))
    {
        // Creates the elements for structure
        const items_a = document.createElement("a");
        const items_li = document.createElement("li");
        const items_description = document.createElement("p");
        const a_header = document.createElement("p");
        const description_span = document.createElement("span");
        const description_span2 = document.createElement("span");

        // Sets a class to the title of the item
        a_header.setAttribute("class", "item-header-list");

        // Sets class to the different spans, for design
        description_span.setAttribute("class", "text ellipsis");
        description_span2.setAttribute("class", "text-concat");

        // Creates a text node for description with truncating in case of long string
        let items_description_content = document.createTextNode(truncate(item.description[language], 75));

        // Sets all the attributes and make sure the elemets are nested the correct way
        items_description.appendChild(items_description_content);
        description_span2.appendChild(items_description);

        // Appends the span, so they are nested
        description_span.appendChild(description_span2);

        a_header.textContent = truncate(item["item_name"], 24);
        items_a.appendChild(a_header);
        items_a.appendChild(description_span);
        items_a.setAttribute("href", "itempage.php?item=" + item._id);
        items_a.setAttribute("class", "item-box");

        if (ul_itemList != null)
        {
            // Appends the elements to the list
            items_li.appendChild(items_a);
            ul_itemList.appendChild(items_li);
        }

        // Adds the item to the array for the search bar
        itemArray.push(item.item_name);
        isDone = true;

    }
    console.log("Items loaded!");
    loadMore();
});

if (typeof itemId !== 'undefined')
{
// Ask API for specific item
    const responseSpecificItem = "http://158.39.162.161/api/items/" + itemId;

    readTextFile(responseSpecificItem, function (text)
    {
        const data = JSON.parse(text);

        const title = data.item_name;
        const description = data.description[language];
        const image = data.image_url;

        document.getElementById("item").innerHTML = title;
        document.getElementById("description").innerHTML = description;
        document.getElementById("item_image").src = image;
    });
}
// Function gotten from http://stackoverflow.com/questions/6899097/how-to-add-a-parameter-to-the-url, by user: hakre
function setParam(name, value)
{
    const l = window.location;

    /* build params */
    const params = {};
    const x = /(?:\??)([^=&?]+)=?([^&?]*)/g;
    const s = l.search;
    for(let r = x.exec(s); r; r = x.exec(s))
    {
        r[1] = decodeURIComponent(r[1]);
        if (!r[2]) r[2] = '%%';
        params[r[1]] = r[2];
    }

    /* set param */
    params[name] = encodeURIComponent(value);

    /* build search */
    let search = [];
    for(let i in params)
    {
        let p = encodeURIComponent(i);
        const v = params[i];
        if (v != '%%') p += '=' + v;
        search.push(p);
    }
    search = search.join('&');

    /* execute search */
    l.search = search;
}

// Takes a string, and if the string is over 75 characters, it will add "..." to it
function truncate(string, maxcharacters)
{
    if (string.length > maxcharacters)
        { //noinspection JSUnresolvedFunction
            return string.substring(0,maxcharacters) + ' (...)';
        }
    else
    {
        return string;
    }
}