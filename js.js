$(function () {
    const konyvek = [];
    let adat = {
        "nev": "József Attila",
        "cim": "Összes versei",
        "ar": 1234,
        "kategoria": "vers"
    };
    let modositAdat={
        "id": 2,
        "nev": "**Lackfi János**",
        "cim": "**Apám kakasa**",
        "ar": 3240,
        "kategoria": "vers"
      };

    let eleresiUt = "http://localhost:3000/konyvek";
    let mezoszerint = eleresiUt + "?nev=Rejtő Jenő";
    let rendezes = eleresiUt + "?_sort=nev&_order=asc";
    let szures = "az";
    let szuresurl = eleresiUt + `?q=${szures}`;
    let kisebbnagyobb = eleresiUt + `?ar_gte=1000&ar_lte=3500`;
    let leptetes = eleresiUt + `?_page=2&_limit=2`;
    let rekord3 = eleresiUt + `?id=3`;
    let nevSzerintForditva = eleresiUt + `?_sort=nev&_order=desc`;
    let regenyek = eleresiUt + `?kategoria=regény`;
    myAjax(eleresiUt, konyvek, kiir);
    function kiir(tomb) {
        console.log(tomb);
        let sablon = "";
        tomb.forEach((elem) => {
            sablon += `
            <div class="elemek">
            <h3>${elem.nev}</h3>
            <h4 class="cim">
            ${elem.cim}
            </h4>
            <p>${elem.kategoria}</p>
            <span class="ar">${elem.ar}</spa>
            </div>
            `;
        });
        $(".adatok").html(sablon);
    }

    function myAjax(eleresiUt, tomb, myCallback) {
        tomb.splice(0,tomb.length);
        $.ajax(
            {
                url: eleresiUt,
                type: "GET",
                success: function (result) {
                    result.forEach((element) => {
                        tomb.push(element);
                    });
                    myCallback(tomb);
                }
            }
        );

    }
    $(".ujAdat").on("click",()=>{myAjaxPost(eleresiUt, adat);})
    
    function myAjaxPost(eleresiUt, adat) {
        $.ajax(
            {
                url: eleresiUt,
                type: "POST",
                data: adat,
                success: function (result) {
                    myAjax(eleresiUt, konyvek, kiir);
                }
            }
        );

    }
    $(".torol").on("click",()=>{myAjaxDelete(eleresiUt, konyvek.length-1);})

    function myAjaxDelete(eleresiUt, id) {
        $.ajax(
            {
                url: eleresiUt+`/`+id,
                type: "DELETE",
                success: function (result) {
                    myAjax(eleresiUt, konyvek, kiir);
                }
            }
        );

    }

    $(".put").on("click",()=>{myAjaxPut(eleresiUt,modositAdat);})

    function myAjaxPut(eleresiUt, adat) {


        $.ajax(
            {
                url: eleresiUt+`/`+adat.id,
                type: "PUT",
                data:adat,
                success: function (result) {
                    myAjax(eleresiUt, konyvek, kiir);
                }
            }
        );

    }
});