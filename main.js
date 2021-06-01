$(document).ready(
    function() {
        let glow = $('.pulse');
        setInterval(function() {
            glow.hasClass('glow') ? glow.removeClass('glow') : glow.addClass('glow');
        }, 1000);

        $('.carthumb').on('mouseenter mouseleave', function(e) {
            $('.carcont').trigger(e.type);
        });

        $('.carcont').on('mouseenter mouseleave', function(e) {
            let ext = $('.external');
            ext.hasClass('hidden') ? ext.removeClass('hidden') : ext.addClass('hidden');
        });

        let carArray = [];
        let carIndex = 0;

        const jsonpath = "./projects.json";

        var request = new XMLHttpRequest();
        request.open("GET", jsonpath, false);
        request.send(null)
        const obj = JSON.parse(request.responseText);

        let c = obj.length;
        
        class Carcontent{
            constructor(id){
                let r = this.read(id);
                this.link = r.link;
                this.image = r.image;
                this.title = r.title;
                this.text = r.text;
            }

            read(id){
                return obj[id];
            }
            
        }

        for(let i = 0; i < c; i++){
            carArray.push(new Carcontent(i));
        }

        function reload(){
            let o = carArray[carIndex];
            $(".carcont").css("background-image", `url(${o.image})`);
            $(".carcont").attr("href", o.link);
            $(".carcont").attr("title", o.title);
            $(".cartext > h2").text(o.title);
            $(".cartext > p").text(o.text);
        }

        reload();

        $(".arrow").click(function(){

            if ($(this).attr("id") == "ar-left"){
                carIndex == 0 ? carIndex = c-1
                : carIndex == c-1 ? carIndex--
                : carIndex--;
                reload();
            }

            if ($(this).attr("id") == "ar-right"){
                carIndex == 0 ? carIndex++
                : carIndex == c-1 ? carIndex = 0
                : carIndex++;
                reload();
            }

        })

    }
)
